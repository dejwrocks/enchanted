import Director from "./Director";

export default class Scene {
  constructor() {
    this._ctx = null;
    this._children = [];
    this._loopId = null;
  }

  init() {

    return true;
  }

  addChild(child) {
    child.ctx = this.ctx;
    this.children.push(child);
  }

  render() {
    let { canvas } = this.ctx;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.children.forEach(child => {
      child.render();
    });
  }

  update() {

  }

  startLoop() {
    if (!this.init()) {
      throw new Error("scene init failed");
    }

    let loopFunc = () => {
      this.render();
      this.update();
      Director.getInstance().previousRenderTime = Date.now();

      this.loopId = window.requestAnimationFrame(loopFunc);
    };

    this.loopId = window.requestAnimationFrame(loopFunc);
  }

  endLoop() {
    window.cancelAnimationFrame(this.loopId);
  }

  get ctx() {
    return this._ctx;
  }

  set ctx(ctx) {
    this._ctx = ctx;
  }

  get children() {
    return this._children;
  }

  get loopId() {
    return this._loopId;
  }

  set loopId(id) {
    this._loopId = id;
  }
}
