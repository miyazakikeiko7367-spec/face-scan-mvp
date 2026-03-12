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
        content: `あなたは、顔の造形からその人の運命を読み解く、非常に厳格なプロの観相師です。
以下の【判定のチェックリスト】に従い、画像を1ミリ単位で分析して、3タイプから【最も適したもの1つ】を決定してください。

■ 判定のチェックリスト：

1. 太陽 (Happy Sunflower)
- 必須条件：口角が明確に上がっており、歯が見えるか、目が三日月型に笑っていること。
- 人相学：頬が高く、全体的に「動」と「陽」の気が溢れている。
- 注意：少しでも表情に「落ち着き」や「影」があれば、太陽とは判定しないでください。

2. 月 (Mystic Moon)
- 必須条件：口元が引き締まり、視線が穏やか、または鋭く知的であること。
- 人相学：目元が涼しげで、神秘的、あるいは静かな「静」の気を纏っている。
- 特徴：真顔や、微笑んでいても目に深みがある場合はこちら。

3. 風 (Free Breeze)
- 必須条件：左右で表情が少し違ったり、爽やかで軽やかな空気感があること。
- 人相学：骨格がすっきりしており、自由で捕らえどころのない「流」の気。
- 特徴：キメ顔や、少し首を傾けた自然体な表情はこちら。

【最重要ルール】
- 笑顔の人は「太陽」で正解です。
- しかし、澄ました顔や知的な顔を「太陽」と判定するのは鑑定士失格です。
- 全員の判定を合計したとき、太陽：月：風が 1：1：1 に近づくのが理想です。
- 回答は必ず以下のJSON形式で返してください。

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