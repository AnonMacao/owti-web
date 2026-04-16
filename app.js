(function () {
  const state = {
    currentQuestionIndex: 0,
    activeQuestions: [],
    answers: [],
    userVector: null,
    ranking: [],
    bounds: {}
  };

  const screens = {
    intro: document.getElementById("screen-intro"),
    quiz: document.getElementById("screen-quiz"),
    result: document.getElementById("screen-result")
  };

  const refs = {
    heroCount: document.getElementById("hero-count"),
    dimensionCount: document.getElementById("dimension-count"),
    questionCount: document.getElementById("question-count"),
    dimensionList: document.getElementById("dimension-list"),
    heroRoster: document.getElementById("hero-roster"),
    questionTitle: document.getElementById("question-title"),
    optionList: document.getElementById("option-list"),
    progressText: document.getElementById("progress-text"),
    progressPercent: document.getElementById("progress-percent"),
    progressFill: document.getElementById("progress-fill"),
    prevButton: document.getElementById("prev-button"),
    exportButton: document.getElementById("export-button"),
    heroVisual: document.querySelector(".hero-visual"),
    resultPortrait: document.getElementById("result-portrait"),
    heroBadge: document.getElementById("hero-badge"),
    resultTypeCode: document.getElementById("result-type-code"),
    resultRarityPill: document.getElementById("result-rarity-pill"),
    resultName: document.getElementById("result-name"),
    resultTypeTagline: document.getElementById("result-type-tagline"),
    resultSummary: document.getElementById("result-summary"),
    tagRow: document.getElementById("tag-row"),
    storyBlocks: document.getElementById("story-blocks"),
    topMatchList: document.getElementById("top-match-list"),
    metricList: document.getElementById("metric-list"),
    vectorTags: document.getElementById("vector-tags"),
    vectorNote: document.getElementById("vector-note"),
    finePrint: document.getElementById("fine-print"),
    radarCanvas: document.getElementById("radar-canvas"),
    modelAnchor: document.getElementById("model-anchor")
  };

  init();

  function init() {
    refs.heroCount.textContent = window.HEROES.length;
    refs.dimensionCount.textContent = window.DIMENSIONS.length;
    refs.questionCount.textContent = window.QUIZ_LENGTH;

    renderDimensionList();
    renderRoster();
    bindEvents();
  }

  function bindEvents() {
    document.getElementById("start-button").addEventListener("click", startQuiz);
    document.getElementById("sample-button").addEventListener("click", useRandomAnswers);
    document.getElementById("jump-model-button").addEventListener("click", () => {
      refs.modelAnchor.open = true;
      refs.modelAnchor.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    document.getElementById("restart-button").addEventListener("click", startQuiz);
    document.getElementById("retake-button").addEventListener("click", startQuiz);
    document.getElementById("back-to-model-button").addEventListener("click", () => {
      showScreen("intro");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    refs.exportButton.addEventListener("click", exportShareCard);
    refs.prevButton.addEventListener("click", goPrevious);
  }

  function getDimensionBounds(questionSet) {
    const totals = Object.fromEntries(window.DIMENSIONS.map((dim) => [dim.id, 0]));

    questionSet.forEach((question) => {
      Object.entries(question.effects).forEach(([dimensionId, weight]) => {
        totals[dimensionId] += Math.abs(weight) * 3;
      });
    });

    return totals;
  }

  function showScreen(key) {
    Object.entries(screens).forEach(([name, element]) => {
      element.classList.toggle("active", name === key);
    });
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function startQuiz() {
    state.currentQuestionIndex = 0;
    state.activeQuestions = buildQuizSet();
    state.answers = Array(state.activeQuestions.length).fill(null);
    state.userVector = null;
    state.ranking = [];
    state.bounds = getDimensionBounds(state.activeQuestions);
    showScreen("quiz");
    renderQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function useRandomAnswers() {
    state.activeQuestions = buildQuizSet();
    state.answers = state.activeQuestions.map(() => {
      const randomIndex = Math.floor(Math.random() * window.LIKERT_OPTIONS.length);
      return window.LIKERT_OPTIONS[randomIndex].value;
    });
    state.bounds = getDimensionBounds(state.activeQuestions);
    finishQuiz();
  }

  function renderQuestion() {
    const question = state.activeQuestions[state.currentQuestionIndex];
    const progress = ((state.currentQuestionIndex + 1) / state.activeQuestions.length) * 100;
    const selectedValue = state.answers[state.currentQuestionIndex];

    refs.progressText.textContent = `第 ${state.currentQuestionIndex + 1} / ${state.activeQuestions.length} 题`;
    refs.progressPercent.textContent = `${Math.round(progress)}%`;
    refs.progressFill.style.width = `${progress}%`;
    refs.prevButton.disabled = state.currentQuestionIndex === 0;

    refs.questionTitle.textContent = question.title;
    refs.optionList.innerHTML = "";

    window.LIKERT_OPTIONS.forEach((option) => {
      const button = document.createElement("button");
      button.className = "option-btn option-btn-scale";
      button.type = "button";
      if (selectedValue === option.value) {
        button.classList.add("is-selected");
      }
      const dotConfig = getScaleDotConfig(option.value);
      button.innerHTML = `
        <span class="scale-dot" style="width:${dotConfig.size}px;height:${dotConfig.size}px;background:${dotConfig.color};"></span>
      `;
      button.addEventListener("click", () => handleAnswer(option.value));
      refs.optionList.appendChild(button);
    });
  }

  function getScaleDotConfig(value) {
    const map = {
      3: { size: 56, color: "#3ea85f" },
      2: { size: 50, color: "#67bb69" },
      1: { size: 42, color: "#95c97a" },
      0: { size: 30, color: "#d8cfbf" },
      "-1": { size: 42, color: "#e6b07d" },
      "-2": { size: 50, color: "#da8567" },
      "-3": { size: 56, color: "#cb5a57" }
    };
    return map[String(value)];
  }

  function handleAnswer(scaleValue) {
    state.answers[state.currentQuestionIndex] = scaleValue;

    if (state.currentQuestionIndex < state.activeQuestions.length - 1) {
      state.currentQuestionIndex += 1;
      renderQuestion();
      return;
    }

    finishQuiz();
  }

  function goPrevious() {
    if (state.currentQuestionIndex === 0) {
      return;
    }
    state.currentQuestionIndex -= 1;
    renderQuestion();
  }

  function finishQuiz() {
    state.userVector = calculateUserVector();
    state.ranking = rankHeroes(state.userVector);
    renderResults();
    showScreen("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function calculateUserVector() {
    const raw = Object.fromEntries(window.DIMENSIONS.map((dim) => [dim.id, 0]));

    state.activeQuestions.forEach((question, questionIndex) => {
      const answerValue = state.answers[questionIndex];
      if (answerValue === null) {
        return;
      }

      Object.entries(question.effects).forEach(([dimensionId, delta]) => {
        raw[dimensionId] += delta * answerValue;
      });
    });

    return Object.fromEntries(
      window.DIMENSIONS.map((dim) => {
        const maxAbs = state.bounds[dim.id] || 1;
        const scaled = 50 + (raw[dim.id] / maxAbs) * 50;
        return [dim.id, Math.round(clamp(scaled, 0, 100))];
      })
    );
  }

  function buildQuizSet() {
    const groups = Object.fromEntries(window.DIMENSIONS.map((dim) => [dim.id, []]));

    window.QUESTIONS.forEach((question) => {
      groups[question.primary].push(question);
    });

    const quotas = {
      warmth: 5,
      protectiveness: 5,
      idealism: 4,
      principle: 4,
      candor: 4,
      independence: 3,
      playfulness: 2,
      introspection: 3
    };
    const selected = [];

    Object.keys(quotas).forEach((dimensionId) => {
      const pool = shuffle([...groups[dimensionId]]);
      selected.push(...pool.slice(0, quotas[dimensionId]));
    });

    return shuffle(selected).slice(0, window.QUIZ_LENGTH);
  }

  function shuffle(list) {
    const clone = [...list];
    for (let index = clone.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [clone[index], clone[swapIndex]] = [clone[swapIndex], clone[index]];
    }
    return clone;
  }

  function rankHeroes(userVector) {
    return window.HEROES.map((hero) => {
      let weightedSquareSum = 0;
      let totalWeight = 0;

      window.DIMENSIONS.forEach((dim) => {
        const weight = window.DIMENSION_WEIGHTS[dim.id] || 1;
        const delta = userVector[dim.id] - hero.vector[dim.id];
        weightedSquareSum += weight * delta * delta;
        totalWeight += weight;
      });

      const distance = Math.sqrt(weightedSquareSum / totalWeight) * (hero.matchScale || 1);
      const similarity = Math.round(clamp(100 - distance, 0, 100));
      return { hero, similarity, distance };
    }).sort((a, b) => {
      if (b.similarity !== a.similarity) {
        return b.similarity - a.similarity;
      }
      return a.distance - b.distance;
    });
  }

  function getSignatureTags(userVector) {
    return window.DIMENSIONS.map((dim) => {
      const score = userVector[dim.id];
      return {
        deviation: Math.abs(score - 50),
        label: score >= 50 ? window.DIMENSION_META[dim.id].highTag : window.DIMENSION_META[dim.id].lowTag
      };
    })
      .sort((a, b) => b.deviation - a.deviation)
      .slice(0, 4)
      .map((entry) => entry.label);
  }

  function buildNarrative(topResult, userVector) {
    const hero = topResult.hero;
    const diffs = window.DIMENSIONS.map((dim) => ({
      id: dim.id,
      name: dim.name,
      diff: Math.abs(userVector[dim.id] - hero.vector[dim.id]),
      sharedDirection: (userVector[dim.id] >= 50 && hero.vector[dim.id] >= 50) || (userVector[dim.id] < 50 && hero.vector[dim.id] < 50)
    }));

    const aligned = diffs
      .filter((item) => item.sharedDirection)
      .sort((a, b) => a.diff - b.diff)
      .slice(0, 3);

    const tension = [...diffs].sort((a, b) => b.diff - a.diff)[0];
    const sharedLabels = aligned.length ? aligned.map((item) => item.name).join("、") : "整体气质";

    let nuanceSentence = `从这套题的结果看，你和${hero.name}的细节分布已经很贴近，适合直接作为第一主类型。`;
    if (tension && tension.diff >= 14) {
      const meta = window.DIMENSION_META[tension.id];
      const userHigher = userVector[tension.id] > hero.vector[tension.id];
      nuanceSentence = userHigher
        ? `细看会发现，你比${hero.name}更${meta.highCompare}。所以你像的是 TA 的核心人格张力，但会显得更“你自己”一点。`
        : `细看会发现，你比${hero.name}更${meta.lowCompare}。也就是说，你接近 TA 的底色，但气质会更收一点。`;
    }

    return [
      {
        title: "角色核心",
        body: `${hero.blurb} 这版建模里，${hero.name}被归到“${hero.archetype}”这一组人格原型。`
      },
      {
        title: "为什么像",
        body: `你和${hero.name}最重合的地方在于${sharedLabels}。这意味着你们做判断时，底层张力是接近的，不只是表面风格像。`
      },
      {
        title: `${hero.typeCode || "OWTI"} 人格速写`,
        body: `${hero.personaCopy || ""} ${nuanceSentence}`.trim()
      }
    ];
  }

  function renderResults() {
    const topResult = state.ranking[0];
    const hero = topResult.hero;

    renderHeroPortrait(hero);
    refs.heroBadge.textContent = hero.badge;
    refs.heroBadge.style.background = `linear-gradient(145deg, ${hero.accent}, #13212d)`;
    refs.resultTypeCode.textContent = hero.typeCode || "OWTI";
    refs.resultRarityPill.textContent = buildRarityText(hero);
    refs.resultName.textContent = `${hero.typeLabel || hero.name} · ${hero.name}`;
    refs.resultTypeTagline.textContent = hero.typeTagline || hero.archetype;
    refs.resultSummary.textContent = `${hero.sourceNote} 你的当前结果与 ${hero.name} 的人格向量匹配度为 ${topResult.similarity}% ，当前模型里这一类型的稀有度为 ${hero.rarityScore || 80}/100，因此这里展示的是“角色人格类型”，而不只是单纯的英雄相似度。`;

    refs.tagRow.innerHTML = "";
    getSignatureTags(state.userVector).forEach((tag) => {
      const pill = document.createElement("div");
      pill.className = "tag-pill";
      pill.textContent = tag;
      refs.tagRow.appendChild(pill);
    });
    const rarityTag = document.createElement("div");
    rarityTag.className = "tag-pill";
    rarityTag.textContent = buildRarityText(hero);
    refs.tagRow.appendChild(rarityTag);

    refs.storyBlocks.innerHTML = "";
    buildNarrative(topResult, state.userVector).forEach((item) => {
      const card = document.createElement("div");
      card.className = "story-card";
      card.innerHTML = `<strong>${item.title}</strong>${item.body}`;
      refs.storyBlocks.appendChild(card);
    });

    refs.topMatchList.innerHTML = "";
    state.ranking.slice(0, 3).forEach((entry, index) => {
      const item = document.createElement("div");
      item.className = "top-match-item";
      item.innerHTML = `
        <div class="mini-dot" style="background:${entry.hero.accent};"></div>
        <div>
          <strong>Top ${index + 1} · ${entry.hero.typeCode || "OWTI"} · ${entry.hero.typeLabel || entry.hero.name}</strong>
          <span>${entry.hero.name} · ${entry.hero.archetype}</span>
        </div>
        <div class="score-badge">${entry.similarity}%</div>
      `;
      refs.topMatchList.appendChild(item);
    });

    refs.metricList.innerHTML = "";
    window.DIMENSIONS.forEach((dim) => {
      const heroScore = hero.vector[dim.id];
      const userScore = state.userVector[dim.id];
      const row = document.createElement("div");
      row.className = "metric-row";
      row.innerHTML = `
        <strong>${dim.name}</strong>
        <div class="metric-track">
          <div class="metric-hero" style="width:${heroScore}%;"></div>
          <div class="metric-user" style="width:${userScore}%;"></div>
        </div>
        <span>你 ${userScore} / 角 ${heroScore}</span>
      `;
      refs.metricList.appendChild(row);
    });

    refs.vectorTags.innerHTML = "";
    getVectorSummary(state.userVector).forEach((item) => {
      const pill = document.createElement("div");
      pill.className = "tag-pill";
      pill.textContent = item;
      refs.vectorTags.appendChild(pill);
    });

    refs.vectorNote.textContent = buildVectorNote(state.userVector);
    refs.finePrint.innerHTML = `官方依据：<a href="${hero.sourceUrl}" target="_blank" rel="noreferrer">${hero.name} 英雄页</a>。当前分值是依据官网文本做的人工量化建模，后续如果你要扩到漫画、短篇和语音台词，可以继续校准每个角色的向量。`;

    drawRadarChart(state.userVector, hero.vector, hero.accent);
  }

  function getVectorSummary(userVector) {
    return window.DIMENSIONS.map((dim) => ({
      score: userVector[dim.id],
      distance: Math.abs(userVector[dim.id] - 50),
      label: userVector[dim.id] >= 50 ? `${dim.name}偏高` : `${dim.name}偏低`
    }))
      .sort((a, b) => b.distance - a.distance)
      .slice(0, 4)
      .map((item) => item.label);
  }

  function buildVectorNote(userVector) {
    const sorted = window.DIMENSIONS.map((dim) => ({
      name: dim.name,
      score: userVector[dim.id]
    })).sort((a, b) => b.score - a.score);

    const topTwo = sorted.slice(0, 2).map((item) => item.name).join("、");
    const bottomTwo = sorted.slice(-2).map((item) => item.name).join("、");
    return `你的高分维度主要落在 ${topTwo}，说明这些是你更稳定的人格驱动力；相对低一些的是 ${bottomTwo}，这通常会决定你在人际边界和表达风格上的收放方式。`;
  }

  function buildRarityText(hero) {
    const label = hero.rarityLabel || "少见";
    const score = hero.rarityScore || 80;
    return `稀有度 ${score} · ${label}`;
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = src;
    });
  }

  function exportShareCard() {
    const topResult = state.ranking[0];
    if (!topResult) {
      return;
    }

    const hero = topResult.hero;
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 1600;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#fff8ef");
    gradient.addColorStop(0.55, "#f6efe4");
    gradient.addColorStop(1, "#f1e7d7");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(16, 32, 48, 0.03)";
    for (let y = 0; y < canvas.height; y += 32) {
      ctx.fillRect(0, y, canvas.width, 1);
    }
    for (let x = 0; x < canvas.width; x += 32) {
      ctx.fillRect(x, 0, 1, canvas.height);
    }

    ctx.fillStyle = "rgba(255,255,255,0.82)";
    roundRect(ctx, 78, 62, 1044, 1476, 48, true);

    const halo = ctx.createRadialGradient(600, 420, 60, 600, 420, 320);
    halo.addColorStop(0, `${hexToRgba(hero.accent, 0.22)}`);
    halo.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(600, 430, 320, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#c84a16";
    ctx.font = "800 54px 'Trebuchet MS', 'Microsoft YaHei UI', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("OWTI", 600, 132);
    ctx.fillStyle = "#6f7f87";
    ctx.font = "600 24px 'Aptos', 'Microsoft YaHei UI', sans-serif";
    ctx.fillText("守望先锋人格匹配测试", 600, 172);

    const portrait = refs.resultPortrait;
    if (portrait && portrait.complete && portrait.naturalWidth > 0) {
      drawTrimmedPortraitFit(ctx, portrait, 255, 170, 690, 560);
    } else {
      ctx.fillStyle = hero.accent;
      roundRect(ctx, 430, 270, 340, 420, 42, true);
      ctx.fillStyle = "#ffffff";
      ctx.font = "800 140px 'Trebuchet MS', 'Microsoft YaHei UI', sans-serif";
      ctx.fillText(hero.badge, 600, 505);
    }

    ctx.fillStyle = "#1b8aa4";
    roundRect(ctx, 425, 760, 350, 82, 41, true);
    ctx.fillStyle = "#0f5060";
    ctx.font = "800 48px 'Trebuchet MS', 'Microsoft YaHei UI', sans-serif";
    ctx.fillText(hero.typeCode || "OWTI", 600, 816);

    ctx.fillStyle = "#102030";
    ctx.font = "800 84px 'Trebuchet MS', 'Microsoft YaHei UI', sans-serif";
    ctx.fillText(hero.typeLabel || hero.name, 600, 948);

    ctx.fillStyle = "#4e6270";
    ctx.font = "600 36px 'Aptos', 'Microsoft YaHei UI', sans-serif";
    wrapText(ctx, `${hero.name} · ${hero.archetype}`, 600, 1004, 820, 46);

    ctx.fillStyle = "rgba(240, 180, 79, 0.18)";
    roundRect(ctx, 405, 1066, 390, 62, 31, true);
    ctx.fillStyle = "#9a6a14";
    ctx.font = "800 30px 'Aptos', 'Microsoft YaHei UI', sans-serif";
    ctx.fillText(buildRarityText(hero), 600, 1109);

    ctx.fillStyle = "#506572";
    ctx.font = "600 30px 'Aptos', 'Microsoft YaHei UI', sans-serif";
    wrapText(ctx, hero.typeTagline || hero.archetype, 600, 1194, 860, 44);

    const summary = `与你的匹配度 ${topResult.similarity}% · ${getSignatureTags(state.userVector).slice(0, 3).join(" / ")}`;
    ctx.fillStyle = "#6a7c86";
    ctx.font = "600 24px 'Aptos', 'Microsoft YaHei UI', sans-serif";
    wrapText(ctx, summary, 600, 1288, 860, 36);

    ctx.fillStyle = "rgba(16, 32, 48, 0.08)";
    roundRect(ctx, 170, 1388, 860, 92, 26, true);
    ctx.fillStyle = "#102030";
    ctx.font = "700 28px 'Aptos', 'Microsoft YaHei UI', sans-serif";
    ctx.fillText("OWTI · Overwatch Type Indicator", 600, 1442);
    ctx.fillStyle = "#7b8d96";
    ctx.font = "500 22px 'Aptos', 'Microsoft YaHei UI', sans-serif";
    ctx.fillText("守望先锋人格匹配测试分享卡", 600, 1478);

    canvas.toBlob((blob) => {
      if (!blob) {
        try {
          const fallbackLink = document.createElement("a");
          fallbackLink.download = `owti-${hero.id}-share.png`;
          fallbackLink.href = canvas.toDataURL("image/png");
          document.body.appendChild(fallbackLink);
          fallbackLink.click();
          fallbackLink.remove();
        } catch {
          window.open(canvas.toDataURL("image/png"), "_blank", "noopener,noreferrer");
        }
        return;
      }

      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `owti-${hero.id}-share.png`;
      link.href = objectUrl;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1500);
    }, "image/png");
  }

  function roundRect(ctx, x, y, width, height, radius, fill = false, stroke = false) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
  }

  function drawContain(ctx, image, x, y, width, height) {
    const scale = Math.min(width / image.width, height / image.height);
    const drawWidth = image.width * scale;
    const drawHeight = image.height * scale;
    const drawX = x + (width - drawWidth) / 2;
    const drawY = y + (height - drawHeight) / 2;
    ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
  }

  function getOpaqueBounds(image) {
    const sampleCanvas = document.createElement("canvas");
    sampleCanvas.width = image.naturalWidth;
    sampleCanvas.height = image.naturalHeight;
    const sampleCtx = sampleCanvas.getContext("2d", { willReadFrequently: true });
    sampleCtx.drawImage(image, 0, 0);

    const { data, width, height } = sampleCtx.getImageData(0, 0, sampleCanvas.width, sampleCanvas.height);
    let minX = width;
    let minY = height;
    let maxX = -1;
    let maxY = -1;

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const alpha = data[(y * width + x) * 4 + 3];
        if (alpha > 8) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (maxX < minX || maxY < minY) {
      return { x: 0, y: 0, width, height };
    }

    const padding = 6;
    return {
      x: Math.max(0, minX - padding),
      y: Math.max(0, minY - padding),
      width: Math.min(width - Math.max(0, minX - padding), maxX - minX + 1 + padding * 2),
      height: Math.min(height - Math.max(0, minY - padding), maxY - minY + 1 + padding * 2)
    };
  }

  function drawTrimmedPortraitFit(ctx, image, x, y, maxWidth, maxHeight) {
    const bounds = getOpaqueBounds(image);
    const scale = Math.min(maxWidth / bounds.width, maxHeight / bounds.height);
    const drawWidth = bounds.width * scale;
    const drawHeight = bounds.height * scale;
    const drawX = x + (maxWidth - drawWidth) / 2;
    const drawY = y + maxHeight - drawHeight;

    ctx.drawImage(
      image,
      bounds.x,
      bounds.y,
      bounds.width,
      bounds.height,
      drawX,
      drawY,
      drawWidth,
      drawHeight
    );
  }

  function wrapText(ctx, text, centerX, startY, maxWidth, lineHeight) {
    const chars = [...text];
    let line = "";
    let y = startY;
    chars.forEach((char) => {
      const testLine = line + char;
      if (ctx.measureText(testLine).width > maxWidth && line) {
        ctx.fillText(line, centerX, y);
        line = char;
        y += lineHeight;
      } else {
        line = testLine;
      }
    });
    if (line) {
      ctx.fillText(line, centerX, y);
    }
  }

  function getHeroImageSrc(hero) {
    return `./assets/heroes/${hero.id}.png`;
  }

  function renderHeroPortrait(hero) {
    refs.heroVisual.classList.remove("has-image");
    refs.resultPortrait.removeAttribute("src");
    refs.resultPortrait.alt = `${hero.name} Q版形象`;
    refs.resultPortrait.onload = () => {
      refs.heroVisual.classList.add("has-image");
    };
    refs.resultPortrait.onerror = () => {
      refs.heroVisual.classList.remove("has-image");
    };
    refs.resultPortrait.src = getHeroImageSrc(hero);
  }

  function drawRadarChart(userVector, heroVector, accent) {
    const canvas = refs.radarCanvas;
    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 118;
    const rings = 4;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let ring = 1; ring <= rings; ring += 1) {
      const currentRadius = (radius / rings) * ring;
      ctx.beginPath();
      window.DIMENSIONS.forEach((dim, index) => {
        const angle = (-Math.PI / 2) + (Math.PI * 2 * index) / window.DIMENSIONS.length;
        const x = centerX + Math.cos(angle) * currentRadius;
        const y = centerY + Math.sin(angle) * currentRadius;
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.closePath();
      ctx.strokeStyle = "rgba(16, 32, 48, 0.1)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    window.DIMENSIONS.forEach((dim, index) => {
      const angle = (-Math.PI / 2) + (Math.PI * 2 * index) / window.DIMENSIONS.length;
      const outerX = centerX + Math.cos(angle) * radius;
      const outerY = centerY + Math.sin(angle) * radius;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(outerX, outerY);
      ctx.strokeStyle = "rgba(16, 32, 48, 0.12)";
      ctx.stroke();

      const labelX = centerX + Math.cos(angle) * (radius + 28);
      const labelY = centerY + Math.sin(angle) * (radius + 22);
      ctx.fillStyle = "#58707f";
      ctx.font = "600 12px Aptos, Microsoft YaHei UI, sans-serif";
      ctx.textAlign = labelX >= centerX + 6 ? "left" : labelX <= centerX - 6 ? "right" : "center";
      ctx.textBaseline = labelY >= centerY + 6 ? "top" : labelY <= centerY - 6 ? "bottom" : "middle";
      ctx.fillText(dim.name, labelX, labelY);
    });

    drawRadarShape(ctx, heroVector, centerX, centerY, radius, "rgba(16, 32, 48, 0.35)", "rgba(16, 32, 48, 0.1)");
    drawRadarShape(ctx, userVector, centerX, centerY, radius, accent, hexToRgba(accent, 0.26));
  }

  function drawRadarShape(ctx, vector, centerX, centerY, radius, stroke, fill) {
    ctx.beginPath();
    window.DIMENSIONS.forEach((dim, index) => {
      const angle = (-Math.PI / 2) + (Math.PI * 2 * index) / window.DIMENSIONS.length;
      const distance = (vector[dim.id] / 100) * radius;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 2.5;
    ctx.fill();
    ctx.stroke();
  }

  function hexToRgba(hex, alpha) {
    const normalized = hex.replace("#", "");
    const bigint = parseInt(normalized, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function renderDimensionList() {
    refs.dimensionList.innerHTML = "";
    window.DIMENSIONS.forEach((dim) => {
      const item = document.createElement("div");
      item.className = "dimension-card";
      item.innerHTML = `
        <strong>${dim.name}</strong>
        <span>${dim.axisLow} → ${dim.axisHigh}</span>
        <span>${dim.cardText}</span>
      `;
      refs.dimensionList.appendChild(item);
    });
  }

  function renderRoster() {
    refs.heroRoster.innerHTML = "";
    window.HEROES.forEach((hero) => {
      const item = document.createElement("div");
      item.className = "hero-mini";
      item.innerHTML = `
        <img class="hero-mini-thumb" src="${getHeroImageSrc(hero)}" alt="${hero.name} Q版形象" onerror="this.style.display='none'; this.parentElement.style.gridTemplateColumns='1fr';">
        <div class="hero-mini-body">
          <strong style="color:${hero.accent};">${hero.name} · ${hero.archetype}</strong>
          <span>${hero.sourceNote}</span>
          <span><a href="${hero.sourceUrl}" target="_blank" rel="noreferrer">查看官网英雄页</a></span>
        </div>
      `;
      refs.heroRoster.appendChild(item);
    });
  }
})();
