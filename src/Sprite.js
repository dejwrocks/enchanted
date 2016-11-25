import Action from "./action/Action";

export default class Sprite {
  constructor() {

    //public
    this._ctx = null;
    this._x = 0;
    this._y = 0;
    this._scaleX = 1.0;
    this._scaleY = 1.0;
    this._show = true;
    this._actions = [];
  }

  draw() { //override

  }

  render() {
    if (!this.show) {
      return;
    }
    this.actions.forEach(action => {
      action.execute();
    });
    this.ctx.save();
    this.ctx.translate(this.posX, this.posY);
    this.ctx.scale(this.scaleX, this.scaleY);
    this.draw();
    this.ctx.restore();
  }

  runAction(action) {
    if (!(action instanceof Action)) {
      throw new Error('argument "action" should be an instance of Action');
    }

    this.actions.push(action);
    action.startTime = Date.now();
    action.executor = this;
  }

  setPosition(x, y) {
    this.posX = x;
    this.posY = y;
  }

  setScale(x, y) {
    this.scaleX = x;
    this.scaleY = y;
  }

  get ctx() {
    return this._ctx;
  }

  set ctx(ctx) {
    this._ctx = ctx;
  }

  get scaleX() {
    return this._scaleX;
  }

  set scaleX(x) {
    this._scaleX = x;
  }

  get scaleY() {
    return this._scaleY;
  }

  set scaleY(y) {
    this._scaleY = y;
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

  get actions() {
    return this._actions;
  }

  set position(point) {
    this.posX = point.x;
    this.posY = point.y;
  }

}
