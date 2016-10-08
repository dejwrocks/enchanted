import Scene from "./Scene";

class Director {
  constructor(ctx) {
    this._ctx = ctx;
    this._runningScene = null;
    this._previousRenderTime = 0;
    this._canvasSize = { width: this.ctx.canvas.width, height: this.ctx.canvas.height };
    this._images = {};
    this._scaleRatio = 1.0;
  }

  static getInstance(ctx) {
    if (typeof Director._instance === "object") {
      return Director._instance;
    }

    Director._instance = new Director(ctx);
    return Director._instance;
  }

  checkTypeOfScene(scene) {
    if (!(scene instanceof Scene)) {
      throw new Error("need a instanceof scene");
    }
  }

  fitScreen() {
    let winSize = { width: window.innerWidth, height: window.innerHeight };

    let widthToHeight = this.canvasSize.width / this.canvasSize.height;   //设计宽高比
    let newWidthToHeight = winSize.width / winSize.height;   //屏幕宽高比
    let width, height;

    if (widthToHeight < newWidthToHeight) {   //屏幕太矮了
      height = winSize.height;
      width = height * widthToHeight;
    } else {
      width = winSize.width;
      height = width / widthToHeight;
    }

    this.ctx.canvas.style.width = `${width}px`;
    this.scaleRatio = width / this.canvasSize.width;
  }

  preload(imageUrls, keyProducer) {
    //key Producer: a funtion returns the key
    return new Promise((resolve, reject) => {
      let count = 0;
      if (imageUrls.length === 0) {
        resolve({});
        return;
      }

      for (let i = imageUrls.length - 1; i >= 0; i--) {
        let image = new Image();
        let imageUrl = imageUrls[i];
        let key = keyProducer(imageUrl);

        image.onload = () => {
          count++;
          this.images[key] = image;
          if (count === imageUrls.length) {
            resolve(this.images);
          }
        };

        image.onerror = function() {
          reject(new Error("load image failed"));
        };

        image.src = imageUrl;
      }

    });
  }

  loadImage(imageUrl, keyProducer) {
    return new Promise((resolve, reject) => {

      let image = new Image();
      let key = keyProducer(imageUrl);

      image.onload = () => {
        this.images[key] = image;
        resolve(this.images);
      };

      image.onerror = function() {
        reject(new Error("load image failed"));
      };

      image.src = imageUrl;
    });
  }

  enableTouch(flag) {
    //讲接收到的touch事件传递给Scene
    let style = document.defaultView.getComputedStyle(this.ctx.canvas);
    let margin = {
      left: parseFloat(style.marginLeft),
      top: parseFloat(style.marginTop)
    };
    if (flag) {
      let touchScale = 1 / this.scaleRatio;

      this.ctx.canvas.addEventListener("touchstart", event => {
        let x = (event.changedTouches[0].pageX - margin.left) * touchScale;
        let y = (event.changedTouches[0].pageY - margin.top) * touchScale;
        if (this.runningScene.onTouchStart) {
          this.runningScene.onTouchStart(x, y, event);
        }
      }, false);

      this.ctx.canvas.addEventListener("touchmove", event => {
        event.preventDefault();
        let x = (event.changedTouches[0].pageX - margin.left) * touchScale;
        let y = (event.changedTouches[0].pageY - margin.top) * touchScale;
        if (this.runningScene.onTouchMove) {
          this.runningScene.onTouchMove(x, y, event);
        }
      }, false);

      this.ctx.canvas.addEventListener("touchend", event => {
        let x = (event.changedTouches[0].pageX - margin.left) * touchScale;
        let y = (event.changedTouches[0].pageY - margin.top) * touchScale;
        if (this.runningScene.onTouchEnd) {
          this.runningScene.onTouchEnd(x, y, event);
        }
      }, false);
    }

  }

  runScene(scene) {
    this.checkTypeOfScene(scene);

    scene.ctx = this.ctx;
    this.runningScene = scene;
    scene.startLoop();
  }

  stopScene(scene) {
    this.checkTypeOfScene(scene);

    scene.endLoop();
    this.runningScene = null;
  }

  replaceScene(scene) {
    this.checkTypeOfScene(scene);

    this.stopScene(this.runningScene);
    this.runScene(scene);
  }

  get ctx() {
    return this._ctx;
  }

  set ctx(ctx) {
    this._ctx = ctx;
  }

  get runningScene() {
    return this._runningScene;
  }

  set runningScene(scene) {
    this._runningScene = scene;
  }

  get previousRenderTime() {
    return this._previousRenderTime;
  }

  set previousRenderTime(time) {
    this._previousRenderTime = time;
  }

  get canvasSize() {
    return this._canvasSize;
  }

  set canvasSize(size) {
    this._canvasSize = size;
  }

  get images() {
    return this._images;
  }

  get scaleRatio() {
    return this._scaleRatio;
  }

  set scaleRatio(ratio) {
    this._scaleRatio = ratio;
  }
}

export default Director;
