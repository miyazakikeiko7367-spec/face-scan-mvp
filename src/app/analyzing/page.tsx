export default function AnalyzingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-xl font-bold mb-4">
          あなたの顔タイプを分析しています…
        </h1>

        <div className="animate-pulse text-pink-500 text-lg mb-4">
          AIが診断中
        </div>

        <p className="text-gray-600 text-sm">
          数秒で結果が表示されます
        </p>
      </div>
    </main>
  );
}