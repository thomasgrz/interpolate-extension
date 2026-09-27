import {
  AnyInterpolation,
  HeaderInterpolation,
  RedirectInterpolationConfig,
  ScriptInterpolation,
} from "#src/utils/factories/Interpolation.ts";

export const reducer = (
  acc: {
    redirects: RedirectInterpolationConfig[];
    headers: HeaderInterpolation[];
    userScripts: ScriptInterpolation[];
  },
  curr: AnyInterpolation,
) => {
  const { type } = curr;

  switch (type) {
    case "headers":
      acc.headers.push(curr);
      break;
    case "redirect":
      acc.redirects.push(curr);
      break;
    case "script":
      acc.userScripts.push(curr);
      break;
    default:
      break;
  }
  return acc;
};
