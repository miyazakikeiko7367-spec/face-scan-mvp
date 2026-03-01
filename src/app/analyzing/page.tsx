// 🧠 本物のAI判定ロジック（エラー修正・バランス調整版）
  const analyzeFace = () => {
    if (!faceLandmarker || !videoRef.current) return;

    const result = faceLandmarker.detectForVideo(videoRef.current, performance.now());
    
    if (result.faceLandmarks && result.faceLandmarks.length > 0) {
      // landmarks を any 型として扱うことで TypeScript のエラーを回避します
      const landmarks = result.faceLandmarks[0] as any;

      // 1. 口角の上がり具合（13番:唇中央, 61/291:口角）
      const mouthScore = (landmarks[13].y - (landmarks[61].y + landmarks[291].y) / 2);

      // 2. 目の開き具合（159番/145番:上まぶたと下まぶたの距離）
      const eyeOpen = Math.abs(landmarks[159].y - landmarks[145].y);

      // 3. 顔の横幅（454番/234番）と縦幅（10番/152番）の比率
      const faceWidth = Math.abs(landmarks[454].x - landmarks[234].x);
      const faceHeight = Math.abs(landmarks[10].y - landmarks[152].y);
      const faceRatio = faceWidth / faceHeight;

      let type = 'wind'; 

      // --- 判定ロジック ---
      if (mouthScore > 0.025) { 
        type = 'sunflower'; 
      } else if (eyeOpen < 0.022 || faceRatio < 0.7) { 
        type = 'moon'; 
      } else {
        type = 'wind';
      }

      console.log("AI Scores:", { mouthScore, eyeOpen, faceRatio, type });
      router.push(`/loading?type=${type}`);
    } else {
      alert("顔が見えないよ！もっとカメラに近づいてみてね📸");
    }
  };