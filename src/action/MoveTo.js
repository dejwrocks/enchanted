import Action from "./Action";

class MoveTo extends Action {
  constructor(start, end, duration) {
    super();

    this._start = start; //point
    this._end = end; //point
    this._duration = duration || 1000; //millisecond
  }

  execute() {
    let remaining = Math.max(0, this._startTime + this._duration - Date.now());
    let temp = remaining / this._duration || 0;
    let percent = 1 - temp;

    let newX = (this._end.x - this._start.x) * percent + this._start.x;
    let newY = (this._end.y - this._start.y) * percent + this._start.y;

    if (percent === 1) {  //action finished
      this.executor.setPosition(newX, newY);
      this.halt();
    } else {
      this.executor.setPosition(newX, newY);
    }
  }

  //remove action after finished
  halt() {
    let index = this.executor._actions.indexOf(this);
    this.executor._actions.splice(index, 1);
  }
}

export default MoveTo;
