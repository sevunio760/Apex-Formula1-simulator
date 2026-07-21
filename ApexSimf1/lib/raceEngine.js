import { getTrack } from '@/lib/tracks';

// Closed Catmull-Rom spline sampling in 2D.
function buildTrackPath(points, samplesPerSeg = 20) {
  const out = [];
  const n = points.length;
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];
    for (let t = 0; t < samplesPerSeg; t++) {
      const s = t / samplesPerSeg;
      const s2 = s * s;
      const s3 = s2 * s;
      const x = 0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * s + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * s2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * s3);
      const y = 0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * s + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * s2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * s3);
      out.push([x, y]);
    }
  }
  return out;
}

// Shared simulation state used by both the 2D and 3D renderers.
// Renderers only draw; the engine owns progress, laps, positions, highlights,
// and the race-end callback so the view can be swapped without re-running logic.
export function createRaceEngine({ cars, totalLaps, round, onUpdate, onHighlight, onRaceEnd }) {
  const path = buildTrackPath(getTrack(round), 20);
  const pathLen = path.length;

  const carStates = cars.map((c, i) => ({
    id: c.id, name: c.name, color: c.color, number: c.number, isPlayer: c.isPlayer, team: c.team,
    progress: (i * 0.028) % 1, laps: 0, speed: c.speed, pace: c.speed,
    lane: ((i % 5) - 2) * 0.01, pos: i + 1,
    lastLapStart: performance.now(), bestLap: Infinity,
  }));

  let finished = false;
  let last = performance.now();
  let reportTimer = 0;
  let paceTimer = 0;
  let lastPosMap = {};
  const cb = { onUpdate, onHighlight, onRaceEnd };

  function setCallbacks(c) { Object.assign(cb, c); }

  function posAt(p, out) {
    const t = ((p % 1) + 1) % 1;
    const f = t * pathLen;
    const i = Math.floor(f) % pathLen;
    const j = (i + 1) % pathLen;
    const frac = f - Math.floor(f);
    out[0] = path[i][0] + (path[j][0] - path[i][0]) * frac;
    out[1] = path[i][1] + (path[j][1] - path[i][1]) * frac;
    return { i, j, frac };
  }

  function finishRace() {
    if (finished) return;
    finished = true;
    const sorted = [...carStates].sort((a, b) => (b.laps + b.progress) - (a.laps + a.progress));
    const results = sorted.map((cm, i) => ({
      id: cm.id, name: cm.name, color: cm.color, team: cm.team, isPlayer: cm.isPlayer,
      position: i + 1, laps: cm.laps, progress: cm.progress, bestLap: cm.bestLap,
    }));
    cb.onRaceEnd && cb.onRaceEnd(results);
  }

  function update(now, running) {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;

    if (running && !finished) {
      paceTimer += dt;
      if (paceTimer > 2.2) {
        paceTimer = 0;
        carStates.forEach((cm) => { cm.pace = cm.speed * (0.8 + Math.random() * 0.4); });
      }
      carStates.forEach((cm) => {
        cm.progress += cm.pace * dt;
        if (cm.progress >= 1) {
          cm.progress -= 1;
          cm.laps += 1;
          const lapTime = now - cm.lastLapStart;
          if (lapTime < cm.bestLap) cm.bestLap = lapTime;
          cm.lastLapStart = now;
          if (cm.laps >= totalLaps) finishRace();
        }
      });
    }

    const sorted = [...carStates].sort((a, b) => (b.laps + b.progress) - (a.laps + a.progress));
    sorted.forEach((cm, idx) => { cm.pos = idx + 1; });

    reportTimer += dt;
    if (reportTimer > 0.6) {
      reportTimer = 0;
      const positions = sorted.map((cm) => ({ id: cm.id, name: cm.name, color: cm.color, isPlayer: cm.isPlayer, position: cm.pos, laps: cm.laps, progress: cm.progress }));
      cb.onUpdate && cb.onUpdate({ leaderLap: sorted[0].laps, positions });
      for (const cm of sorted) {
        if (lastPosMap[cm.id] && cm.pos < lastPosMap[cm.id]) {
          const ahead = sorted[cm.pos - 1];
          cb.onHighlight && cb.onHighlight({ lap: sorted[0].laps + 1, text: `${cm.name} overtakes ${ahead.name} for P${cm.pos}` });
          break;
        }
      }
      lastPosMap = Object.fromEntries(sorted.map((cm) => [cm.id, cm.pos]));
    }

    return { sorted, leaderLap: sorted[0].laps };
  }

  return { path, pathLen, carStates, posAt, update, finishRace, setCallbacks, get finished() { return finished; } };
}