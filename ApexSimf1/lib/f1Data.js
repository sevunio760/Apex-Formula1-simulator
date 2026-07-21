export const DRIVERS = [
  { id: 'verstappen', name: 'Max Verstappen', number: 1, team: 'Red Bull Ford', color: '#361dca', rating: 98 },
  { id: 'hadjar', name: 'Isack Hadjar', number: 6, team: 'Red Bull Ford', color: '#361dca', rating: 80 },
  { id: 'norris', name: 'Lando Norris', number: 4, team: 'McLaren', color: '#ff8000', rating: 94 },
  { id: 'piastri', name: 'Oscar Piastri', number: 81, team: 'McLaren', color: '#ff8000', rating: 90 },
  { id: 'leclerc', name: 'Charles Leclerc', number: 16, team: 'Ferrari', color: '#e8002d', rating: 92 },
  { id: 'hamilton', name: 'Lewis Hamilton', number: 44, team: 'Ferrari', color: '#e8002d', rating: 91 },
  { id: 'russell', name: 'George Russell', number: 63, team: 'Mercedes', color: '#27f4d2', rating: 88 },
  { id: 'antonelli', name: 'Kimi Antonelli', number: 12, team: 'Mercedes', color: '#27f4d2', rating: 86 },
  { id: 'alonso', name: 'Fernando Alonso', number: 14, team: 'Aston Martin', color: '#229971', rating: 89 },
  { id: 'stroll', name: 'Lance Stroll', number: 18, team: 'Aston Martin', color: '#229971', rating: 82 },
  { id: 'gasly', name: 'Pierre Gasly', number: 10, team: 'Alpine', color: '#0093cc', rating: 84 },
  { id: 'colapinto', name: 'Franco Colapinto', number: 43, team: 'Alpine', color: '#0093cc', rating: 81 },
  { id: 'albon', name: 'Alexander Albon', number: 23, team: 'Williams', color: '#64c4ff', rating: 84 },
  { id: 'sainz', name: 'Carlos Sainz', number: 55, team: 'Williams', color: '#64c4ff', rating: 89 },
  { id: 'lawson', name: 'Liam Lawson', number: 30, team: 'Racing Bulls', color: '#6692ff', rating: 83 },
  { id: 'lindblad', name: 'Arvid Lindblad', number: 3, team: 'Racing Bulls', color: '#6692ff', rating: 78 },
  { id: 'hulkenberg', name: 'Nico Hulkenberg', number: 27, team: 'Audi', color: '#9aa0a6', rating: 85 },
  { id: 'bortoleto', name: 'Gabriel Bortoleto', number: 5, team: 'Audi', color: '#9aa0a6', rating: 80 },
  { id: 'ocon', name: 'Esteban Ocon', number: 31, team: 'Haas', color: '#b6babd', rating: 84 },
  { id: 'bearman', name: 'Oliver Bearman', number: 87, team: 'Haas', color: '#b6babd', rating: 81 },
  { id: 'perez', name: 'Sergio Perez', number: 11, team: 'Cadillac', color: '#d4af37', rating: 86 },
  { id: 'bottas', name: 'Valtteri Bottas', number: 77, team: 'Cadillac', color: '#d4af37', rating: 84 },
];

export const CARS = [
  { id: 'mcl40', name: 'MCL40', team: 'McLaren', color: '#ff8000', speed: 0.152, reliability: 0.96 },
  { id: 'sf26', name: 'SF-26', team: 'Ferrari', color: '#e8002d', speed: 0.151, reliability: 0.95 },
  { id: 'rb22', name: 'RB22', team: 'Red Bull Ford', color: '#361dca', speed: 0.151, reliability: 0.95 },
  { id: 'w16', name: 'W16', team: 'Mercedes', color: '#27f4d2', speed: 0.150, reliability: 0.95 },
  { id: 'amr26', name: 'AMR26', team: 'Aston Martin', color: '#229971', speed: 0.147, reliability: 0.93 },
  { id: 'a526', name: 'A526', team: 'Alpine', color: '#0093cc', speed: 0.145, reliability: 0.92 },
  { id: 'fw48', name: 'FW48', team: 'Williams', color: '#64c4ff', speed: 0.146, reliability: 0.93 },
  { id: 'vcarb02', name: 'VCARB 02', team: 'Racing Bulls', color: '#6692ff', speed: 0.145, reliability: 0.93 },
  { id: 'r26', name: 'Audi R26', team: 'Audi', color: '#9aa0a6', speed: 0.144, reliability: 0.92 },
  { id: 'vf26', name: 'VF-26', team: 'Haas', color: '#b6babd', speed: 0.143, reliability: 0.91 },
  { id: 'cad01', name: 'Cadillac F1', team: 'Cadillac', color: '#d4af37', speed: 0.142, reliability: 0.90 },
];

export const CALENDAR = [
  { round: 1, name: 'Bahrain GP', circuit: 'Sakhir', country: 'Bahrain' },
  { round: 2, name: 'Saudi Arabian GP', circuit: 'Jeddah', country: 'Saudi Arabia' },
  { round: 3, name: 'Australian GP', circuit: 'Albert Park', country: 'Australia' },
  { round: 4, name: 'Japanese GP', circuit: 'Suzuka', country: 'Japan' },
  { round: 5, name: 'Monaco GP', circuit: 'Monte Carlo', country: 'Monaco' },
  { round: 6, name: 'Canadian GP', circuit: 'Gilles Villeneuve', country: 'Canada' },
  { round: 7, name: 'British GP', circuit: 'Silverstone', country: 'United Kingdom' },
  { round: 8, name: 'Italian GP', circuit: 'Monza', country: 'Italy' },
];

export const POINTS = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];
export const TOTAL_LAPS = 8;

// Deterministic seed from the driver + car choice so a seat swap stays stable
// across every race of the season (instead of re-randomising each round).
function seatSwapSeed(driverId, carId) {
  const s = `${driverId}|${carId}`;
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export function buildGrid(driverId, carId) {
  const playerCar = CARS.find((c) => c.id === carId) || CARS[0];
  const playerDriver = DRIVERS.find((d) => d.id === driverId);
  const chosenTeam = playerCar.team;        // team of the car you picked
  const originalTeam = playerDriver ? playerDriver.team : null; // your driver's real team

  // Effective team per driver. By default everyone keeps their own team.
  const effectiveTeam = {};
  DRIVERS.forEach((d) => { effectiveTeam[d.id] = d.team; });

  // If you put your driver in a different team's car, one driver from that
  // team is displaced to your driver's original team (a seat swap).
 