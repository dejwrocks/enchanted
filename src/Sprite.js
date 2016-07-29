import Action from "./action/Action";

export default class Sprite {
  constructor() {
    this._ctx = null;
    this._x = 0;
    this._y = 0;
    this._show = true;
    this._actions = [];
  }

  draw() { //override

  }

  render() {
    if (!this.show) {
      return;
    }
    this._actions.forEach(action => {
      action.execute();
    });
    this.ctx.save();
    this.ctx.translate(this.posX, this.posY);
    this.draw();
    this.ctx.restore();
  }

  runAction(action) {
    if (!(action instanceof Action)) {
      throw new Error('argument "action" should be an instance of Action');
    }

    this._actions.push(action);
    action.startTime = Date.now();
    action.executor = this;
  }

  setPosition(x, y) {
    this.posX = x;
    this.posY = y;
  }

  get ctx() {
    return this._ctx;
  }

  set ctx(ctx) {
    this._ctx = ctx;
  }

  get posX() {
    return this._x;
  }

  set posX(x) {
    this._x = x;
  }

  get posY() {
    return this._y;
  }

  set posY(y) {
    this._y = y;
  }

  get show() {
    return this._show;
  }

  set show(flag) {
    this._show = flag;
  }

  get position() {
    return {
      x: this.posX,
      y: this.posY
    };
  }

  set position(point) {
    this.posX = point.x;
    this.posY = point.y;
  }

}
