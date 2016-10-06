class Action {
  constructor() {

    this._executor = null;
    this._startTime = Date.now();
  }

  //remove action after finished
  halt() {
    let index = this.executor.actions.indexOf(this);
    this.executor.actions.splice(index, 1);
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
