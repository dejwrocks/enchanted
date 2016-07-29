import Action from "./Action";

class FrameAnimation extends Action {
  constructor(frames, frameInterval) {
    super();

    this._interval = 0;
    this._currentFrameIndex = 0;
    this._originalImage = null;

    //public
    this._frames = frames || [];
    this._frameInterval = frameInterval || 100;
    this._backToOriginalFrameFlag = false;
  }

  execute() {
    if (this._originalImage === null && this.backToOriginalFrameFlag) {
      this._originalImage = this.executor.image;
    }
    let renderInterval = Date.now() - this.startTime;
    this._interval += renderInterval;
    if (this._interval >= this.frameInterval) {
      this.executor.image = this.frames[this._currentFrameIndex];
      ++this._currentFrameIndex;
      this._interval = 0;
      if (this._currentFrameIndex >= this.frames.length) {
        this.halt();
        this._currentFrameIndex = 0;
        if (this._originalImage !== null && this.backToOriginalFrameFlag) {
          this.executor.image = this._originalImage;
        }
      }
    }
  }

  //remove action after finished
  halt() {
    let index = this.executor._actions.indexOf(this);
    this.executor._actions.splice(index, 1);
  }

  get frames() {
    return this._frames;
  }

  set frames(frames) {
    this._frames = frames;
  }

  get frameInterval() {
    return this._frameInterval;
  }

  set frameInterval(frameInterval) {
    this._frameInterval = frameInterval;
  }

  get backToOriginalFrameFlag() {
    return this._backToOriginalFrameFlag;
  }

  set backToOriginalFrameFlag(flag) {
    this._backToOriginalFrameFlag = flag;
  }
}

export default FrameAnimation;
