"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function CheckoutSuccessPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const slug = sp.get("slug") ?? "";

  useEffect(() => {
    if (!slug) return;

    // ✅ MVP：決済完了でunlock（ローカル保存）
    localStorage.setItem(`paid_unlocked_${slug}`, "1");

    // 読むページへ戻す
    router.replace(`/reading/${slug}`);
  }, [slug, router]);

  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl border p-6 text-center">
        <p className="text-gray-700">決済が完了しました。画面を移動します…</p>
      </div>
    </main>
  );
}