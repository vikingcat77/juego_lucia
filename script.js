const GRID_SIZE = 8;
const BEST_SCORE_KEY = "juego_lucia_best_score";
const LEADERBOARD_KEY = "juego_lucia_leaderboard";
const PLAYER_NAME_KEY = "juego_lucia_player_name";
const LAST_SCORE_KEY = "juego_lucia_last_score";
const SOUND_ENABLED_KEY = "juego_lucia_sound_enabled";
const DAILY_MISSION_KEY = "juego_lucia_daily_mission";
const MAX_LEADERBOARD_ENTRIES = 10;
const MAX_PLAYER_NAME_LENGTH = 10;
const DRAG_POINTER_GAP_Y = 90;
const GUIDE_PREVIEW_EXTRA_LIFT_Y = 10;
const THEME_SCORE_STEP = 1000;
const VISUAL_THEMES = [
  {
    bgTop: "#fef3c7",
    bgBottom: "#fed7aa",
    panel: "rgba(255, 251, 235, 0.92)",
    panelStrong: "#fff7ed",
    line: "rgba(146, 64, 14, 0.14)",
    text: "#3f2a1d",
    muted: "#8c6239",
    accent: "#ea580c",
    accent2: "#f59e0b",
    filledBorder: "rgba(194, 65, 12, 0.6)",
    previewRing: "rgba(234, 88, 12, 0.36)",
    filledStart: "#f97316",
    filledEnd: "#fb923c",
    pieceStart: "#f97316",
    pieceEnd: "#facc15"
  },
  {
    bgTop: "#e0f2fe",
    bgBottom: "#bae6fd",
    panel: "rgba(239, 246, 255, 0.92)",
    panelStrong: "#f0f9ff",
    line: "rgba(12, 74, 110, 0.14)",
    text: "#0c2a3d",
    muted: "#2f637f",
    accent: "#0284c7",
    accent2: "#06b6d4",
    filledBorder: "rgba(3, 105, 161, 0.58)",
    previewRing: "rgba(2, 132, 199, 0.34)",
    filledStart: "#0891b2",
    filledEnd: "#22d3ee",
    pieceStart: "#0ea5e9",
    pieceEnd: "#67e8f9"
  },
  {
    bgTop: "#ede9fe",
    bgBottom: "#ddd6fe",
    panel: "rgba(245, 243, 255, 0.92)",
    panelStrong: "#f5f3ff",
    line: "rgba(76, 29, 149, 0.14)",
    text: "#2f1e56",
    muted: "#664aa5",
    accent: "#7c3aed",
    accent2: "#a855f7",
    filledBorder: "rgba(91, 33, 182, 0.58)",
    previewRing: "rgba(124, 58, 237, 0.34)",
    filledStart: "#7c3aed",
    filledEnd: "#a855f7",
    pieceStart: "#8b5cf6",
    pieceEnd: "#c4b5fd"
  },
  {
    bgTop: "#fee2e2",
    bgBottom: "#fecaca",
    panel: "rgba(255, 241, 242, 0.92)",
    panelStrong: "#fff1f2",
    line: "rgba(127, 29, 29, 0.15)",
    text: "#4a1f1f",
    muted: "#8f4444",
    accent: "#dc2626",
    accent2: "#f43f5e",
    filledBorder: "rgba(185, 28, 28, 0.58)",
    previewRing: "rgba(220, 38, 38, 0.34)",
    filledStart: "#e11d48",
    filledEnd: "#fb7185",
    pieceStart: "#f43f5e",
    pieceEnd: "#fda4af"
  },
  {
    bgTop: "#dcfce7",
    bgBottom: "#bbf7d0",
    panel: "rgba(240, 253, 244, 0.92)",
    panelStrong: "#f0fdf4",
    line: "rgba(20, 83, 45, 0.14)",
    text: "#1e3a2a",
    muted: "#3f6d52",
    accent: "#16a34a",
    accent2: "#22c55e",
    filledBorder: "rgba(21, 128, 61, 0.58)",
    previewRing: "rgba(22, 163, 74, 0.34)",
    filledStart: "#059669",
    filledEnd: "#34d399",
    pieceStart: "#10b981",
    pieceEnd: "#86efac"
  },
  {
    bgTop: "#ffedd5",
    bgBottom: "#fde68a",
    panel: "rgba(255, 247, 237, 0.92)",
    panelStrong: "#fffbeb",
    line: "rgba(124, 45, 18, 0.14)",
    text: "#422006",
    muted: "#8f4b2b",
    accent: "#ea580c",
    accent2: "#f59e0b",
    filledBorder: "rgba(194, 65, 12, 0.58)",
    previewRing: "rgba(234, 88, 12, 0.34)",
    filledStart: "#ea580c",
    filledEnd: "#fb923c",
    pieceStart: "#f97316",
    pieceEnd: "#fcd34d"
  }
];
const COMBO_CAT_IMAGES = [
  "assets/cats/manga-cat-1.svg",
  "assets/cats/manga-cat-2.svg",
  "assets/cats/manga-cat-3.svg"
];
const COMBO_MEOW_LINES = [
  "MIAU!",
  "NYA~",
  "MRRRIAU!",
  "MIAU MIAU!"
];
const DAILY_MISSION_CATALOG = [
  { id: "lines", title: "Limpia lineas", target: 12, unit: "lineas", description: "Limpia 12 lineas hoy." },
  { id: "combos", title: "Haz combos", target: 5, unit: "combos", description: "Consigue 5 combos hoy." },
  { id: "pieces", title: "Constructor", target: 35, unit: "piezas", description: "Coloca 35 piezas hoy." },
  { id: "points", title: "Sube puntos", target: 2800, unit: "puntos", description: "Acumula 2800 puntos hoy." }
];

const BASE_SHAPES = [
  [[1]],
  [[1, 1]],
  [[1, 1]],
  [[1, 0], [0, 1]],
  [[1, 1, 1]],
  [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
  [[1, 1, 1]],
  [[0, 1], [1, 1]],
  [[1, 1], [1, 1]],
  [[1, 0], [1, 1]],
  [[1, 1, 1], [0, 1, 0]],
  [[1, 1, 1, 1, 1]],
  [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
  [[1, 1, 1], [1, 1, 1]],
  [[1, 0, 0], [1, 0, 0], [1, 1, 1]],
  [[1, 1, 0], [0, 1, 1]]
];
const SHAPE_WEIGHTS = BASE_SHAPES.map((shape) => (
  JSON.stringify(shape) === JSON.stringify([[1, 1, 0], [0, 1, 1]])
    ? 0.35
    : JSON.stringify(shape) === JSON.stringify([[1]])
      ? 0.72
      : 1
));

const boardEl = document.getElementById("board");
const trayEl = document.getElementById("tray");
const scoreEls = Array.from(document.querySelectorAll('[data-bind="score"]'));
const bestScoreEls = Array.from(document.querySelectorAll('[data-bind="bestScore"]'));
const streakEls = Array.from(document.querySelectorAll('[data-bind="streak"]'));
const lastScoreEls = Array.from(document.querySelectorAll('[data-bind="lastScore"]'));
const missionTitleEls = Array.from(document.querySelectorAll('[data-bind="missionTitle"]'));
const missionProgressTextEls = Array.from(document.querySelectorAll('[data-bind="missionProgressText"]'));
const missionProgressBarEls = Array.from(document.querySelectorAll('[data-bind="missionProgressBar"]'));
const statusEl = document.getElementById("status");
const startButton = document.getElementById("startButton");
const quickRestartButton = document.getElementById("quickRestartButton");
const soundToggleButton = document.getElementById("soundToggleButton");
const startScreenEl = document.getElementById("startScreen");
const leaderboardListEl = document.getElementById("leaderboardList");
const boardPanelEl = document.querySelector(".board-panel");
const themeProgressBarEl = document.getElementById("themeProgressBar");
const themeProgressTextEl = document.getElementById("themeProgressText");

const LINE_CLEAR_ANIMATION_MS = 480;
const COMBO_BUBBLE_MS = 1400;
const PARTICLE_BURST_MS = 820;
const DRAG_TRAIL_INTERVAL_MS = 34;

let board = [];
let pieces = [];
let score = 0;
let bestScore = toSafeScore(safeStorageGet(BEST_SCORE_KEY, "0"));
let lastScore = toSafeScore(safeStorageGet(LAST_SCORE_KEY, "0"));
let previewCells = [];
let previewLineCells = [];
let dragState = null;
let activeThemeIndex = 0;
let nextThemeSwapScore = THEME_SCORE_STEP;
let isResolvingMove = false;
let hasHandledGameOver = false;
let audioCtx = null;
let lastTrailAt = 0;
let hasShownNewRecordBubble = false;
let comboStreak = 0;
let scoreMultiplier = 1;
let soundEnabled = safeStorageGet(SOUND_ENABLED_KEY, "1") !== "0";
let dailyMission = null;

syncBestScoreFromLeaderboard();
syncScoreDisplays();
renderLeaderboard();
initDailyMission();
syncSoundToggleButton();

startButton.addEventListener("click", startGame);
quickRestartButton.addEventListener("click", startGame);
soundToggleButton?.addEventListener("click", toggleSound);

function safeStorageGet(key, fallback = "") {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : value;
  } catch {
    return fallback;
  }
}

function safeStorageSet(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function toSafeScore(value) {
  return Math.max(0, Number(value) || 0);
}

function createPieceId() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `piece-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function cloneShape(shape) {
  return shape.map((row) => [...row]);
}

function countShapeCells(shape) {
  return shape.reduce((sum, row) => (
    sum + row.reduce((rowSum, value) => rowSum + (value ? 1 : 0), 0)
  ), 0);
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  safeStorageSet(SOUND_ENABLED_KEY, soundEnabled ? "1" : "0");
  syncSoundToggleButton();
  setStatus(soundEnabled ? "Sonido activado." : "Sonido desactivado.");
}

function syncSoundToggleButton() {
  if (!soundToggleButton) {
    return;
  }

  soundToggleButton.textContent = soundEnabled ? "Sonido ON" : "Sonido OFF";
  soundToggleButton.setAttribute("aria-pressed", soundEnabled ? "true" : "false");
  soundToggleButton.classList.toggle("is-off", !soundEnabled);
}

function getTodayMissionDateKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getMissionByDate(dateKey) {
  const seed = dateKey.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = seed % DAILY_MISSION_CATALOG.length;
  return DAILY_MISSION_CATALOG[index];
}

function initDailyMission() {
  const dateKey = getTodayMissionDateKey();
  const missionDef = getMissionByDate(dateKey);
  const stored = loadStoredDailyMission();
  const progress = (
    stored &&
    stored.dateKey === dateKey &&
    stored.id === missionDef.id
  ) ? Math.max(0, Number(stored.progress) || 0) : 0;

  dailyMission = {
    dateKey,
    id: missionDef.id,
    title: missionDef.title,
    description: missionDef.description,
    unit: missionDef.unit,
    target: missionDef.target,
    progress,
    completed: progress >= missionDef.target
  };

  saveDailyMission();
  syncMissionDisplays();
}

function loadStoredDailyMission() {
  try {
    const raw = safeStorageGet(DAILY_MISSION_KEY, "");
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function saveDailyMission() {
  if (!dailyMission) {
    return;
  }

  safeStorageSet(DAILY_MISSION_KEY, JSON.stringify({
    dateKey: dailyMission.dateKey,
    id: dailyMission.id,
    progress: dailyMission.progress
  }));
}

function syncMissionDisplays() {
  if (!dailyMission) {
    return;
  }

  const progress = clamp(dailyMission.progress / dailyMission.target, 0, 1);
  const title = dailyMission.title;
  const progressText = dailyMission.completed
    ? "Completada!"
    : `${Math.min(dailyMission.progress, dailyMission.target)} / ${dailyMission.target} ${dailyMission.unit}`;

  missionTitleEls.forEach((el) => {
    el.textContent = title;
    el.setAttribute("title", dailyMission.description);
  });
  missionProgressTextEls.forEach((el) => {
    el.textContent = progressText;
  });
  missionProgressBarEls.forEach((el) => {
    el.style.width = `${Math.round(progress * 100)}%`;
  });
}

function updateDailyMissionProgress({ linesCleared = 0, combos = 0, piecesPlaced = 0, points = 0 }) {
  if (!dailyMission || dailyMission.completed) {
    return false;
  }

  let delta = 0;
  if (dailyMission.id === "lines") {
    delta = linesCleared;
  } else if (dailyMission.id === "combos") {
    delta = combos;
  } else if (dailyMission.id === "pieces") {
    delta = piecesPlaced;
  } else if (dailyMission.id === "points") {
    delta = points;
  }

  if (delta <= 0) {
    return false;
  }

  let completedNow = false;
  dailyMission.progress = Math.min(dailyMission.target, dailyMission.progress + delta);
  if (dailyMission.progress >= dailyMission.target && !dailyMission.completed) {
    dailyMission.completed = true;
    completedNow = true;
    showMissionCompleteBubble();
    playMissionCompleteSound();
  }

  saveDailyMission();
  syncMissionDisplays();
  return completedNow;
}

function startGame() {
  hideStartScreen();
  initDailyMission();
  syncSoundToggleButton();
  board = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));
  pieces = [];
  score = 0;
  comboStreak = 0;
  scoreMultiplier = 1;
  previewCells = [];
  previewLineCells = [];
  dragState = null;
  activeThemeIndex = 0;
  nextThemeSwapScore = THEME_SCORE_STEP;
  isResolvingMove = false;
  hasHandledGameOver = false;
  hasShownNewRecordBubble = false;
  applyVisualTheme();
  document.body.classList.remove("game-over");
  document.querySelectorAll(".combo-bubble, .combo-cat, .record-bubble, .score-modal").forEach((item) => item.remove());
  document.querySelectorAll(".pow-particle, .pow-text, .pow-ring, .pow-smoke, .pow-confetti, .drag-trail").forEach((item) => item.remove());
  toggleGameOverBanner(false);
  resetBoardFx();
  boardEl.innerHTML = "";
  renderBoard();
  refillTray();
  syncScoreDisplays();
  setStatus("Coge una pieza y coloca un combo para activar multiplicador.");
}

function renderBoard() {
  boardEl.innerHTML = "";

  for (let row = 0; row < GRID_SIZE; row += 1) {
    for (let col = 0; col < GRID_SIZE; col += 1) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.row = String(row);
      cell.dataset.col = String(col);

      if (board[row][col]) {
        cell.classList.add("filled");
      }

      boardEl.appendChild(cell);
    }
  }
}

function createPieceElement(piece) {
  const pieceEl = document.createElement("article");
  const rows = piece.shape.length;
  const cols = piece.shape[0].length;
  const blockCount = countShapeCells(piece.shape);

  pieceEl.className = "piece";
  pieceEl.dataset.id = piece.id;
  pieceEl.dataset.blocks = String(blockCount);

  const grid = document.createElement("div");
  grid.className = "piece-grid";
  grid.style.gridTemplateColumns = `repeat(${cols}, 24px)`;
  grid.style.gridTemplateRows = `repeat(${rows}, 24px)`;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const part = document.createElement("div");
      part.className = `piece-cell ${piece.shape[row][col] ? "on" : "off"}`;
      grid.appendChild(part);
    }
  }

  const badge = document.createElement("span");
  badge.className = "piece-badge";
  badge.textContent = `${blockCount}x`;
  pieceEl.appendChild(grid);
  pieceEl.appendChild(badge);
  pieceEl.addEventListener("pointerdown", (event) => beginDrag(event, piece.id));
  return pieceEl;
}

function renderTray() {
  trayEl.innerHTML = "";
  pieces.forEach((piece) => {
    trayEl.appendChild(createPieceElement(piece));
  });
}

function refillTray() {
  if (pieces.length > 0) {
    renderTray();
    evaluateGameState();
    return;
  }

  pieces = createFairTray();
  renderTray();
  evaluateGameState();
}

function createFairTray() {
  const maxAttempts = 90;
  let fallbackTray = Array.from({ length: 3 }, () => ({
    id: createPieceId(),
    shape: getRandomShape()
  }));

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const candidateTray = Array.from({ length: 3 }, () => ({
      id: createPieceId(),
      shape: getRandomShape()
    }));
    const hasSmallPiece = candidateTray.some((piece) => countShapeCells(piece.shape) <= 3);
    const hasPlayablePiece = candidateTray.some((piece) => canFitAnywhere(piece.shape));

    if (hasSmallPiece && hasPlayablePiece) {
      return candidateTray;
    }

    fallbackTray = candidateTray;
  }

  const emergencyPiece = createEmergencyPiece();
  if (emergencyPiece) {
    fallbackTray[0] = emergencyPiece;
  }
  return fallbackTray;
}

function createEmergencyPiece() {
  const easyShapes = [[[1]], [[1, 1]], [[1], [1]], [[1, 1], [1, 1]]];

  for (const shape of easyShapes) {
    const rotations = getUniqueRotations(shape);
    for (const rotated of rotations) {
      if (canFitAnywhere(rotated)) {
        return { id: createPieceId(), shape: cloneShape(rotated) };
      }
    }
  }

  return null;
}

function updateMultiplierFromMove(linesCleared) {
  if (linesCleared > 0) {
    comboStreak += 1;
    scoreMultiplier = Math.min(2.6, 1 + comboStreak * 0.22);
  } else {
    comboStreak = 0;
    scoreMultiplier = 1;
  }
}

function updateScore(points) {
  const previousBest = bestScore;
  score += points;
  if (score > bestScore) {
    bestScore = score;
    safeStorageSet(BEST_SCORE_KEY, String(bestScore));
    if (!hasShownNewRecordBubble && score > previousBest) {
      hasShownNewRecordBubble = true;
      showNewRecordBubble();
    }
  }

  let themeChanged = false;
  while (score >= nextThemeSwapScore) {
    randomizeVisualTheme();
    nextThemeSwapScore += THEME_SCORE_STEP;
    themeChanged = true;
  }

  syncScoreDisplays();
  return themeChanged;
}

function syncBestScoreFromLeaderboard() {
  const leaderboardBest = loadLeaderboard()[0]?.score || 0;
  if (leaderboardBest > bestScore) {
    bestScore = leaderboardBest;
    safeStorageSet(BEST_SCORE_KEY, String(bestScore));
  }
}

function syncScoreDisplays() {
  const scoreText = String(score);
  const bestText = String(bestScore);
  const streakText = `x${scoreMultiplier.toFixed(scoreMultiplier >= 2 ? 1 : 2).replace(/\.0$/, "")}`;
  const lastText = String(lastScore);
  scoreEls.forEach((el) => {
    el.textContent = scoreText;
    pulseLiveNumber(el, scoreText);
  });
  bestScoreEls.forEach((el) => {
    el.textContent = bestText;
    pulseLiveNumber(el, bestText);
  });
  streakEls.forEach((el) => {
    el.textContent = streakText;
    pulseLiveNumber(el, streakText);
  });
  lastScoreEls.forEach((el) => {
    el.textContent = lastText;
  });
  syncThemeProgressDisplay();
  document.title = `Gatitos y Cajitas - ${score} pts`;
}

function pulseLiveNumber(el, valueText) {
  const previousValue = el.dataset.lastValue;
  el.dataset.lastValue = valueText;
  if (previousValue === valueText) {
    return;
  }
  el.classList.remove("is-updated");
  el.offsetWidth;
  el.classList.add("is-updated");
}

function syncThemeProgressDisplay() {
  if (!themeProgressBarEl || !themeProgressTextEl) {
    return;
  }

  const previousSwapScore = Math.max(0, nextThemeSwapScore - THEME_SCORE_STEP);
  const stageDelta = THEME_SCORE_STEP;
  const progress = clamp((score - previousSwapScore) / stageDelta, 0, 1);
  const remaining = Math.max(0, nextThemeSwapScore - score);

  themeProgressBarEl.style.width = `${Math.round(progress * 100)}%`;
  themeProgressTextEl.textContent = remaining === 0
    ? "Cambio listo"
    : `${remaining} para cambio`;
}

function loadLeaderboard() {
  try {
    const saved = JSON.parse(safeStorageGet(LEADERBOARD_KEY, "[]"));
    if (!Array.isArray(saved)) {
      return [];
    }

    return saved
      .map((entry) => ({
        name: sanitizePlayerName(entry?.name || "GATO"),
        score: Math.max(0, Number(entry?.score) || 0)
      }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_LEADERBOARD_ENTRIES);
  } catch {
    return [];
  }
}

function saveLeaderboard(entries) {
  const cleanEntries = entries
    .map((entry) => ({
      name: sanitizePlayerName(entry.name),
      score: Math.max(0, Number(entry.score) || 0)
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_LEADERBOARD_ENTRIES);

  safeStorageSet(LEADERBOARD_KEY, JSON.stringify(cleanEntries));
  bestScore = Math.max(bestScore, cleanEntries[0]?.score || 0);
  safeStorageSet(BEST_SCORE_KEY, String(bestScore));
  syncScoreDisplays();
  renderLeaderboard();
}

function sanitizePlayerName(name) {
  return formatPlayerName(name) || "GATO";
}

function formatPlayerName(name) {
  return String(name || "")
    .toUpperCase()
    .replace(/[^A-Z0-9 ]/g, "")
    .trim()
    .slice(0, MAX_PLAYER_NAME_LENGTH);
}

function renderLeaderboard() {
  if (!leaderboardListEl) {
    return;
  }

  renderLeaderboardIntoList(leaderboardListEl, loadLeaderboard());
}

function renderLeaderboardIntoList(listEl, entries) {
  if (!listEl) {
    return;
  }

  listEl.innerHTML = "";
  if (entries.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "leaderboard-empty";
    emptyItem.textContent = "Aun no hay puntuaciones.";
    listEl.appendChild(emptyItem);
    return;
  }

  entries.forEach((entry) => {
    const item = document.createElement("li");
    const name = document.createElement("span");
    const points = document.createElement("strong");
    name.textContent = entry.name;
    points.textContent = String(entry.score);
    item.append(name, points);
    listEl.appendChild(item);
  });
}

function scoreQualifiesForLeaderboard(finalScore) {
  if (finalScore <= 0) {
    return false;
  }

  const entries = loadLeaderboard();
  return entries.length < MAX_LEADERBOARD_ENTRIES || finalScore > entries[entries.length - 1].score;
}

function showScoreModal(finalScore) {
  if (!boardPanelEl || boardPanelEl.querySelector(".score-modal")) {
    return;
  }

  const qualifies = scoreQualifiesForLeaderboard(finalScore);
  const modal = document.createElement("form");
  modal.className = "score-modal";
  modal.noValidate = true;
  modal.innerHTML = `
    <div class="score-modal-card">
      <p class="eyebrow">Records</p>
      <h2>${qualifies ? "Nueva marca" : "Top 10"}</h2>
      <p class="score-modal-points">${finalScore} puntos</p>
      <ol class="score-modal-list"></ol>
      <div class="score-save-fields">
        <label for="playerNameInput">Nombre</label>
        <input id="playerNameInput" name="playerName" type="text" maxlength="${MAX_PLAYER_NAME_LENGTH}" autocomplete="off" inputmode="text">
      </div>
      <div class="score-modal-actions">
        <button type="submit">${qualifies ? "Guardar" : "Cerrar"}</button>
        <button class="score-modal-restart" type="button">Reiniciar</button>
      </div>
    </div>
  `;

  const input = modal.querySelector("input");
  const fields = modal.querySelector(".score-save-fields");
  const list = modal.querySelector(".score-modal-list");
  const restart = modal.querySelector(".score-modal-restart");
  let savedScore = false;

  renderLeaderboardIntoList(list, loadLeaderboard());

  if (qualifies) {
    input.value = sanitizePlayerName(safeStorageGet(PLAYER_NAME_KEY, "GATO"));
  } else {
    fields.hidden = true;
  }

  input.addEventListener("input", () => {
    input.value = formatPlayerName(input.value);
  });

  modal.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!qualifies || savedScore) {
      modal.remove();
      return;
    }

    savedScore = true;
    const name = sanitizePlayerName(input.value);
    safeStorageSet(PLAYER_NAME_KEY, name);
    saveLeaderboard([...loadLeaderboard(), { name, score: finalScore }]);
    renderLeaderboardIntoList(list, loadLeaderboard());
    fields.hidden = true;
    modal.querySelector('button[type="submit"]').textContent = "Cerrar";
    setStatus("Puntuacion guardada en el top 10.");
  });

  restart.addEventListener("click", () => {
    modal.remove();
    startGame();
  });

  boardPanelEl.appendChild(modal);
  if (qualifies) {
    input.focus();
    input.select();
  }
}

function setStatus(message) {
  if (!statusEl) {
    return;
  }

  statusEl.textContent = message;
  statusEl.classList.remove("status-pop");
  statusEl.offsetWidth;
  statusEl.classList.add("status-pop");
}

function beginDrag(event, pieceId) {
  if (isResolvingMove) {
    return;
  }

  if (event.isPrimary === false || event.button > 0) {
    return;
  }

  const piece = pieces.find((item) => item.id === pieceId);
  if (!piece) {
    return;
  }

  const sourceEl = event.currentTarget;
  const proxy = buildProxy(piece.shape);
  const proxyWidth = piece.shape[0].length * 24 + (piece.shape[0].length - 1) * 4;
  const proxyHeight = piece.shape.length * 24 + (piece.shape.length - 1) * 4;
  dragState = {
    piece,
    sourceEl,
    proxy,
    proxyWidth,
    proxyHeight,
    offsetX: proxyWidth / 2,
    offsetY: proxyHeight + DRAG_POINTER_GAP_Y,
    lastClientX: event.clientX,
    lastClientY: event.clientY,
    guideLeadX: 0,
    guideLeadY: 0
  };
  sourceEl.classList.add("dragging");
  document.body.appendChild(proxy);
  moveProxy(event.clientX, event.clientY);
  updatePreview(event.clientX, event.clientY);
  spawnDragTrail(event.clientX, event.clientY, true);
  try {
    sourceEl.setPointerCapture(event.pointerId);
  } catch {
    // Some mobile browsers can refuse capture during fast gesture transitions.
  }
  sourceEl.addEventListener("pointermove", onPointerMove);
  sourceEl.addEventListener("pointerup", onPointerUp);
  sourceEl.addEventListener("pointercancel", onPointerUp);
}

function buildProxy(shape) {
  const proxy = document.createElement("div");
  proxy.className = "drag-proxy";
  proxy.style.gridTemplateColumns = `repeat(${shape[0].length}, 24px)`;
  proxy.style.gridTemplateRows = `repeat(${shape.length}, 24px)`;

  for (let row = 0; row < shape.length; row += 1) {
    for (let col = 0; col < shape[0].length; col += 1) {
      const cell = document.createElement("div");
      cell.className = `piece-cell ${shape[row][col] ? "on" : "off"}`;
      proxy.appendChild(cell);
    }
  }

  return proxy;
}

function onPointerMove(event) {
  if (!dragState) {
    return;
  }

  updateGuideLead(event.clientX, event.clientY);
  moveProxy(event.clientX, event.clientY);
  updatePreview(event.clientX, event.clientY);
  spawnDragTrail(event.clientX, event.clientY);
}

function onPointerUp(event) {
  if (!dragState) {
    return;
  }

  updateGuideLead(event.clientX, event.clientY);
  const dropPoint = getBoardPointFromPointer(event.clientX, event.clientY);
  const placement = getPlacementFromPoint(
    dropPoint.x,
    dropPoint.y,
    dragState.piece.shape
  );

  if (placement && canPlaceShape(dragState.piece.shape, placement.row, placement.col)) {
    applyPlacement(dragState.piece.id, placement.row, placement.col);
  } else {
    playInvalidDropSound();
    setStatus("Esa pieza no cabe ahi. Prueba otra posicion.");
  }

  endDrag(event.pointerId);
}

function endDrag(pointerId) {
  if (!dragState) {
    return;
  }

  dragState.sourceEl.classList.remove("dragging");
  try {
    if (dragState.sourceEl.hasPointerCapture(pointerId)) {
      dragState.sourceEl.releasePointerCapture(pointerId);
    }
  } catch {
    // Ignore release errors when pointer capture is already lost.
  }
  dragState.sourceEl.removeEventListener("pointermove", onPointerMove);
  dragState.sourceEl.removeEventListener("pointerup", onPointerUp);
  dragState.sourceEl.removeEventListener("pointercancel", onPointerUp);
  dragState.proxy.remove();
  dragState = null;
  clearPreview();
}

function moveProxy(clientX, clientY) {
  if (!dragState) {
    return;
  }

  const x = clientX - dragState.offsetX;
  const y = clientY - dragState.offsetY;
  dragState.proxy.style.transform = `translate(${x}px, ${y}px)`;
}

function updateGuideLead(clientX, clientY) {
  if (!dragState) {
    return;
  }

  const dx = clientX - dragState.lastClientX;
  const dy = clientY - dragState.lastClientY;
  dragState.lastClientX = clientX;
  dragState.lastClientY = clientY;

  const follow = 0.32;
  const damping = 0.78;
  const maxLead = 34;
  dragState.guideLeadX = clamp(
    dragState.guideLeadX * damping + dx * follow,
    -maxLead,
    maxLead
  );
  dragState.guideLeadY = clamp(
    dragState.guideLeadY * damping + dy * follow,
    -maxLead,
    maxLead
  );
}

function updatePreview(clientX, clientY) {
  clearPreview();

  if (!dragState) {
    return;
  }

  const boardPoint = getBoardPointFromPointer(clientX, clientY);
  const placement = getPlacementFromPoint(boardPoint.x, boardPoint.y, dragState.piece.shape);
  if (!placement) {
    return;
  }

  const valid = canPlaceShape(dragState.piece.shape, placement.row, placement.col);
  const className = valid ? "preview-valid" : "preview-invalid";

  for (let row = 0; row < dragState.piece.shape.length; row += 1) {
    for (let col = 0; col < dragState.piece.shape[0].length; col += 1) {
      if (!dragState.piece.shape[row][col]) {
        continue;
      }

      const boardRow = placement.row + row;
      const boardCol = placement.col + col;

      if (!isInsideBoard(boardRow, boardCol)) {
        continue;
      }

      const cell = getCell(boardRow, boardCol);
      if (cell) {
        cell.classList.add(className);
        previewCells.push(cell);
      }
    }
  }

  if (valid) {
    const predictedLines = getCompletedLinesForPlacement(
      dragState.piece.shape,
      placement.row,
      placement.col
    );
    showLineClearPreview(predictedLines);
  }
}

function getBoardPointFromPointer(clientX, clientY) {
  if (!dragState) {
    return { x: clientX, y: clientY };
  }

  return {
    x: clientX + dragState.guideLeadX,
    y:
      clientY +
      dragState.guideLeadY -
      (dragState.proxyHeight / 2 + DRAG_POINTER_GAP_Y + GUIDE_PREVIEW_EXTRA_LIFT_Y)
  };
}

function clearPreview() {
  previewCells.forEach((cell) => {
    cell.classList.remove("preview-valid", "preview-invalid");
  });
  previewCells = [];

  previewLineCells.forEach((cell) => {
    cell.classList.remove("preview-target");
  });
  previewLineCells = [];
}

function showLineClearPreview({ fullRows, fullCols }) {
  const lineMap = new Map();

  fullRows.forEach((row) => {
    for (let col = 0; col < GRID_SIZE; col += 1) {
      lineMap.set(`${row}-${col}`, { row, col });
    }
  });

  fullCols.forEach((col) => {
    for (let row = 0; row < GRID_SIZE; row += 1) {
      lineMap.set(`${row}-${col}`, { row, col });
    }
  });

  lineMap.forEach(({ row, col }) => {
    const cell = getCell(row, col);
    if (!cell) {
      return;
    }
    cell.classList.add("preview-target");
    previewLineCells.push(cell);
  });
}

function getPlacementFromPoint(clientX, clientY, shape) {
  const rect = boardEl.getBoundingClientRect();

  if (
    clientX < rect.left ||
    clientY < rect.top ||
    clientX > rect.right ||
    clientY > rect.bottom
  ) {
    return null;
  }

  const cellSize = rect.width / GRID_SIZE;
  const col = Math.floor((clientX - rect.left) / cellSize);
  const row = Math.floor((clientY - rect.top) / cellSize);
  const offsetRow = Math.floor(shape.length / 2);
  const offsetCol = Math.floor(shape[0].length / 2);

  return {
    row: row - offsetRow,
    col: col - offsetCol
  };
}

function canPlaceShape(shape, startRow, startCol) {
  for (let row = 0; row < shape.length; row += 1) {
    for (let col = 0; col < shape[0].length; col += 1) {
      if (!shape[row][col]) {
        continue;
      }

      const boardRow = startRow + row;
      const boardCol = startCol + col;

      if (!isInsideBoard(boardRow, boardCol) || board[boardRow][boardCol]) {
        return false;
      }
    }
  }

  return true;
}

async function applyPlacement(pieceId, row, col) {
  if (isResolvingMove) {
    return;
  }

  const piece = pieces.find((item) => item.id === pieceId);
  if (!piece) {
    return;
  }

  isResolvingMove = true;
  let filledCells = 0;
  const placedCoords = [];

  try {
    for (let y = 0; y < piece.shape.length; y += 1) {
      for (let x = 0; x < piece.shape[0].length; x += 1) {
        if (!piece.shape[y][x]) {
          continue;
        }

        board[row + y][col + x] = 1;
        filledCells += 1;
        placedCoords.push({ row: row + y, col: col + x });
      }
    }

    pieces = pieces.filter((item) => item.id !== pieceId);
    renderTray();
    renderBoard();
    animatePlacementSnap(placedCoords);

    const completedLines = getCompletedLines();
    const linesCleared = completedLines.fullRows.length + completedLines.fullCols.length;

    if (linesCleared > 0) {
      await playLineClearFallEffect(completedLines);
      clearCompletedLines(completedLines);
      renderBoard();
    }

    updateMultiplierFromMove(linesCleared);
    const placementPoints = filledCells * 5;
    const linePoints = linesCleared * 50;
    const basePoints = placementPoints + linePoints;
    const gainedPoints = Math.round(basePoints * scoreMultiplier);
    const themeChanged = updateScore(gainedPoints);
    playPlacementSound(filledCells, linesCleared);
    const missionCompletedNow = updateDailyMissionProgress({
      linesCleared,
      combos: linesCleared >= 2 ? 1 : 0,
      piecesPlaced: 1,
      points: gainedPoints
    });

    if (linesCleared >= 2) {
      showComboBubble(linesCleared + comboStreak - 1);
    }

    if (themeChanged && linesCleared >= 2) {
      playThemeUnlockSound();
      setStatus(`Combo gatuno x${scoreMultiplier.toFixed(1)}! Nuevo estilo desbloqueado.`);
    } else if (themeChanged) {
      playThemeUnlockSound();
      setStatus("Has llegado al siguiente hito visual. Nuevo estilo activado.");
    } else if (linesCleared > 0) {
      setStatus(`Limpiaste ${linesCleared} linea(s) y ganaste ${gainedPoints} puntos.`);
    } else {
      setStatus(`Pieza colocada (+${gainedPoints}). Busca huecos para mantener la racha.`);
    }

    if (pieces.length === 0) {
      refillTray();
      if (linesCleared === 0) {
        setStatus("Nueva tanda de piezas lista. Piensa 2 jugadas por delante.");
      }
    } else {
      evaluateGameState();
    }

    if (missionCompletedNow) {
      setStatus("Mision diaria completada. Recompensa premium desbloqueada!");
    }
  } finally {
    isResolvingMove = false;
  }
}

function getRandomShape() {
  const baseShape = pickWeightedShape();
  const rotations = getUniqueRotations(baseShape);
  const randomRotation = rotations[Math.floor(Math.random() * rotations.length)];
  return cloneShape(randomRotation);
}

function pickWeightedShape() {
  const totalWeight = SHAPE_WEIGHTS.reduce((sum, weight) => sum + weight, 0);
  let roll = Math.random() * totalWeight;

  for (let index = 0; index < BASE_SHAPES.length; index += 1) {
    roll -= SHAPE_WEIGHTS[index];
    if (roll <= 0) {
      return BASE_SHAPES[index];
    }
  }

  return BASE_SHAPES[BASE_SHAPES.length - 1];
}

function getUniqueRotations(shape) {
  const rotations = [];
  const seen = new Set();
  let current = shape;

  for (let index = 0; index < 4; index += 1) {
    const key = JSON.stringify(current);
    if (!seen.has(key)) {
      seen.add(key);
      rotations.push(current);
    }
    current = rotateShape(current);
  }

  return rotations;
}

function rotateShape(shape) {
  const rows = shape.length;
  const cols = shape[0].length;
  const rotated = Array.from({ length: cols }, () => Array(rows).fill(0));

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      rotated[col][rows - row - 1] = shape[row][col];
    }
  }

  return rotated;
}

function randomizeVisualTheme() {
  if (VISUAL_THEMES.length <= 1) {
    return;
  }

  let nextIndex = activeThemeIndex;
  while (nextIndex === activeThemeIndex) {
    nextIndex = Math.floor(Math.random() * VISUAL_THEMES.length);
  }
  activeThemeIndex = nextIndex;
  applyVisualTheme();
}

function applyVisualTheme() {
  const theme = VISUAL_THEMES[activeThemeIndex];
  const accentRgb = hexToRgb(theme.accent);
  document.documentElement.style.setProperty("--bg-top", theme.bgTop);
  document.documentElement.style.setProperty("--bg-bottom", theme.bgBottom);
  document.documentElement.style.setProperty("--panel", theme.panel);
  document.documentElement.style.setProperty("--panel-strong", theme.panelStrong);
  document.documentElement.style.setProperty("--line", theme.line);
  document.documentElement.style.setProperty("--text", theme.text);
  document.documentElement.style.setProperty("--muted", theme.muted);
  document.documentElement.style.setProperty("--accent", theme.accent);
  document.documentElement.style.setProperty("--accent-2", theme.accent2);
  document.documentElement.style.setProperty("--filled-border", theme.filledBorder);
  document.documentElement.style.setProperty("--preview-ring", theme.previewRing);
  document.documentElement.style.setProperty("--filled-start", theme.filledStart);
  document.documentElement.style.setProperty("--filled-end", theme.filledEnd);
  document.documentElement.style.setProperty("--piece-start", theme.pieceStart);
  document.documentElement.style.setProperty("--piece-end", theme.pieceEnd);
  if (accentRgb) {
    document.documentElement.style.setProperty("--accent-rgb", accentRgb);
  }
}

function hexToRgb(hex) {
  const normalized = String(hex || "").trim().replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(normalized)) {
    return null;
  }

  const r = Number.parseInt(normalized.slice(0, 2), 16);
  const g = Number.parseInt(normalized.slice(2, 4), 16);
  const b = Number.parseInt(normalized.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

function getCompletedLines() {
  const fullRows = [];
  const fullCols = [];

  for (let row = 0; row < GRID_SIZE; row += 1) {
    if (board[row].every(Boolean)) {
      fullRows.push(row);
    }
  }

  for (let col = 0; col < GRID_SIZE; col += 1) {
    let full = true;

    for (let row = 0; row < GRID_SIZE; row += 1) {
      if (!board[row][col]) {
        full = false;
        break;
      }
    }

    if (full) {
      fullCols.push(col);
    }
  }

  return { fullRows, fullCols };
}

function getCompletedLinesForPlacement(shape, startRow, startCol) {
  const fullRows = [];
  const fullCols = [];
  const pendingCells = new Set();

  for (let row = 0; row < shape.length; row += 1) {
    for (let col = 0; col < shape[0].length; col += 1) {
      if (!shape[row][col]) {
        continue;
      }
      pendingCells.add(`${startRow + row}-${startCol + col}`);
    }
  }

  for (let row = 0; row < GRID_SIZE; row += 1) {
    let full = true;
    for (let col = 0; col < GRID_SIZE; col += 1) {
      if (board[row][col] || pendingCells.has(`${row}-${col}`)) {
        continue;
      }
      full = false;
      break;
    }
    if (full) {
      fullRows.push(row);
    }
  }

  for (let col = 0; col < GRID_SIZE; col += 1) {
    let full = true;
    for (let row = 0; row < GRID_SIZE; row += 1) {
      if (board[row][col] || pendingCells.has(`${row}-${col}`)) {
        continue;
      }
      full = false;
      break;
    }
    if (full) {
      fullCols.push(col);
    }
  }

  return { fullRows, fullCols };
}

function clearCompletedLines({ fullRows, fullCols }) {
  fullRows.forEach((row) => {
    for (let col = 0; col < GRID_SIZE; col += 1) {
      board[row][col] = 0;
    }
  });

  fullCols.forEach((col) => {
    for (let row = 0; row < GRID_SIZE; row += 1) {
      board[row][col] = 0;
    }
  });

}

function playLineClearFallEffect({ fullRows, fullCols }) {
  const targetMap = new Map();
  const totalLines = fullRows.length + fullCols.length;

  fullRows.forEach((row) => {
    for (let col = 0; col < GRID_SIZE; col += 1) {
      targetMap.set(`${row}-${col}`, { row, col });
    }
  });

  fullCols.forEach((col) => {
    for (let row = 0; row < GRID_SIZE; row += 1) {
      targetMap.set(`${row}-${col}`, { row, col });
    }
  });

  triggerBoardImpact(totalLines);
  triggerBoardFlash(totalLines);

  const targets = Array.from(targetMap.values())
    .sort((a, b) => a.row - b.row || a.col - b.col)
    .map(({ row, col }, index) => {
      const cell = getCell(row, col);
      if (cell) {
        cell.style.setProperty("--fall-delay", `${Math.min(index * 16, 220)}ms`);
        cell.style.setProperty("--fall-x", `${Math.round((Math.random() - 0.5) * 26)}px`);
        cell.style.setProperty("--fall-rot", `${Math.round((Math.random() - 0.5) * 40)}deg`);
        cell.classList.add("line-clearing");
      }
      return cell;
    })
    .filter(Boolean);

  if (targets.length === 0) {
    return Promise.resolve();
  }

  spawnPowParticles(targets);

  return new Promise((resolve) => {
    window.setTimeout(() => {
      targets.forEach((cell) => {
        cell.classList.remove("line-clearing");
        cell.style.removeProperty("--fall-delay");
        cell.style.removeProperty("--fall-x");
        cell.style.removeProperty("--fall-rot");
      });
      boardEl.classList.remove("board-impact");
      resolve();
    }, LINE_CLEAR_ANIMATION_MS + 260);
  });
}

function spawnPowParticles(targets) {
  if (!boardPanelEl || targets.length === 0) {
    return;
  }

  playPowSound(targets.length);

  const panelRect = boardPanelEl.getBoundingClientRect();
  const center = targets.reduce(
    (acc, cell) => {
      const rect = cell.getBoundingClientRect();
      acc.x += rect.left - panelRect.left + rect.width / 2;
      acc.y += rect.top - panelRect.top + rect.height / 2;
      return acc;
    },
    { x: 0, y: 0 }
  );

  center.x /= targets.length;
  center.y /= targets.length;

  const text = document.createElement("div");
  text.className = "pow-text";
  text.textContent = "POW!";
  text.style.left = `${center.x}px`;
  text.style.top = `${center.y}px`;
  boardPanelEl.appendChild(text);

  const ring = document.createElement("span");
  ring.className = "pow-ring";
  ring.style.left = `${center.x}px`;
  ring.style.top = `${center.y}px`;
  boardPanelEl.appendChild(ring);

  for (let i = 0; i < 5; i += 1) {
    const smoke = document.createElement("span");
    smoke.className = "pow-smoke";
    smoke.style.left = `${center.x}px`;
    smoke.style.top = `${center.y}px`;
    smoke.style.setProperty("--dx", `${Math.round((Math.random() - 0.5) * 120)}px`);
    smoke.style.setProperty("--dy", `${Math.round(-18 - Math.random() * 54)}px`);
    smoke.style.setProperty("--delay", `${Math.round(Math.random() * 120)}ms`);
    smoke.style.setProperty("--size", `${16 + Math.round(Math.random() * 22)}px`);
    boardPanelEl.appendChild(smoke);
  }

  const particleCount = Math.min(32, Math.max(14, targets.length * 2));
  for (let i = 0; i < particleCount; i += 1) {
    const particle = document.createElement("span");
    particle.className = "pow-particle";
    particle.style.left = `${center.x}px`;
    particle.style.top = `${center.y}px`;
    particle.style.setProperty("--dx", `${Math.round((Math.random() - 0.5) * 220)}px`);
    particle.style.setProperty("--dy", `${Math.round((Math.random() - 0.5) * 170 - 35)}px`);
    particle.style.setProperty("--rot", `${Math.round((Math.random() - 0.5) * 720)}deg`);
    particle.style.setProperty("--delay", `${Math.round(Math.random() * 100)}ms`);
    particle.style.setProperty("--size", `${8 + Math.round(Math.random() * 9)}px`);
    boardPanelEl.appendChild(particle);
  }

  const confettiCount = Math.min(20, Math.max(8, targets.length));
  for (let i = 0; i < confettiCount; i += 1) {
    const confetti = document.createElement("span");
    confetti.className = "pow-confetti";
    confetti.style.left = `${center.x}px`;
    confetti.style.top = `${center.y}px`;
    confetti.style.setProperty("--dx", `${Math.round((Math.random() - 0.5) * 280)}px`);
    confetti.style.setProperty("--dy", `${Math.round((Math.random() - 0.5) * 200 - 70)}px`);
    confetti.style.setProperty("--rot", `${Math.round((Math.random() - 0.5) * 1080)}deg`);
    confetti.style.setProperty("--delay", `${Math.round(Math.random() * 120)}ms`);
    confetti.style.setProperty("--w", `${5 + Math.round(Math.random() * 6)}px`);
    confetti.style.setProperty("--h", `${8 + Math.round(Math.random() * 8)}px`);
    confetti.style.setProperty("--hue", String(10 + Math.round(Math.random() * 70)));
    boardPanelEl.appendChild(confetti);
  }

  window.setTimeout(() => {
    document.querySelectorAll(".pow-particle, .pow-text, .pow-ring, .pow-smoke, .pow-confetti").forEach((item) => item.remove());
  }, PARTICLE_BURST_MS);
}

function showComboBubble(comboSize) {
  if (!boardPanelEl) {
    return;
  }

  playComboSound(comboSize);

  document.querySelectorAll(".combo-bubble, .combo-cat").forEach((item) => item.remove());
  const bubble = document.createElement("div");
  bubble.className = "combo-bubble";
  const meow = COMBO_MEOW_LINES[Math.floor(Math.random() * COMBO_MEOW_LINES.length)];
  bubble.textContent = `${meow} x${comboSize}`;
  const cat = document.createElement("img");
  cat.className = "combo-cat";
  cat.alt = "Gatito manga celebrando combo";
  cat.src = COMBO_CAT_IMAGES[Math.floor(Math.random() * COMBO_CAT_IMAGES.length)];

  const boardRect = boardEl.getBoundingClientRect();
  const panelRect = boardPanelEl.getBoundingClientRect();
  const centerX = boardRect.left - panelRect.left + boardRect.width / 2;
  const centerY = boardRect.top - panelRect.top + boardRect.height / 2;
  bubble.style.left = `${centerX + 20}px`;
  bubble.style.top = `${centerY - 8}px`;
  cat.style.left = `${centerX - 78}px`;
  cat.style.top = `${centerY + 44}px`;

  boardPanelEl.appendChild(cat);
  boardPanelEl.appendChild(bubble);
  cat.classList.add("show");
  bubble.classList.add("show");

  window.setTimeout(() => {
    bubble.remove();
    cat.remove();
  }, COMBO_BUBBLE_MS);
}

function showNewRecordBubble() {
  if (!boardPanelEl) {
    return;
  }

  const bubble = document.createElement("div");
  bubble.className = "record-bubble";
  bubble.textContent = "Nuevo record conseguido!";
  boardPanelEl.appendChild(bubble);

  window.setTimeout(() => {
    bubble.remove();
  }, 1800);
}

function showMissionCompleteBubble() {
  if (!boardPanelEl) {
    return;
  }

  const bubble = document.createElement("div");
  bubble.className = "record-bubble mission-bubble";
  bubble.textContent = "Mision completada!";
  boardPanelEl.appendChild(bubble);

  window.setTimeout(() => {
    bubble.remove();
  }, 1900);
}

function getAudioContext() {
  if (!soundEnabled) {
    return null;
  }

  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) {
    return null;
  }

  if (!audioCtx) {
    audioCtx = new Ctx();
  }

  if (audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }

  return audioCtx;
}

function spawnDragTrail(clientX, clientY, force = false) {
  const now = performance.now();
  if (!force && now - lastTrailAt < DRAG_TRAIL_INTERVAL_MS) {
    return;
  }
  lastTrailAt = now;

  const dot = document.createElement("span");
  dot.className = "drag-trail";
  dot.style.left = `${clientX}px`;
  dot.style.top = `${clientY}px`;
  dot.style.setProperty("--tx", `${Math.round((Math.random() - 0.5) * 18)}px`);
  dot.style.setProperty("--ty", `${Math.round(-22 - Math.random() * 14)}px`);
  document.body.appendChild(dot);

  window.setTimeout(() => dot.remove(), 360);
}

function animatePlacementSnap(placedCoords) {
  placedCoords.forEach(({ row, col }, idx) => {
    const cell = getCell(row, col);
    if (!cell) {
      return;
    }
    cell.style.setProperty("--snap-delay", `${Math.min(idx * 18, 160)}ms`);
    cell.classList.add("placed-pop");
    window.setTimeout(() => {
      cell.classList.remove("placed-pop");
      cell.style.removeProperty("--snap-delay");
    }, 420);
  });
}

function triggerBoardImpact(linesCleared) {
  const strength = Math.min(1.8, 1 + linesCleared * 0.18);
  boardEl.style.setProperty("--impact-strength", String(strength));
  boardEl.classList.remove("board-impact", "board-zoom");
  boardEl.offsetWidth;
  boardEl.classList.add("board-impact", "board-zoom");
  window.setTimeout(() => {
    boardEl.classList.remove("board-impact", "board-zoom");
    boardEl.style.removeProperty("--impact-strength");
  }, 330);
}

function triggerBoardFlash(linesCleared) {
  if (!boardPanelEl) {
    return;
  }
  let flash = boardPanelEl.querySelector(".board-flash");
  if (!flash) {
    flash = document.createElement("div");
    flash.className = "board-flash";
    boardPanelEl.appendChild(flash);
  }
  flash.style.setProperty("--flash-alpha", String(Math.min(0.62, 0.24 + linesCleared * 0.08)));
  flash.classList.remove("show");
  flash.offsetWidth;
  flash.classList.add("show");
}

function resetBoardFx() {
  boardEl.classList.remove("board-impact", "board-zoom");
  boardEl.style.removeProperty("--impact-strength");
  const flash = boardPanelEl?.querySelector(".board-flash");
  if (flash) {
    flash.remove();
  }
}

function playPowSound(intensity) {
  const ctx = getAudioContext();
  if (!ctx) {
    return;
  }

  const now = ctx.currentTime;
  const duration = 0.16;
  const maxGain = Math.min(0.11 + intensity * 0.002, 0.2);

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(240, now);
  osc.frequency.exponentialRampToValueAtTime(82, now + duration);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1600, now);
  filter.frequency.exponentialRampToValueAtTime(480, now + duration);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(maxGain, now + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + duration);
}

function playComboSound(comboSize) {
  const ctx = getAudioContext();
  if (!ctx) {
    return;
  }

  const now = ctx.currentTime;
  const steps = Math.min(4, Math.max(2, comboSize));
  const baseFreq = 420;

  for (let i = 0; i < steps; i += 1) {
    const t = now + i * 0.07;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "square";
    osc.frequency.setValueAtTime(baseFreq + i * 120, t);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.exponentialRampToValueAtTime(0.055, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.075);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.08);
  }
}

function playPlacementSound(blocks, linesCleared) {
  const ctx = getAudioContext();
  if (!ctx) {
    return;
  }

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(310 + blocks * 8, now);
  osc.frequency.exponentialRampToValueAtTime(220 + linesCleared * 32, now + 0.08);
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(linesCleared > 0 ? 0.05 : 0.032, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.095);
}

function playInvalidDropSound() {
  const ctx = getAudioContext();
  if (!ctx) {
    return;
  }

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(190, now);
  osc.frequency.exponentialRampToValueAtTime(110, now + 0.14);
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(0.03, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.15);
}

function playThemeUnlockSound() {
  const ctx = getAudioContext();
  if (!ctx) {
    return;
  }

  const now = ctx.currentTime;
  [520, 660, 830].forEach((freq, index) => {
    const t = now + index * 0.06;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.exponentialRampToValueAtTime(0.045, t + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.11);
  });
}

function playMissionCompleteSound() {
  const ctx = getAudioContext();
  if (!ctx) {
    return;
  }

  const now = ctx.currentTime;
  [392, 523, 659, 784].forEach((freq, index) => {
    const t = now + index * 0.055;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.exponentialRampToValueAtTime(0.04, t + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.085);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.09);
  });
}

function playGameOverSound() {
  const ctx = getAudioContext();
  if (!ctx) {
    return;
  }

  const now = ctx.currentTime;
  [260, 190, 140].forEach((freq, index) => {
    const t = now + index * 0.09;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.exponentialRampToValueAtTime(0.048, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.11);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.12);
  });
}

function evaluateGameState() {
  const canContinue = pieces.some((piece) => canFitAnywhere(piece.shape));

  if (canContinue) {
    document.body.classList.remove("game-over");
    toggleGameOverBanner(false);
    return;
  }

  document.body.classList.add("game-over");
  toggleGameOverBanner(true);
  if (hasHandledGameOver) {
    return;
  }

  hasHandledGameOver = true;
  playGameOverSound();
  lastScore = score;
  safeStorageSet(LAST_SCORE_KEY, String(lastScore));
  syncScoreDisplays();
  setStatus(scoreQualifiesForLeaderboard(score) ? "Partida terminada. Entras en el top 10." : "Partida terminada. Gatito Over.");
  showScoreModal(score);
}

function canFitAnywhere(shape) {
  for (let row = 0; row < GRID_SIZE; row += 1) {
    for (let col = 0; col < GRID_SIZE; col += 1) {
      if (canPlaceShape(shape, row, col)) {
        return true;
      }
    }
  }

  return false;
}

function isInsideBoard(row, col) {
  return row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function getCell(row, col) {
  return boardEl.querySelector(`[data-row="${row}"][data-col="${col}"]`);
}

function toggleGameOverBanner(show) {
  if (!boardPanelEl) {
    return;
  }

  let banner = boardPanelEl.querySelector(".game-over-banner");
  if (!show) {
    if (banner) {
      banner.remove();
    }
    return;
  }

  if (!banner) {
    banner = document.createElement("div");
    banner.className = "game-over-banner";
    banner.textContent = "Gatito Over";
    boardPanelEl.appendChild(banner);
  }
}

function hideStartScreen() {
  document.body.classList.add("playing");
  if (startScreenEl) {
    startScreenEl.setAttribute("aria-hidden", "true");
  }
}

board = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));
renderBoard();
setStatus("Pulsa Nueva partida para empezar.");
