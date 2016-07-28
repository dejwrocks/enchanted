import Director from "./Director";
import Sprite from "./Sprite";

export default class ImageSprite extends Sprite {
  constructor(image) {
    super();
    //private
    this._interval = 0;  //
    this._animationFrames = [];
    this._animationFlag = false;
    this._currentFrameIndex = 0;

    //public
    this._image = image;
    this._animationInterval = 0; //set the interval between each frame
    this._backToOriginalFrameFlag = false;
  }

  addAnimationFrame(image) {
    if (!(image instanceof Image)) {
      throw new Error(`argument "image" is not an Image`);
    }
    this._animationFrames.push(image);
  }

  startAnimation() {
    this._animationFlag = true;
  }

  updateAnimationFrame() {
    if (this._animationFlag === false) {
      return;
    }
    const previousRenderTime = Director.getInstance().previousRenderTime;
    let renderInterval = Date.now() - previousRenderTime;
    this._interval += renderInterval;
    if (this._interval >= this.animationInterval) {
      this.image = this._animationFrames[this._currentFrameIndex];
      ++this._currentFrameIndex;
      this._interval = 0;
      if (this._currentFrameIndex >= this._animationFrames.length) {
        this._animationFlag = false;
        this._currentFrameIndex = 0;
        if (this.backToOriginalFrameFlag) {
          this.image = this._animationFrames[0];
        }
      }
    }
  }

  draw() {
    this.updateAnimationFrame();
    this.ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height);
  }

  get image() {
    return this._image;
  }

  set image(image) {
    this._image = image;
  }

  get animationInterval() {
    return this._animationInterval;
  }

  set animationInterval(interval) {
    this._animationInterval = interval;
  }

  get backToOriginalFrameFlag() {
    return this._backToOriginalFrameFlag;
  }

  set backToOriginalFrameFlag(flag) {
    this._backToOriginalFrameFlag = flag
  }
}
