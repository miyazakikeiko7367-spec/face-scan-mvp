"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);

  const previewUrl = useMemo(() => {
    if (!file) return "";
    return URL.createObjectURL(file);
  }, [file]);

  const onAnalyzeClick = () => {
    if (!file) return;

    // ✅ ここがポイント：ファイルを一時的に window に持たせて、即「分析中」へ
    (window as any).__faceScanFile = file;

    // ✅ 押したらすぐ遷移（ここで base64 化や fetch はしない）
    router.push("/analyzing");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-md rounded-3xl border bg-white p-6 shadow-sm">
        <h1 className="text-center text-3xl font-bold text-gray-900">写真アップ</h1>
        <p className="mt-2 text-center text-sm text-gray-500">
          ※顔が正面に近い写真がおすすめ
        </p>

        <div className="mt-6">
          <input
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-700"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </div>

        {previewUrl && (
          <div className="mt-4 rounded-2xl border p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="preview"
              className="w-full rounded-xl object-cover"
            />
          </div>
        )}

        <button
          type="button"
          onClick={onAnalyzeClick}
          disabled={!file}
          className={`mt-6 w-full rounded-full py-4 font-semibold text-white ${
            file ? "bg-pink-600 hover:bg-pink-700" : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          分析する
        </button>
      </div>
    </main>
  );
}