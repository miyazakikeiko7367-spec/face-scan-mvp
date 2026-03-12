import Link from 'next/link';

export default function Tokushoho() {
  return (
    <div className="min-h-screen bg-pink-50 p-8 text-gray-800 font-sans">
      <div className="max-w-2xl mx-auto bg-white p-10 rounded-3xl shadow-sm">
        <h1 className="text-2xl font-bold mb-8 border-b pb-4 text-pink-600">
          特定商取引法に基づく表記
        </h1>

        <div className="space-y-6">
          <section>
            <h2 className="font-bold text-gray-700">販売業者</h2>
            <p>[あなたの本名 または 屋号]</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-700">代表責任者</h2>
            <p>[あなたの本名]</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-700">所在地</h2>
            <p>[あなたの住所（Stripe登録住所と一致させること）]</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-700">電話番号</h2>
            <p>[あなたの電話番号]</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-700">メールアドレス</h2>
            <p>[問い合わせ用メールアドレス]</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-700">販売価格</h2>
            <p>各診断メニューごとに表示（税込 300円）</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-700">商品代金以外の必要料金</h2>
            <p>インターネット接続料金、通信料金等はお客様のご負担となります。</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-700">支払方法</h2>
            <p>クレジットカード決済（Stripe）</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-700">商品の引き渡し時期</h2>
            <p>決済完了後、直ちにAIによる分析結果を画面上に表示いたします。</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-700">返品・キャンセルについて</h2>
            <p>デジタルコンテンツの特性上、決済完了後の返品・返金・キャンセルには応じられません。</p>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="text-pink-400 hover:underline">
            ← トップページへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}