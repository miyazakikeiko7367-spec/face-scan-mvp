"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { MENU_ITEMS } from "@/lib/menuItems";

export default function ReadingPage() {
  const params = useParams();
  const router = useRouter();

  const slug = params.slug as string;

  // メニュー取得
  const item = useMemo(() => {
    return MENU_ITEMS.find((x) => x.slug === slug);
  }, [slug]);

  // unlock状態
  const storageKey = `paid_unlocked_${slug}`;
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(storageKey);
    if (saved === "1") setUnlocked(true);
  }, [storageKey]);

  // 決済ページへ
  const goToCheckout = () => {
    router.push(`/checkout/${slug}`);
  };

  // unlock用（テスト）
  const unlockForTest = () => {
    localStorage.setItem(storageKey, "1");
    setUnlocked(true);
  };

  if (!item) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div>メニューが見つかりません</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex justify-center py-10">
      <div className="w-full max-w-2xl">

        {/* 戻る */}
        <Link href="/result">
          <div className="mb-6 text-sm text-gray-500 cursor-pointer">
            ← メニューへ戻る
          </div>
        </Link>

        {/* タイトル */}
        <h1 className="text-2xl font-bold mb-6">
          {item.title}
        </h1>

        {/* 本文カード */}
        <div className="border rounded-2xl p-6 bg-white leading-7">

          {/* ========= 無料部分 ========= */}
          {item.freeText && (
            <div>
              {item.freeText
                .split("\n")
                .filter((line) => line.trim() !== "")
                .map((line, i) => (
                  <p key={`free-${i}`} className="mb-4 whitespace-pre-line">
                    {line}
                  </p>
                ))}
            </div>
          )}

          {/* ========= 有料部分 ========= */}
          {!item.isFree && item.paidText && (
            <>
              <hr className="my-6" />

              <div className="relative border rounded-2xl p-6">

                {/* 有料本文 */}
                <div
                  className={
                    unlocked
                      ? ""
                      : "blur-sm select-none pointer-events-none"
                  }
                >
                  {item.paidText
                    .split("\n")
                    .filter((line) => line.trim() !== "")
                    .map((line, i) => (
                      <p key={`paid-${i}`} className="mb-4 whitespace-pre-line">
                        {line}
                      </p>
                    ))}
                </div>

                {/* ロック時オーバーレイ */}
                {!unlocked && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 rounded-2xl">

                    <div className="mb-3 text-sm">
                      続きは有料コンテンツです
                    </div>

                    <button
                      onClick={goToCheckout}
                      className="bg-pink-500 text-white px-6 py-3 rounded-full mb-3"
                    >
                      続きを読む（有料）
                    </button>

                    {/* テスト用unlock */}
                    <button
                      onClick={unlockForTest}
                      className="text-xs underline text-gray-500"
                    >
                      （テスト用unlock）
                    </button>

                  </div>
                )}
              </div>
            </>
          )}

        </div>

      </div>
    </main>
  );
}