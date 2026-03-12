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
        temperature: 0.8, 
      response_format: { type: "json_object" },
      messages: [
        {
        role: "system",
        content: `あなたは、顔の造形からその人の本質を見抜く、非常に厳格なプロの観相師です。
分析結果は、以下の3タイプのうち【最も当てはまるもの1つ】を、偏りがないよう厳密に選んでください。

■ 判定の絶対ルール：
1. 太陽（Happy Sunflower）：満面の笑顔、非常に明るい表情、温かみのあるエネルギッシュな顔立ち。
2. 月（Mystic Moon）：穏やかで涼しげな目元、知的な雰囲気、静寂やミステリアスさを感じる真顔。
3. 風（Free Breeze）：爽やかで軽やか、少し崩した笑顔や自由奔放でつかみどころのない表情。

【重要】
毎回「太陽」を出すのは素人です。画像に「静かさ」があれば月、「軽やかさ」があれば風を積極的に選んでください。

回答は必ず以下のJSON形式で返してください：
{
"typeName": "判定されたタイプ名（太陽/月/風のいずれか）",
"tagLine": "そのタイプを象徴するキャッチコピー",
"description": "人相学に基づいた性格の詳しい解説（300円の価値を感じさせる、心に響く長文で）",
"keywords": ["特徴1", "特徴2", "特徴3"],
"strengths": ["強み1", "強み2", "強み3"],
"loveTips": ["アドバイス1", "アドバイス2", "アドバイス3"]
}`
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