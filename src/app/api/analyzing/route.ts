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
        content: `あなたは人相学（観相学）の奥義を極めた、冷徹かつ的確な鑑定師です。
画像の人物の「目」「眉」「口」「輪郭」を精密に分析し、以下の3タイプから【最もふさわしい1つ】を厳選してください。

■ 鑑定の評価基準（人相学アプローチ）：
1. 太陽 (Happy Sunflower)
- 目：目尻が下がり、三日月のような形。黒目が大きく輝いている。
- 口：口角が上向きで、唇に厚みと血色がある。
- 輪郭：丸顔や卵型で、頬がふっくらとして血色が良い。
2. 月 (Mystic Moon)
- 目：細長く涼しげ。視線に深みがあり、神秘的または知的な光を宿す。
- 口：一文字に結ばれ、唇の輪郭がはっきりしている。
- 輪郭：逆三角形や面長。
3. 風 (Free Breeze)
- 目：左右非対称な魅力や、動くたびに印象が変わる変幻自在な目元。
- 口：遊び心のある口元。
- 輪郭：骨格がしっかりしており、どこか中性的で軽やかな印象。

【鉄の掟】
統計的に、10人を鑑定すれば 3:3:4 程度の割合でバラけるのが自然です。今の「太陽」への偏りを恥じ、冷徹な鑑定を行ってください。必ず以下のJSON形式で回答してください。

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