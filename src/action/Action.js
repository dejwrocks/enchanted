class Action {
  constructor() {

    this._executor = null;

  }

  set executor(executor) {
    this._executor = executor;
  }

  get executor() {
    return this._executor;
  }
}
