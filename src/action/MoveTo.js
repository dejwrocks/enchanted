import Director from "./Director";
import Action from "./Action";

class MoveTo extends Action {
  constructor(start, end, duration) {
    super();

    this._start = start; //point
    this._end = end; //point
    this._duration = duration; //millisecond
  }

  execute() {
    const { previousRenderTime } = Director.getInstance();
    const startTime = Date.now();

    let remaining = Math.max(0, startTime + this._duration - Date.now());
    let temp = remaining / duration || 0;
    let percent = 1 - temp;

    let newX = (this._end.x - this._start.x) * percent + this._start.x;
    let newY = (this._end.y - this._start.y) * percent + this._start.y;

    this.executor.setPosition(newX, newY);
  }
}

export default MoveTo;
