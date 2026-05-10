import { MockResponseFormValue } from "#src/components/MockResponseForm/MockResponseForm.tsx";

export type ScriptInterpolationConfig = {
  details: chrome.userScripts.RegisteredUserScript;
  name: string;
};
export type RedirectInterpolationConfig = {
  details: {
    regexFilter: string;
    destination: string;
    id: string;
  };
  name: string;
};
export type MockAPIInterpolationConfig = {
  details: NonNullable<MockResponseFormValue> & { id: string };
  name: string;
};
export type HeaderInterpolationConfig = {
  details: {
    headerKey: string;
    headerValue: string;
    id: string;
  };
  name: string;
};
export type TabManagerInterpolationConfig = {
  details: {
    matcher: string;
    groupId: number;
    groupName: string;
    id: string;
  };
  name: string;
};
export type InterpolationType =
  | "tab-manager"
  | "script"
  | "redirect"
  | "headers"
  | "mockAPI";

class Interpolation {
  isActive: boolean;
  createdAt: number;
  enabledByUser?: boolean;
  error?: Error | string | null;
  name: string;

  constructor(config: { createdAt?: number; name: string }) {
    this.createdAt = config.createdAt ?? Date.now();
    this.enabledByUser = true;
    this.error = null;
    this.name = config.name;
    this.isActive = false;
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

export class MockAPIInterpolation extends Interpolation {
  details: MockAPIInterpolationConfig["details"];
  type: "mockAPI";

  constructor(config: MockAPIInterpolationConfig) {
    super(config);
    this.type = "mockAPI";
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

export class TabManagerInterpolation extends Interpolation {
  details: TabManagerInterpolationConfig["details"];
  type: "tab-manager";

  constructor(config: TabManagerInterpolation) {
    super(config);
    this.type = "tab-manager";
    this.details = config.details;
    this.createdAt = config.createdAt ?? new Date().getTime();
  }
}

export default Interpolation;

export type AnyInterpolation =
  | HeaderInterpolation
  | MockAPIInterpolation
  | RedirectInterpolation
  | ScriptInterpolation
  | TabManagerInterpolation;
