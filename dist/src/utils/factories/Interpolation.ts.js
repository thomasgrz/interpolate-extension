class Interpolation {
  createdAt;
  enabledByUser;
  error;
  name;
  constructor(config) {
    this.createdAt = Date.now();
    this.enabledByUser = true;
    this.error = null;
    this.name = config.name;
  }
}
export class ScriptInterpolation extends Interpolation {
  details;
  type;
  constructor(config) {
    super(config);
    this.type = "script";
    this.details = config.details;
  }
}
export class RedirectInterpolation extends Interpolation {
  details;
  type;
  constructor(config) {
    super(config);
    this.type = "redirect";
    this.details = config.details;
  }
}
export class HeaderInterpolation extends Interpolation {
  details;
  type;
  constructor(config) {
    super(config);
    this.type = "headers";
    this.details = config.details;
  }
}
export default Interpolation;
