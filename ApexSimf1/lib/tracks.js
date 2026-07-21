// Approximate 2D layouts of the 8 circuits on the calendar.
// Each track is an array of [x, y] waypoints in normalized space (-1..1).
// y is negative-up (matches the canvas convention used in Race2D).
// Waypoints are sampled by a closed Catmull-Rom spline to draw a smooth loop.

export const TRACKS = {
  // Round 1 — Bahrain International Circuit (Sakhir)
  // Long back straight, tight Turn 1 hairpin, twisty infield complex.
  1: [
    [0.0, -0.72], [0.6, -0.68], [0.84, -0.55], [0.78, -0.3], [0.82, -0.05],
    [0.68, 0.28], [0.42, 0.42], [0.12, 0.36], [-0.12, 0.24], [-0.34, 0.16],
    [-0.46, -0.02], [-0.3, -0.18], [-0.52, -0.34], [-0.78, -0.4],
    [-0.86, -0.6], [-0.58, -0.74], [-0.28, -0.78],
  ],
  // Round 2 — Jeddah Corniche Circuit
  // Fast flowing street circuit — long, narrow, wavy.
  2: [
    [-0.88, -0.5], [-0.62, -0.56], [-0.42, -0.44], [-0.22, -0.55],
    [-0.02, -0.45], [0.2, -0.52], [0.4, -0.42], [0.6, -0.5], [0.8, -0.42],
    [0.9, -0.18], [0.84, 0.04], [0.66, 0.16], [0.46, 0.1], [0.28, 0.22],
    [0.08, 0.16], [-0.12, 0.24], [-0.32, 0.16], [-0.52, 0.22], [-0.72, 0.14],
    [-0.86, 0.22], [-0.9, 0.0], [-0.88, -0.26],
  ],
  // Round 3 — Albert Park (Melbourne)
  // Flowing semi-street circuit, rounded-rectangle with medium-fast corners.
  3: [
    [-0.85, -0.6], [-0.1, -0.66], [0.78, -0.56], [0.9, -0.28],
    [0.74, 0.08], [0.5, 0.3], [0.22, 0.42], [-0.08, 0.38],
    [-0.32, 0.5], [-0.58, 0.44], [-0.8, 0.26], [-0.9, 0.02], [-0.88, -0.3],
  ],
  // Round 4 — Suzuka International Racing Course
  // Signature figure-8 crossover — the spline passes through the centre twice.
  4: [
    [0.02, 0.0], [0.74, -0.06], [0.8, -0.4], [0.44, -0.68], [0.0, -0.72],
    [-0.44, -0.66], [-0.8, -0.36], [-0.76, -0.06], [-0.02, 0.0],
    [-0.06, 0.06], [-0.74, 0.06], [-0.82, 0.36], [-0.44, 0.66], [0.0, 0.72],
    [0.44, 0.66], [0.8, 0.4], [0.76, 0.06], [0.02, 0.0],
  ],
  // Round 5 — Circuit de Monaco
  // Tight, twisty, compact — Loews hairpin, Swimming Pool, Rascasse.
  5: [
    [-0.84, -0.5], [-0.58, -0.56], [-0.34, -0.42], [-0.1, -0.2], [0.1, 0.0],
    [0.04, 0.2], [-0.06, 0.4], [-0.26, 0.55], [-0.46, 0.6], [-0.62, 0.5],
    [-0.54, 0.34], [-0.38, 0.24], [-0.2, 0.1], [0.0, -0.06], [0.24, -0.16],
    [0.4, -0.04], [0.5, -0.22], [0.62, -0.12], [0.72, -0.28], [0.76, -0.46],
    [0.5, -0.6], [0.2, -0.62], [-0.1, -0.58], [-0.4, -0.55], [-0.66, -0.52],
  ],
  // Round 6 — Circuit Gilles Villeneuve (Monreal)
  // Very long straights, the L'Epingle hairpin, final chicane (Wall of Champions).
  6: [
    [-0.85, -0.45], [0.6, -0.5], [0.86, -0.34], [0.74, -0.14], [0.54, -0.2],
    [0.44, -0.04], [0.3, 0.02], [0.0, 0.06], [-0.3, 0.12], [-0.56, 0.16],
    [-0.76, 0.32], [-0.7, 0.12], [-0.5, 0.0], [-0.3, -0.1], [-0.5, -0.26],
    [-0.72, -0.36],
  ],
  // Round 7 — Silverstone Circuit
  // Fast flowing sweepers, Maggotts/Becketts complex, Copse, Stowe, Club.
  7: [
    [-0.85, -0.3], [-0.5, -0.56], [-0.2, -0.66], [0.16, -0.6], [0.4, -0.46],
    [0.56, -0.26], [0.72, -0.36], [0.86, -0.14], [0.74, 0.06], [0.54, 0.0],
    [0.4, 0.16], [0.5, 0.32], [0.66, 0.46], [0.44, 0.56], [0.24, 0.46],
    [0.08, 0.62], [-0.12, 0.52], [-0.26, 0.62], [-0.46, 0.56], [-0.66, 0.4],
    [-0.82, 0.2], [-0.86, 0.0], [-0.7, -0.2],
  ],
  // Round 8 — Autodromo Nazionale Monza
  // Long straights, chicanes (Rettifilo, Roggia, Ascari), Parabolica.
  8: [
    [-0.9, -0.5], [0.12, -0.56], [0.32, -0.44], [0.2, -0.34], [0.42, -0.3],
    [0.72, -0.36], [0.86, -0.14], [0.7, 0.06], [0.54, 0.0], [0.62, 0.16],
    [0.4, 0.26], [0.2, 0.36], [0.0, 0.42], [-0.16, 0.3], [-0.26, 0.42],
    [-0.38, 0.56], [-0.52, 0.44], [-0.44, 0.3], [-0.66, 0.2], [-0.82, 0.0],
    [-0.86, -0.26],
  ],
};

export function getTrack(round) {
  return TRACKS[round] || TRACKS[1];
}