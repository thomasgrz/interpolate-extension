export const logger = (msg: string, data?: unknown) =>
  console.info("[Interpolate Chrome Extension] ", msg, { data });
