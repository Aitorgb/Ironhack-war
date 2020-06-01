class Police {
    constructor(ctx) {
        this._ctx = ctx
    
        this._img = new Image()
        this._img.src = './images/police-walk.png'


        this.x = 0 + 50
        this.y = this._ctx.canvas.height * 0.75
        this.width = 80
        this.height = 90

        this._img.frames = 7
        this._img.frameIndex = 0
        this.tick = 0

        this.vx = 0
        this.vy = 0

        this._setListener()
    }



    draw() {
        this._ctx.drawImage(
            this._img,
            this._img.frameIndex * this._img.width / this._img.frames,
            0,
            this._img.width / this._img.frames,
            this._img.height,
            this.x,
            this.y,
            this.width,
            this.height
        )

    }

    move() {
     

        this.x += this.vx
        this.y += this.vy
        this._checkCollision()
    }


    _setListener() {
           document.addEventListener('keydown', event => {
            switch(event.keyCode) {
                case RIGHT_BUTTON:
                    this._animate()
                    this.vx = 1;
                    break;
                case LEFT_BUTTON:
                    this.vx = -1;
                    break;
                case UP_BUTTON:
                    this.vy = -1;
                    break;
                case DOWN_BUTTON:
                    this.vy = 1;
                    break;
                case SPACE:
                    _jump()
                    break;
            }
        })

        document.addEventListener('keyup', event => {
            switch(event.keyCode) {
                case RIGHT_BUTTON:
                    this.vx = 0;
                    break;
                case LEFT_BUTTON:
                    this.vx = 0;
                    break;
                case UP_BUTTON:
                    this.vy = 0
                    break;
                case DOWN_BUTTON:
                    this.vy = 0;
                    break;
            }
        })
    }


    _animate () {
        this.tick++;
        if (this.tick > 1) {
          this.tick = 0
          this._img.frameIndex++
        }
    
        if (this._img.frameIndex >= this._img.frames) {
          this._img.frameIndex = 0
        }
      }


    _checkCollision() {
        if (this.x >= this._ctx.canvas.width * 0.80) {
            this.x = this._ctx.canvas.width * 0.80
        } else if (this.x <= this._ctx.canvas.width * 0.10) {
            this.x = this._ctx.canvas.width * 0.10
        }
    }


}