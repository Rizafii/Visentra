import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: Request) {
  try {
    const { image, productInfo } = await request.json();

    if (!image) {
      return Response.json({ error: "No image provided" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return Response.json(
        { error: "GEMINI_API_KEY not configured" },
        { status: 500 }
      );
    }

    // Extract base64 data from data URL
    const base64Data = image.split(",")[1];
    const mimeType = image.split(";")[0].split(":")[1];

    const prompt = `Analisa foto produk berikut untuk kebutuhan marketing UMKM Indonesia.

${productInfo ? `Informasi tambahan: ${productInfo}` : ""}

Hasilkan output dalam format JSON terstruktur dengan field:
- kategori_produk (string)
- target_market { usia (string, contoh: "18-35 tahun"), gender (string), segment (string) }
- selling_point (array max 3 string)
- rekomendasi_harga { min (number), max (number) }
- paket_konten_7_hari [ { hari (number 1-7), caption (string), hashtag (array string dengan # di depan) } ]
- brand_persona { tone (string), style (string), karakter (string) }
- waktu_posting_terbaik (array string dalam format "HH:00 WIB")
- key_message_brand (string)

Gunakan bahasa Indonesia yang profesional dan mudah dipahami UMKM.
PENTING: Hanya output JSON valid tanpa markdown code blocks atau teks tambahan.`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent([
      {
        inlineData: {
          data: base64Data,
          mimeType: mimeType,
        },
      },
      prompt,
    ]);

    const response = await result.response;
    const text = response.text();

    // Parse the JSON response
    const cleanedText = text.replace(/```json\n?|\n?```/g, "").trim();
    const parsedResult = JSON.parse(cleanedText);

    return Response.json(parsedResult);
  } catch (error) {
    console.error("Error analyzing product:", error);
    return Response.json(
      { error: "Failed to analyze product" },
      { status: 500 }
    );
  }
}
