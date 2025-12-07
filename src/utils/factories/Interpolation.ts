export type ScriptInterpolationConfig = {
  details: chrome.userScripts.RegisteredUserScript;
  name: string;
};
export type RedirectInterpolationConfig = {
  details: chrome.declarativeNetRequest.Rule;
  name: string;
};
export type HeaderInterpolationConfig = {
  details: chrome.declarativeNetRequest.Rule;
  name: string;
};
export type InterpolationType = "script" | "redirect" | "headers";

class Interpolation {
  createdAt: number;
  enabledByUser?: boolean;
  error?: Error | string | null;
  name: string;

  constructor(config: { name: string }) {
    this.createdAt = Date.now();
    this.enabledByUser = true;
    this.error = null;
    this.name = config.name;
  }
}

export class ScriptInterpolation extends Interpolation {
  details: ScriptInterpolationConfig["details"];
  type: "script";

  constructor(config: ScriptInterpolationConfig) {
    super(config);
    this.type = "script";
    this.details = config.details;
  }
}

export class RedirectInterpolation extends Interpolation {
  details: RedirectInterpolationConfig["details"];
  type: "redirect";

  constructor(config: RedirectInterpolationConfig) {
    super(config);
    this.type = "redirect";
    this.details = config.details;
  }
}

export class HeaderInterpolation extends Interpolation {
  details: HeaderInterpolationConfig["details"];
  type: "headers";

  constructor(config: HeaderInterpolationConfig) {
    super(config);
    this.type = "headers";
    this.details = config.details;
  }
}

export default Interpolation;

export type AnyInterpolation =
  | HeaderInterpolation
  | RedirectInterpolation
  | ScriptInterpolation;
