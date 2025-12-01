export const logger = (...args: unknown[]) => {
  if (import.meta.env.MODE === "test") return;
  console.info("[Interpolate Chrome Extension] ", ...args);
};
