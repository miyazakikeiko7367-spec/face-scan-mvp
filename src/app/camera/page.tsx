// src/app/camera/page.tsx
'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [faceLandmarker, setFaceLandmarker] = useState<any>(null);
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    async function initAI() {
      const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
      );
      const landmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
        baseOptions: {
          modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
          delegate: "GPU"
        },
        runningMode: "VIDEO",
        numFaces: 1
      });
      setFaceLandmarker(landmarker);
    }
    initAI();

    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsReady(true);
        }
      } catch (err) {
        alert("カメラを許可して、あなたの素敵な表情を見せてくださいね✨");
      }
    }
    startCamera();
  }, []);

  const analyzeFace = () => {
    if (!faceLandmarker || !videoRef.current) return;

    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 150);

    const result = faceLandmarker.detectForVideo(videoRef.current, performance.now());
    
    if (result.faceLandmarks && result.faceLandmarks.length > 0) {
      const landmarks = result.faceLandmarks[0];

      // 📏 骨格・パーツの配置を数値化
      const faceWidth = Math.abs(landmarks[454].x - landmarks[234].x);
      const faceHeight = Math.abs(landmarks[10].y - landmarks[152].y);
      const faceRatio = faceWidth / faceHeight;
      const foreheadHeight = Math.abs(landmarks[10].y - landmarks[9].y);
      const eyeWidth = Math.abs(landmarks[133].x - landmarks[33].x);

      let type = 'wind';

      // --- ⚖️ 精密人相判定（明るい未来を導くロジック） ---
      if (faceRatio > 0.82 && foreheadHeight > 0.075) {
        type = 'sunflower'; // 豊かな額と丸み＝太陽
      } else if (faceRatio < 0.76 || eyeWidth < 0.035) {
        type = 'moon'; // 凛とした面長＝月
      } else {
        type = 'wind'; // バランスの取れた美＝風
      }

      router.push("/loading?type=" + type);
    } else {
      alert("お顔がよく見えるように、もう少し近づいてみてくださいね📸");
    }
  };

  return (
    <main className="min-h-screen bg-[#FFFBEB] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {isFlashing && <div className="fixed inset-0 bg-white z-50"></div>}
      <div className="max-w-md w-full text-center z-10">
        <h1 className="text-2xl font-black text-gray-900 mb-2 tracking-tighter text-left ml-4 italic">
          Deep Face Scanning...
        </h1>
        <p className="text-pink-500 font-bold mb-8 text-sm text-left ml-4">
          あなたの骨格とパーツから、幸せの種を見つけ出します✨
        </p>

        <div className="relative w-72 h-72 mx-auto mb-12 overflow-hidden rounded-[50px] border-4 border-white shadow-2xl bg-black">
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover scale-x-[-1]" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[85%] h-[85%] border-4 border-dashed border-pink-400/50 rounded-full animate-pulse"></div>
            <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-pink-400 to-transparent absolute animate-[scan_3s_infinite]"></div>
          </div>
        </div>

        <button 
          onClick={analyzeFace} 
          className="w-24 h-24 rounded-full border-8 border-white bg-gradient-to-br from-pink-400 to-orange-300 shadow-xl flex items-center justify-center text-3xl active:scale-95 transition-all animate-bounce"
        >
          🔮
        </button>
        <p className="mt-6 text-gray-400 text-[10px] font-black tracking-[0.2em] uppercase">
          Now Analyzing Your Beauty
        </p>
      </div>
      <style jsx>{` @keyframes scan { 0% { top: 0%; opacity: 0; } 50% { top: 100%; opacity: 1; } 100% { top: 0%; opacity: 0; } } `}</style>
    </main>
  );
}