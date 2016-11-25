import Sprite from "./Sprite";

export default class ImageSprite extends Sprite {
  constructor(image) {
    super();

    this._image = image;
  }

  draw() {
    this.ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height);
  }

  get width() {
    return this._image.width;
  }

  get height() {
    return this._image.height;
  }

  get image() {
    return this._image;
  }

  set image(image) {
    this._image = image;
  }

}
