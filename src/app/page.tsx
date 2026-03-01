// src/app/page.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function TopPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#FFFBEB] flex flex-col items-center justify-between p-8 font-sans overflow-hidden relative">
      
      {/* 🎨 背景のデコレーション */}
      <div className="absolute top-[-50px] left-[-50px] w-40 h-40 bg-pink-200 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-10 right-[-30px] w-60 h-60 bg-yellow-200 rounded-full blur-3xl opacity-50"></div>

      <div className="z-10 w-full max-w-md flex flex-col items-center pt-16 pb-10">
        
        {/* ✨ タイトルセクション */}
        <div className="bg-white rounded-full py-2 px-6 shadow-sm mb-6 border-2 border-pink-200">
          <p className="text-pink-500 font-bold text-xs tracking-widest uppercase">✨ AI Physiognomy & Makeup ✨</p>
        </div>
        
        <h1 className="text-4xl font-black text-gray-800 text-center leading-tight mb-4 tracking-tighter">
          人相学でわかる！<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
            最強の開運メイク
          </span><br />
          診断アプリ
        </h1>

        <p className="text-gray-500 font-medium text-center text-sm leading-relaxed mb-10">
          AIがあなたの顔パーツを10秒解析！<br />
          生まれ持った「福」を引き出し、<br />
          運命を変えるメイク術を教えます。
        </p>

        {/* 🔮 メインビジュアルイメージ（アイコンやイラスト風） */}
        <div className="relative mb-12">
          <div className="w-48 h-48 bg-white rounded-[48px] shadow-2xl flex items-center justify-center transform rotate-3 border-4 border-pink-100 overflow-hidden">
             <span className="text-8xl animate-pulse">💄</span>
          </div>
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center text-3xl shadow-lg animate-bounce">
            ✨
          </div>
          <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-pink-400 rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg animate-pulse">
            👁️
          </div>
        </div>

        {/* 💡 診断のポイント */}
        <div className="grid grid-cols-2 gap-4 w-full mb-12">
          <div className="bg-white/60 p-4 rounded-2xl border border-white text-center">
            <span className="block text-xl mb-1">🔍</span>
            <p className="text-[10px] font-bold text-gray-600 uppercase">AI顔解析</p>
          </div>
          <div className="bg-white/60 p-4 rounded-2xl border border-white text-center">
            <span className="block text-xl mb-1">💄</span>
            <p className="text-[10px] font-bold text-gray-600 uppercase">開運メイク</p>
          </div>
        </div>
      </div>

      {/* 🔘 診断スタートボタン */}
      <div className="z-10 w-full max-w-md pb-10">
        <button 
          onClick={() => router.push('/camera')}
          className="w-full bg-[#FF4D91] hover:bg-[#FF1A75] text-white font-black py-5 px-10 rounded-[28px] shadow-[0_8px_0_#CC0052] active:translate-y-1 active:shadow-none transition-all text-xl"
        >
          診断をスタート！ 👉
        </button>
        <p className="text-center text-gray-400 text-[10px] mt-6">
          診断にはカメラへのアクセスが必要です。<br />
          写真は解析のみに使用され、保存されません。
        </p>
      </div>
    </main>
  );
}