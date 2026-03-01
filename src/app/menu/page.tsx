// src/app/menu/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// 仮のメニューデータ（本来は別のファイルから読み込む）
const menuData = {
  marriage: {
    title: '結婚相手の特徴',
    free: 'あなたは福相の持ち主。顎がしっかりした人があなたの運気を支えます。',
    paid: '運命の相手は、来年の春、水辺のカフェで出会う人。特に目の周りに特徴がある人とは魂の相性が抜群です。',
  },
  reconciliation: {
    title: '復縁の可能性と逆転ルート',
    free: '今のあなたの表情からは、まだ未練と新しい可能性が混在しているように見えます。',
    paid: '逆転の鍵は「眉の形」を変えること。相手はあなたの〇〇な部分を懐かしく思っています。直接の連絡は〇月〇日以降に。',
  },
};

function MenuContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') as keyof typeof menuData;
  const data = menuData[type] || menuData.marriage; // デフォルトは結婚相手

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto bg-white rounded-3xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">{data.title}</h1>
        
        {/* 無料部分 */}
        <div className="bg-gray-100 p-5 rounded-xl mb-6">
          <h2 className="text-sm font-bold text-gray-500 mb-2">無料鑑定</h2>
          <p className="text-gray-800 text-sm">{data.free}</p>
        </div>

        {/* 有料部分（モザイクあり） */}
        <div className="relative border-2 border-dashed border-gray-300 p-5 rounded-xl">
          <h2 className="text-sm font-bold text-gray-500 mb-2">プレミアム鑑定（有料）</h2>
          
          <div className="blur-sm select-none text-sm text-gray-800">
            {data.paid}
          </div>

          {/* 決済誘導オーバーレイ */}
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl">
            <p className="text-lg font-bold text-gray-900 mb-3">この先の鑑定には</p>
            <button className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:from-purple-600 hover:to-indigo-700 transition">
              ¥300 でモザイクを解除
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <MenuContent />
    </Suspense>
  );
}