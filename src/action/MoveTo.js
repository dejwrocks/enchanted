import Action from "./Action";

class MoveTo extends Action {
  constructor(start, end, duration) {
    super();
    this._duration = duration;

    this._start = start; //point
    this._end = end; //point
  }

  execute() {
    // const { previousRenderTime } = Director.getInstance();

    let remaining = Math.max(0, this._startTime + this._duration - Date.now());
    let temp = remaining / this._duration || 0;
    let percent = 1 - temp;

    let newX = (this._end.x - this._start.x) * percent + this._start.x;
    let newY = (this._end.y - this._start.y) * percent + this._start.y;

    this.executor.setPosition(newX, newY);
  }
}

export default MoveTo;
