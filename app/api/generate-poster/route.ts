async function checkRequestStatus(
  requestId: string,
  apiKey: string,
  maxAttempts = 60
): Promise<any> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const statusResponse = await fetch(
      `https://api.deapi.ai/api/v1/client/request-status/${requestId}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
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
    const {
      prompt,
      width = 768,
      height = 768,
      steps = 8,
    } = await request.json();

    if (!prompt) {
      return Response.json({ error: "No prompt provided" }, { status: 400 });
    }

    if (!process.env.DEAPI_API_KEY) {
      return Response.json(
        { error: "DEAPI_API_KEY not configured" },
        { status: 500 }
      );
    }

    // Step 1: Submit generation request
    const response = await fetch("https://api.deapi.ai/api/v1/client/txt2img", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DEAPI_API_KEY}`,
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
        { status: response.status }
      );
    }

    const data = await response.json();
    const requestId = data.data?.request_id;

    if (!requestId) {
      return Response.json(
        { error: "No request_id received from DeAPI" },
        { status: 500 }
      );
    }

    // Step 2: Poll for completion
    const result = await checkRequestStatus(
      requestId,
      process.env.DEAPI_API_KEY
    );

    return Response.json({
      success: true,
      image: result.result_url || result.preview,
      preview: result.preview,
      result_url: result.result_url,
    });
  } catch (error) {
    console.error("Error generating poster:", error);
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to generate poster",
      },
      { status: 500 }
    );
  }
}
