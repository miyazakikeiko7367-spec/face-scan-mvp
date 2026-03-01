import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { imageBase64 } = await req.json();

    if (!imageBase64) {
      return NextResponse.json(
        { ok: false, error: "No image provided" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      // ここが重要：JSON以外を返せないようにする
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "あなたは日本語で、娯楽目的の『雰囲気キャラ診断』を作ります。画像から断定的に性格や内面を決めつけず、見た目（表情・雰囲気・服装など）から連想した“フィクションのキャラクター像”として表現してください。出力は必ずJSONのみ。",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `
次のJSON形式で“必ず”返してください（Markdown禁止、文章のみ禁止）。

{
  "typeName": "例：分析タイプ / 癒しタイプ など",
  "tagLine": "短い一言（日本語）",
  "description": "2〜4文（日本語）。断定しすぎず『〜な雰囲気』『〜に見える』などで表現。",
  "keywords": ["短い単語を3〜5個"],
  "strengths": ["箇条書き3つ（日本語）"],
  "loveTips": ["恋愛のコツ3つ（日本語）"]
}
`,
            },
            {
              type: "image_url",
              image_url: { url: imageBase64 },
            },
          ],
        },
      ],
      temperature: 0.8,
    });

    const text = completion.choices[0].message.content ?? "{}";
    const parsed = JSON.parse(text);

    return NextResponse.json({ ok: true, result: parsed });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}