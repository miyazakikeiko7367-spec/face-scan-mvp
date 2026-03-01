// src/app/result/page.tsx
'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MessageCircle, Instagram } from 'lucide-react';

const allResults: Record<string, any> = {
  sunflower: {
    name: '太陽のハッピー・サンフラワー顔',
    description: '周りをパッと明るくする「陽のオーラ」全開タイプ！\n\n自然とハッピーを引き寄せる最強の愛され顔です。',
    color: 'from-pink-400 to-yellow-300',
    freeImpression: '【人相学：あなたの第一印象鑑定】\n\nあなたは初対面の相手に対して、圧倒的な「安心感」と「親しみやすさ」を与える素晴らしい才能を持っています！\n\n額が広く、お顔のパーツに柔らかな丸みがあるため、人相学では「福徳相」と呼ばれます。\n\nこれは、自分だけでなく周囲にも幸運を分け与えることができる、とても徳の高い相なんですよ。\n\nあなたがその場にいるだけで、ギスギスした空気もふんわりと和らぎます。\n\nひまわりのような温かさと、太陽のような明るいエネルギーが、あなたの人生を切り拓く最強の武器になるでしょう。',
    marriage: { 
        free: '耳たぶがふっくらしているのは、豊かな愛情をたっぷりキャッチできるサインです。', 
        headers: ['【人相学：Loveポテンシャル鑑定】', '【未来のパートナーシップ】', '【開運メイク処方箋：愛され盛り】'],
        paid: '【人相学：Loveポテンシャル鑑定】\n\n笑った時にできる目尻のラインは、人相学では良縁をたぐり寄せる「キャッチネット」！\n\nあなたは無意識のうちに相手をリラックスさせる、深い母性のような包容力が顔全体に現れています。\n\n【未来のパートナーシップ】\n\nこれから、あなたの自然体な優しさに気づく、誠実なパートナーとの縁が急速に深まりやすい時期に入ります。\n\n相手はあなたの「芯の強さ」と「無邪気な笑顔」のギャップに、どうしようもなく心を奪われてしまうでしょう。\n\n【開運メイク処方箋：愛され盛り】\n\n目尻に「コーラルピンク」のシャドウをふんわり広げて、ハッピーな印象をさらにブーストしましょう！\n\n下まぶたの黒目の下にだけ「シャンパンゴールド」のラメを点置きしてください。\n\n潤んだ瞳があなたの魅力を3倍に高めて、素敵なご縁を逃さずキャッチしてくれます。' 
    },
    career: { 
        free: 'ツヤのある広い額は、豊かなアイデアと抜群の行動力を持っている証拠です。', 
        headers: ['【人相学：Workスタイル鑑定】', '【成功へのアクション】', '【開運メイク処方箋：自信UPスタイル】'],
        paid: '【人相学：Workスタイル鑑定】\n\n額の中央に透明感があるあなたは、自由な発想でチャンスを掴む天才肌です！\n\n組織のルールに縛られすぎず、直感を信じて動くことで才能がどんどん開花します。\n\n【成功へのアクション】\n\n自信を持ってスポットライトを浴びる準備をしておいてくださいね！\n\n運命はもう、あなたを主役にする準備を始めています。\n\n【開運メイク処方箋：自信UPスタイル】\n\n眉山をいつもより数ミリだけ高めに描いて、凛とした「デキる女」感を演出しましょう。' 
    },
    money: { 
        free: '鼻先の丸みは、豊かさをどんどん呼び込む「マネーマグネット」のような役割です。', 
        headers: ['【人相学：金運Lucky鑑定】', '【金運を育てるコツ】', '【開運メイク処方箋：金運爆上げハイライト】'],
        paid: '【人相学：金運Lucky鑑定】\n\n鼻先の丸みは、人相学では「蓄財の蔵」！\n\n一度掴んだチャンスを決して逃さない、賢いマネーセンスを生まれ持っています。\n\n【金運を育てるコツ】\n\n自分への投資（学びや美容）を惜しまないことで、さらなる大きな豊かさのサイクルが回り始めます。\n\nお金はあなたのワクワクするエネルギーが大好きなんです！\n\n【開運メイク処方箋：金運爆上げハイライト】\n\n鼻筋から鼻先にかけて、細かいパールの「シャンパンベージュ」を細くオン！\n\n顎の先にもちょこんと光を置くことで、顔全体に「豊かさ」のオーラが漂います。\n\n常に「内側から発光する肌」を作っておくことが、金運を引き寄せる最大のアクションになります。' 
    },
    reunion: { 
        free: '唇の厚みと、キュッと締まった口角は、一度結んだ縁を大切にする「一途な愛」の証です。', 
        headers: ['【人相学：リレーション再構築鑑定】', '【再会の引き寄せ】', '【開運メイク処方箋：ずるい女の隙ありメイク】'],
        paid: '【人相学：リレーション再構築鑑定】\n\nあなたは非常に情が深く、一度愛した人を簡単には忘れない「純愛の星」を顔に宿しています。\n\n【再会の引き寄せ】\n\nSNSなどで楽しそうな姿を見せることで、相手から「最近、もっと素敵になったね」と思わせたら、復縁へのカウントダウンは始まります！\n\n【開運メイク処方箋：ずるい女の隙ありメイク】\n\nチークは内側の低い位置に「ぽわん」と上気したように入れてください。\n\nリップは透け感のあるレッドグロスで「ぷるぷる感」を最大化しましょう！' 
    }
  },
  moon: {
    name: '静寂のエレガント・ムーン顔',
    description: 'ミステリアスで気品あふれる「大人レディ」タイプ！\n\n周囲に媚びない凛とした美しさが魅力です。',
    color: 'from-indigo-400 to-purple-300',
    freeImpression: '【人相学：あなたの第一印象鑑定】\n\nあなたは周囲から「知的で洗練された、凛とした人」という印象を抱かれています。',
    marriage: { free: 'スッと通った鼻筋は、誰にも依存しない自立した美しさの象徴です。', headers: ['【人相学：Loveポテンシャル鑑定】', '【魂で惹かれ合う相手】', '【開運メイク処方箋：月光の透明感】'], paid: '【人相学：Loveポテンシャル鑑定】\n\nあなたの切れ長で綺麗な瞳は、知性と品の良さが溢れ出ている証拠です。' },
    career: { free: 'シャープな顎のラインは、高い分析力と素早い決断力の証です。', headers: ['【人相学：Workスタイル鑑定】', '【唯一無二の存在感】', '【開運メイク処方箋：知的な美人オーラ】'], paid: '【人相学：Workスタイル鑑定】\n\n専門性を磨くことで、代わりのきかない唯一無二の存在になれます。' },
    money: { 
        free: '形の整った耳は、自分に必要な情報を賢く見極めるセンスの塊です。', 
        headers: ['【人相学：金運Lucky鑑定】', '【財を呼び込むコツ】', '【開運メイク処方箋：気品あふれるゴールド使い】'], 
        paid: '【人相学：金運Lucky鑑定】\n\n流行に流されず、本物を見極める素晴らしいセンスを持っています。\n\n【財を呼び込むコツ】\n\n眉間を明るく保つことで、運気の入り口がクリアになり、大きなチャンスが舞い込みます。\n\n【開運メイク処方箋：気品あふれるゴールド使い】\n\n目頭にほんの少しだけ、繊細なゴールドのハイライトを置いてください。\n\n知的な印象に「華やかさ」が加わり、格上の人脈や金運をグッと引き寄せてくれます。' 
    },
    reunion: { free: '凛とした佇まいは、離れた相手の心を再び揺さぶる力があります。', headers: ['【人相学：宿縁の再会鑑定】', '【沈黙の後の招待状】', '【開運メイク処方箋：再燃の衝撃】'], paid: '【人相学：宿縁の再会鑑定】\n\n以前より洗練された今の姿を見せることが、最大の引き寄せになります。' }
  },
  wind: {
    name: '爽やかな知性・風（ウィンド）顔',
    description: '横長の瞳を持つあなたは、コミュニケーション能力が高い「情報のハブ」！\n\nどこへ行っても馴染める、柔軟な魅力の持ち主です。',
    color: 'from-teal-400 to-blue-300',
    freeImpression: '【人相学：あなたの第一印象鑑定】\n\nあなたは「親しみやすく、軽やかで、センスが良い人」という印象を周囲に与えています。',
    marriage: { free: '眉間の広さは、何事も包み込む心の余裕と広さを表しています。', headers: ['【人相学：Loveポテンシャル鑑定】', '【自由な愛のカタチ】', '【開運メイク処方箋：隙ありピュア】'], paid: '【人相学：Loveポテンシャル鑑定】\n\n誰に対してもフラットに接するあなた。自由を愛する人との出会い運が高まっています。' },
    career: { free: '口の大きさは、あふれんばかりの生命力とエネルギーの証です。', headers: ['【人相学：Workスタイル鑑定】', '【時代の先を読む目】', '【開運メイク処方箋：成功のハブ】'], paid: '【人相学：Workスタイル鑑定】\n\n言葉に力があります。自分の言葉で世界を変えていくリーダータイプです。' },
    money: { 
        free: '眉の毛流れが整っているのは、金運がスムーズに流れているサインです。', 
        headers: ['【人相学：金運Lucky鑑定】', '【情報の波に乗る力】', '【開運メイク処方箋：ツヤ肌マネー引き寄せ】'], 
        paid: '【人相学：金運Lucky鑑定】\n\n必要な時にお金が入る「情報の波」に乗れるタイプ。直感を支えにしましょう。\n\n【情報の波に乗る力】\n\nフットワーク軽く動くことで、思わぬ場所から臨時収入のチャンスが巡ってきます。\n\n【開運メイク処方箋：ツヤ肌マネー引き寄せ】\n\nおでこの中央に、生ツヤ感のあるバームを薄く広げてください。\n\n「風」の要素を持つあなたは、額の輝きが直感力を高め、豊かさへの近道を教えてくれます。' 
    },
    reunion: { free: 'あなたのフットワークの軽さが、再び縁を結び直す大きな鍵になります。', headers: ['【人相学：リレーション再構築鑑定】', '【軽やかな再燃】', '【開運メイク処方箋：リフレッシュ_ラブ】'], paid: '【人相学：リレーション再構築鑑定】\n\nあなたの明るさが相手を救います。深刻になりすぎず、自然体で接することが復縁への近道。' }
  }
};

function ResultContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<string | null>(null);
  const type = searchParams.get('type') || 'sunflower';
  const result = allResults[type] || allResults['sunflower'];

  const isPaidMarriage = searchParams.get('marriage') === 'true';
  const isPaidCareer = searchParams.get('career') === 'true';
  const isPaidMoney = searchParams.get('money') === 'true';
  const isPaidReunion = searchParams.get('reunion') === 'true';

  const handlePayment = (id: string) => {
    setLoading(id);
    if (id === 'counseling') {
      setTimeout(() => {
        window.open('https://coconala.com/services/3494553', '_blank');
        setLoading(null);
      }, 800);
      return;
    }
    setTimeout(() => {
      const p = new URLSearchParams(window.location.search);
      p.set(id, 'true');
      window.location.href = `/result?${p.toString()}`;
    }, 1000);
  };

  const menuItems = [
    { id: 'freeImpression', title: '🔍 周囲から見た「あなたの第一印象」', detail: result.freeImpression, price: 0, isPaid: true },
    { id: 'marriage', title: '💖 【運命の恋】惹きつける相手', free: result.marriage.free, headers: result.marriage.headers, paid: result.marriage.paid, price: 300, isPaid: isPaidMarriage },
    { id: 'career', title: '🚀 【天職判明】才能を爆発させる職業', free: result.career.free, headers: result.career.headers, paid: result.career.paid, price: 300, isPaid: isPaidCareer },
    { id: 'money', title: '💰 【臨時収入】金運を引き寄せる顔', free: result.money.free, headers: result.money.headers, paid: result.money.paid, price: 300, isPaid: isPaidMoney },
    { id: 'reunion', title: '🌹 【復縁】ふたりの縁を戻すには', free: result.reunion.free, headers: result.reunion.headers, paid: result.reunion.paid, price: 300, isPaid: isPaidReunion },
    { id: 'counseling', title: '💎 特別個別鑑定カウンセリング', 
      intro: `AI診断の結果を超えた、プロによる1対1の本格鑑定。

あなたの写真を直接拝見し、
今、本当に必要な「運命を切り拓くアドバイス」を伝えます。

一生モノの「開運カルテ」を、
お一人おひとりに寄り添いながら丁寧に作成。

ココナラで大人気の特別メニューを、
本アプリ限定の特別な導線でご案内いたします✨`, 
      free: '※こちらは外部サイトでの個別診断となります。', price: 2500, isPaid: false },
  ];

  return (
    <main className="min-h-screen bg-[#FFFBEB] p-5 pb-16 font-sans text-left">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-black text-gray-900 mb-8 text-center tracking-tighter italic">Analysis Report</h1>
        <div className={`p-1 rounded-[40px] bg-gradient-to-br ${result.color} shadow-2xl mb-12 transform -rotate-1`}>
          <div className="bg-white p-8 rounded-[36px]">
            <p className="text-[10px] font-bold text-pink-400 mb-2 tracking-widest uppercase">Personality Result</p>
            <h2 className="text-2xl font-black mb-4 text-gray-800">{result.name}</h2>
            <p className="text-sm text-gray-600 leading-relaxed font-medium whitespace-pre-wrap">{result.description}</p>
          </div>
        </div>

        <div className="space-y-12">
          {menuItems.map((item: any) => (
            <div key={item.id} className={`bg-white rounded-[32px] p-7 shadow-xl border-2 transition-all ${item.id === 'counseling' ? 'border-purple-200 bg-gradient-to-b from-white to-purple-50 shadow-[0_0_20px_rgba(168,85,247,0.2)]' : 'border-transparent'}`}>
              <h3 className="text-lg font-black mb-5 text-gray-800 leading-tight">{item.title}</h3>
              <div className="relative">
                {item.isPaid ? (
                  <div className="bg-yellow-50/60 p-6 rounded-[24px] border-2 border-yellow-100/50 shadow-inner">
                    {(item.paid || item.detail || "").split('\n\n').map((para: string, i: number) => (
                      <div key={i} className="mb-6 last:mb-0">
                        {para.split('\n').map((line: string, j: number) => (
                          <p key={j} className={line.startsWith('【') ? "font-black text-gray-900 mb-3 text-[16px] border-b-2 border-yellow-200 pb-1 flex items-center gap-2" : "leading-[1.8] mb-1 text-gray-700 font-medium whitespace-pre-wrap"}>
                            {line.startsWith('【') && <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>}{line}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="pt-2 pb-2">
                    {item.id === 'counseling' ? (
                      <div className="pt-2 text-center">
                        <p className="text-[13px] text-gray-600 mb-8 leading-relaxed font-medium italic">※こちらは外部サイトでの個別診断となります。</p>
                        <p className="text-[14px] text-gray-700 mb-8 leading-relaxed font-bold bg-purple-50 p-6 rounded-2xl border border-purple-100 whitespace-pre-wrap">{item.intro}</p>
                        <button onClick={() => window.open('https://coconala.com/services/3707759?ref=profile_top_service', '_blank')} className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-black py-5 rounded-full shadow-xl transition-all active:scale-95 text-lg">詳細をチェックする ✨</button>
                        <p className="mt-4 text-[11px] text-gray-400 font-bold tracking-widest uppercase text-center">鑑定料：¥2,500（ココナラへ移動）</p>
                      </div>
                    ) : (
                      <div className="relative pt-2 pb-4">
                        <div className="text-[13px] text-gray-500 bg-gray-50/80 p-5 rounded-2xl border border-dashed border-gray-200 mb-6 leading-relaxed italic">{item.free}</div>
                        <div className="space-y-4 opacity-40 select-none pointer-events-none">
                          {item.headers?.map((header: string, idx: number) => (
                            <div key={idx}>
                              <p className="font-black text-gray-900 mb-2 text-[15px] border-b border-gray-200 pb-1 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>{header}</p>
                              <div className="blur-[6px] h-12 bg-gray-100 rounded-lg"></div>
                            </div>
                          ))}
                        </div>
                        <div className="absolute inset-x-0 bottom-0 top-[80px] flex flex-col items-center justify-end bg-gradient-to-t from-white via-white/80 to-transparent pb-4">
                          <button onClick={() => handlePayment(item.id)} disabled={loading !== null} className="bg-[#FF4D91] text-white font-black py-4 px-10 rounded-full shadow-xl transition-all active:scale-95 shadow-[0_8px_0_#CC0052] text-lg">
                            {loading === item.id ? 'Loading...' : `続きをみる (¥${item.price})`}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFFBEB] flex items-center justify-center font-bold text-pink-400">Loading Report...</div>}>
      <ResultContent />
    </Suspense>
  );
}