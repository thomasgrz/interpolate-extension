import.meta.env = {"BASE_URL": "/", "DEV": true, "MODE": "development", "PROD": false, "SSR": false};export const logger = (...args) => {
  if (import.meta.env.MODE === "test") return;
  console.info("[Interpolate Chrome Extension] ", ...args);
};
