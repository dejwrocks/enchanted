class Action {
  constructor() {

    this._executor = null;
    this._startTime = Date.now();
  }

  set executor(executor) {
    this._executor = executor;
  }

  get executor() {
    return this._executor;
  }

  set startTime(startTime) {
    this._startTime = startTime;
  }

  get startTime() {
    return this._startTime;
  }
}

export default Action;
