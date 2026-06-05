const perfCoarsePointer = window.matchMedia("(max-width: 640px), (pointer: coarse)");
let perfCellCache = [];
let perfLastTrailAt = 0;

function perfRebuildCellCache() {
  perfCellCache = [];
  document.querySelectorAll("#board .cell").forEach((cell) => {
    const row = Number(cell.dataset.row);
    const col = Number(cell.dataset.col);
    if (!perfCellCache[row]) {
      perfCellCache[row] = [];
    }
    perfCellCache[row][col] = cell;
  });
}

if (typeof renderBoard === "function") {
  const originalRenderBoard = renderBoard;
  renderBoard = function renderBoardWithCache() {
    originalRenderBoard();
    perfRebuildCellCache();
  };
  perfRebuildCellCache();
}

if (typeof getCell === "function") {
  const originalGetCell = getCell;
  getCell = function getCachedCell(row, col) {
    return perfCellCache[row]?.[col] || originalGetCell(row, col);
  };
}

if (typeof spawnDragTrail === "function") {
  const originalSpawnDragTrail = spawnDragTrail;
  spawnDragTrail = function spawnThrottledDragTrail(clientX, clientY, force = false) {
    if (perfCoarsePointer.matches) {
      return;
    }

    const now = performance.now();
    if (!force && now - perfLastTrailAt < 80) {
      return;
    }
    perfLastTrailAt = now;
    originalSpawnDragTrail(clientX, clientY, force);
  };
}

if (typeof spawnPowParticles === "function") {
  const originalSpawnPowParticles = spawnPowParticles;
  spawnPowParticles = function spawnLightPowParticles(targets) {
    if (perfCoarsePointer.matches) {
      if (typeof playPowSound === "function") {
        playPowSound(targets.length);
      }
      return;
    }

    originalSpawnPowParticles(targets);
  };
}

if (typeof triggerBoardFlash === "function") {
  const originalTriggerBoardFlash = triggerBoardFlash;
  triggerBoardFlash = function triggerLightBoardFlash(linesCleared) {
    if (perfCoarsePointer.matches) {
      return;
    }

    originalTriggerBoardFlash(linesCleared);
  };
}
