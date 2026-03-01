"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type Result = {
  typeName?: string;
  tagline?: string;
  keywords?: string[];
  description?: string;
};

export default function PaidPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    localStorage.setItem("paid", "true");// resultページで localStorage に入れてた診断結果を読み出す
    const saved = localStorage.getItem("result");
    if (saved) setResult(JSON.parse(saved));
  }, []);

  const fullText = useMemo(() => {
    // ここが「完全版っぽい文章」：後で好きなだけ変えてOK
    const typeName = result?.typeName ?? "あなたのタイプ";
    const tagline = result?.tagline ?? "あなたらしい恋愛の鍵";
    const keywords = (result?.keywords ?? []).slice(0, 4);

    return `✅ 支払いありがとうございます！

【完全版】${typeName}
${tagline}

■ 恋愛の強み
・相手の気持ちを落ち着かせる安心感
・空気をやわらげる優しさ
・「一緒にいるとホッとする」雰囲気

■ 恋がうまくいくコツ
・我慢しすぎる前に、やさしく希望を言葉にする
・相手に合わせすぎず「私はこうが好き」を少しずつ出す

■ 出会い運を上げる行動
・“癒し系”の雰囲気が伝わる写真に変える
・ふんわり色（ピンク/ラベンダー系）を一点入れる

■ あなた専用キーワード
${keywords.length ? "・" + keywords.join("\n・") : "・（キーワードはここに表示）"}

（この文章は仮の完全版です。次の段階で、あなたのメニュー項目ごとに
「長文の鑑定」をAIで生成して表示できます。）`;
  }, [result]);

  return (
    <main className="min-h-screen p-10 bg-white text-black">
      <h1 className="text-3xl font-bold mb-2">有料鑑定（完全版）</h1>
      <p className="text-xs text-gray-500 mb-6">
        session_id: {sessionId ?? "（なし）"}
      </p>

      {/* 元の結果も表示（安心） */}
      {result && (
        <div className="mb-6 bg-gray-50 border rounded p-4">
          <div className="font-semibold mb-2">無料診断の結果</div>
          <div className="text-lg font-bold">{result.typeName}</div>
          <div className="text-sm text-gray-600">{result.tagline}</div>
          <div className="flex flex-wrap gap-2 mt-3">
            {(result.keywords ?? []).map((k, i) => (
              <span
                key={i}
                className="text-xs bg-purple-100 text-purple-800 px-3 py-1 rounded-full"
              >
                {k}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-700 mt-3">{result.description}</p>
        </div>
      )}

      {/* 完全版 */}
      <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
        {fullText}
      </pre>

      <div className="mt-8 flex gap-4">
        <a className="underline" href="/menu">
          メニューへ戻る
        </a>
        <a className="underline" href="/result">
          結果へ戻る
        </a>
      </div>
    </main>
  );
}