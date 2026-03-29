import { getUserFromRequest, getUserApiKeys } from "@/lib/supabase";
import { createClient } from "@supabase/supabase-js";

async function checkRequestStatus(
  requestId: string,
  apiKey: string,
  maxAttempts = 60,
): Promise<any> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const statusResponse = await fetch(
      `https://api.deapi.ai/api/v1/client/request-status/${requestId}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    if (!statusResponse.ok) {
      throw new Error("Failed to check request status");
    }

    const statusData = await statusResponse.json();
    const status = statusData.data?.status;

    if (status === "done") {
      return statusData.data;
    } else if (status === "failed" || status === "error") {
      throw new Error("Image generation failed");
    }

    // Wait 2 seconds before next check
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  throw new Error("Request timeout - image generation took too long");
}

export async function POST(request: Request) {
  try {
    // Authenticate user
    const { userId, error: authError } = await getUserFromRequest(request);
    if (authError || !userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      prompt,
      width = 768,
      height = 768,
      steps = 8,
    } = await request.json();

    if (!prompt) {
      return Response.json({ error: "No prompt provided" }, { status: 400 });
    }

    // Get user's DeAPI key from DB
    const { deapi_api_key } = await getUserApiKeys(userId);

    if (!deapi_api_key) {
      return Response.json(
        {
          error:
            "DeAPI Key belum dikonfigurasi. Silakan atur di halaman Pengaturan.",
        },
        { status: 400 },
      );
    }

    // Step 1: Submit generation request
    const response = await fetch("https://api.deapi.ai/api/v1/client/txt2img", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${deapi_api_key}`,
      },
      body: JSON.stringify({
        prompt,
        model: "ZImageTurbo_INT8",
        width,
        height,
        seed: Math.floor(Math.random() * 4294967296),
        steps,
        negative_prompt: "low quality, blurry, distorted, ugly, bad anatomy",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("DeAPI Error:", errorData);
      return Response.json(
        { error: "Failed to generate image from DeAPI" },
        { status: response.status },
      );
    }

    const data = await response.json();
    const requestId = data.data?.request_id;

    if (!requestId) {
      return Response.json(
        { error: "No request_id received from DeAPI" },
        { status: 500 },
      );
    }

    // Step 2: Poll for completion
    const result = await checkRequestStatus(requestId, deapi_api_key);
    const deapiUrl = result.result_url || result.preview;
    let finalImageUrl = deapiUrl;

    // Step 3: Download and Upload to Supabase Storage
    const authHeader = request.headers.get("authorization");
    if (authHeader && deapiUrl) {
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

        const authSupabase = createClient(supabaseUrl, supabaseAnonKey, {
          global: {
            headers: { Authorization: authHeader },
          },
        });

        // Fetch image from DeAPI
        const imageRes = await fetch(deapiUrl);
        if (imageRes.ok) {
          const imageBlob = await imageRes.blob();
          const filename = `${userId}/${Date.now()}_${Math.random().toString(36).substring(7)}.png`;

          const { data: uploadData, error: uploadError } =
            await authSupabase.storage
              .from("posters")
              .upload(filename, imageBlob, {
                contentType: "image/png",
                upsert: false,
              });

          if (!uploadError && uploadData) {
            const {
              data: { publicUrl },
            } = authSupabase.storage.from("posters").getPublicUrl(filename);
            finalImageUrl = publicUrl;
          } else {
            console.error("Supabase Storage Upload Error:", uploadError);
          }
        }
      } catch (storageError) {
        console.error("Failed to upload image to Supabase:", storageError);
      }
    }

    return Response.json({
      success: true,
      image: finalImageUrl,
      preview: finalImageUrl,
      result_url: finalImageUrl,
    });
  } catch (error) {
    console.error("Error generating poster:", error);
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to generate poster",
      },
      { status: 500 },
    );
  }
}
