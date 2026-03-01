// src/app/loading/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoadingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('顔立ちをスキャン中...');

  // 演出用のメッセージ切り替え
  const messages = [
    'パーツの配置を分析しています...',
    '人相学データベースと照合中...',
    'あなたの「福徳相」を特定しました！',
    'ベストな開運メイクを算出しています...',
    '鑑定レポートを作成中✨',
  ];

  useEffect(() => {
    // プログレスバーのアニメーション
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 100;
        }
        const diff = Math.random() * 15;
        return Math.min(oldProgress + diff, 100);
      });
    }, 400);

    // メッセージのランダム切り替え
    const messageTimer = setInterval(() => {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, 1200);

    // 5秒後に診断結果ページへ（本番では解析完了後に遷移）
    const redirectTimer = setTimeout(() => {
      router.push('/result');
    }, 5500);

    return () => {
      clearInterval(timer);
      clearInterval(messageTimer);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <main className="min-h-screen bg-[#FFFBEB] flex flex-col items-center justify-center p-8 font-sans">
      <div className="max-w-md w-full text-center">
        
        {/* ✨ キラキラアニメーション（簡易版） */}
        <div className="relative mb-12 flex justify-center">
          <div className="w-32 h-32 bg-gradient-to-tr from-pink-400 to-yellow-300 rounded-full animate-pulse shadow-2xl flex items-center justify-center">
             <span className="text-5xl animate-bounce">🔮</span>
          </div>
          {/* 周りのキラキラパーツ */}
          <div className="absolute top-0 right-10 animate-ping text-xl">✨</div>
          <div className="absolute bottom-4 left-8 animate-ping delay-300 text-lg">💖</div>
          <div className="absolute top-1/2 -left-4 animate-bounce text-2xl">💄</div>
        </div>

        <h2 className="text-2xl font-black text-gray-800 mb-2">AI解析中...</h2>
        <p className="text-pink-500 font-bold mb-8 animate-pulse text-sm">
          {message}
        </p>

        {/* 📊 プログレスバー */}
        <div className="w-full bg-white h-6 rounded-full overflow-hidden border-2 border-pink-100 shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-pink-400 via-rose-400 to-yellow-300 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-gray-400 text-xs font-bold">{Math.round(progress)}% COMPLETED</p>

        <div className="mt-16 text-gray-400 text-[10px] leading-relaxed">
          あなたのプライバシーは保護されています。<br />
          画像データは解析後に自動的に破棄されます。
        </div>
      </div>
    </main>
  );
}