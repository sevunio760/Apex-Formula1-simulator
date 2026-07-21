// Persists the user's season configuration on the client so their driver/car
// pick and chosen season length survive navigation between rounds.
const KEY = 'f1_season_config';

export function getSeasonConfig() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function setSeasonConfig(cfg) {
  try {
    localStorage.setItem(KEY, JSON.stringify(cfg));
  } catch (e) {
    // ignore storage errors
  }
}

export function clearSeasonConfig() {
  try {
    localStorage.removeItem(KEY);
  } catch (e) {
    // ignore storage errors
  }
}