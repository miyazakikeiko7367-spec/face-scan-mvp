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
        content: `あなたは熟練の顔相占い師です。画像から「太陽」「月」「風」のいずれか1つのタイプを厳密に判定してください。
回答は必ず以下のJSON形式で返してください。

{
  "typeName": "太陽のハッピー・サンフラワー顔（または月か風の名称）",
  "tagLine": "一言キャッチコピー",
  "description": "性格や雰囲気の解説（2〜4文）",
  "keywords": ["キーワード1", "キーワード2", "キーワード3"],
  "strengths": ["強み1", "強み2", "強み3"],
  "loveTips": ["恋愛のコツ1", "恋愛のコツ2", "恋愛のコツ3"]
}

※判定のヒント：
- 太陽：笑顔、エネルギッシュ、温かい
- 月：穏やか、知的、ミステリアス
- 風：爽やか、自由、軽やか`
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "この人物の顔を分析して、JSON形式で結果を返してください。"
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