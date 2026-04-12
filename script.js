const GRID_SIZE = 10;
const BEST_SCORE_KEY = "juego_lucia_best_score";
const PIECE_THEMES = [
  { filledStart: "#f97316", filledEnd: "#fb923c", pieceStart: "#f97316", pieceEnd: "#facc15" },
  { filledStart: "#0f766e", filledEnd: "#14b8a6", pieceStart: "#14b8a6", pieceEnd: "#67e8f9" },
  { filledStart: "#7c3aed", filledEnd: "#a855f7", pieceStart: "#8b5cf6", pieceEnd: "#f0abfc" },
  { filledStart: "#be123c", filledEnd: "#f43f5e", pieceStart: "#e11d48", pieceEnd: "#fda4af" }
];

const BASE_SHAPES = [
  [[1]],
  [[1, 1]],
  [[1, 1, 1]],
  [[1, 1], [1, 1]],
  [[1, 0], [1, 1]],
  [[1, 1, 1], [0, 1, 0]],
  [[1, 1, 1, 1]],
  [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]],
  [[1, 1, 1], [1, 1, 1]],
  [[1, 1], [1, 0], [1, 0]],
  [[1, 1, 0], [0, 1, 1]]
];

const boardEl = document.getElementById("board");
const trayEl = document.getElementById("tray");
const scoreEl = document.getElementById("score");
const bestScoreEl = document.getElementById("bestScore");
const statusEl = document.getElementById("status");
const restartButton = document.getElementById("restartButton");

let board = [];
let pieces = [];
let score = 0;
let bestScore = Number(localStorage.getItem(BEST_SCORE_KEY) || 0);
let previewCells = [];
let previewTargetCell = null;
let dragState = null;
let activeThemeIndex = 0;

bestScoreEl.textContent = String(bestScore);

restartButton.addEventListener("click", startGame);

function startGame() {
  board = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));
  pieces = [];
  score = 0;
  previewCells = [];
  previewTargetCell = null;
  dragState = null;
  activeThemeIndex = 0;
  applyPieceTheme();
  document.body.classList.remove("game-over");
  boardEl.innerHTML = "";
  renderBoard();
  refillTray();
  updateScore(0);
  setStatus("Coge una pieza y colócala donde mejor encaje.");
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

  pieceEl.className = "piece";
  pieceEl.dataset.id = piece.id;

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

  pieceEl.appendChild(grid);
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
  while (pieces.length < 3) {
    pieces.push({
      id: crypto.randomUUID(),
      shape: getRandomShape()
    });
  }

  renderTray();
  evaluateGameState();
}

function updateScore(points) {
  score += points;
  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem(BEST_SCORE_KEY, String(bestScore));
  }

  scoreEl.textContent = String(score);
  bestScoreEl.textContent = String(bestScore);
}

function setStatus(message) {
  statusEl.textContent = message;
}

function beginDrag(event, pieceId) {
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
    offsetX: proxyWidth / 2,
    offsetY: proxyHeight + 18
  };
  sourceEl.classList.add("dragging");
  document.body.appendChild(proxy);
  moveProxy(event.clientX, event.clientY);
  updatePreview(event.clientX, event.clientY);
  sourceEl.setPointerCapture(event.pointerId);
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

  moveProxy(event.clientX, event.clientY);
  updatePreview(event.clientX, event.clientY);
}

function onPointerUp(event) {
  if (!dragState) {
    return;
  }

  const placement = getPlacementFromPoint(
    event.clientX,
    event.clientY,
    dragState.piece.shape
  );

  if (placement && canPlaceShape(dragState.piece.shape, placement.row, placement.col)) {
    applyPlacement(dragState.piece.id, placement.row, placement.col);
  } else {
    setStatus("Esa pieza no cabe ahi. Prueba otra posicion.");
  }

  endDrag(event.pointerId);
}

function endDrag(pointerId) {
  if (!dragState) {
    return;
  }

  dragState.sourceEl.classList.remove("dragging");
  dragState.sourceEl.releasePointerCapture(pointerId);
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

function updatePreview(clientX, clientY) {
  clearPreview();

  if (!dragState) {
    return;
  }

  const placement = getPlacementFromPoint(clientX, clientY, dragState.piece.shape);
  if (!placement) {
    return;
  }

  const valid = canPlaceShape(dragState.piece.shape, placement.row, placement.col);
  const className = valid ? "preview-valid" : "preview-invalid";
  previewTargetCell = getCell(placement.row, placement.col);

  if (previewTargetCell) {
    previewTargetCell.classList.add("preview-target", className);
  }

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
}

function clearPreview() {
  previewCells.forEach((cell) => {
    cell.classList.remove("preview-valid", "preview-invalid");
  });
  previewCells = [];

  if (previewTargetCell) {
    previewTargetCell.classList.remove("preview-target", "preview-valid", "preview-invalid");
    previewTargetCell = null;
  }
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

function applyPlacement(pieceId, row, col) {
  const piece = pieces.find((item) => item.id === pieceId);
  if (!piece) {
    return;
  }

  let filledCells = 0;

  for (let y = 0; y < piece.shape.length; y += 1) {
    for (let x = 0; x < piece.shape[0].length; x += 1) {
      if (!piece.shape[y][x]) {
        continue;
      }

      board[row + y][col + x] = 1;
      filledCells += 1;
    }
  }

  pieces = pieces.filter((item) => item.id !== pieceId);
  const linesCleared = clearCompletedLines();
  const themeChanged = updateThemeAfterClear(linesCleared);
  renderBoard();
  renderTray();

  const placementPoints = filledCells * 5;
  const bonusPoints = linesCleared * 50;
  updateScore(placementPoints + bonusPoints);

  if (themeChanged) {
    setStatus("Increible: 4 lineas a la vez. Las fichas han cambiado de color.");
  } else if (linesCleared > 0) {
    setStatus(`Buen movimiento. Has limpiado ${linesCleared} linea(s).`);
  } else {
    setStatus("Pieza colocada. Sigue buscando huecos utiles.");
  }

  if (pieces.length === 0) {
    refillTray();
    setStatus("Nueva tanda de piezas lista.");
  } else {
    evaluateGameState();
  }
}

function getRandomShape() {
  const baseShape = BASE_SHAPES[Math.floor(Math.random() * BASE_SHAPES.length)];
  const rotations = getUniqueRotations(baseShape);
  const randomRotation = rotations[Math.floor(Math.random() * rotations.length)];
  return structuredClone(randomRotation);
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

function updateThemeAfterClear(linesCleared) {
  if (linesCleared < 4) {
    return false;
  }

  activeThemeIndex = (activeThemeIndex + 1) % PIECE_THEMES.length;
  applyPieceTheme();
  return true;
}

function applyPieceTheme() {
  const theme = PIECE_THEMES[activeThemeIndex];
  document.documentElement.style.setProperty("--filled-start", theme.filledStart);
  document.documentElement.style.setProperty("--filled-end", theme.filledEnd);
  document.documentElement.style.setProperty("--piece-start", theme.pieceStart);
  document.documentElement.style.setProperty("--piece-end", theme.pieceEnd);
}

function clearCompletedLines() {
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

  return fullRows.length + fullCols.length;
}

function evaluateGameState() {
  const canContinue = pieces.some((piece) => canFitAnywhere(piece.shape));

  if (canContinue) {
    document.body.classList.remove("game-over");
    return;
  }

  document.body.classList.add("game-over");
  setStatus("No quedan movimientos posibles. Pulsa Nueva partida.");
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

function getCell(row, col) {
  return boardEl.querySelector(`[data-row="${row}"][data-col="${col}"]`);
}

startGame();
