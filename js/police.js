class Police {
    constructor(ctx) {
        this._ctx = ctx

       
        this._img = new Image()
        this._img.src = './images/police.gif'
        this.x = 0
        this.y = this._ctx.canvas.height * 0.75
        this.width = 70
        this.height = 110

        this._img.frames = 6
        this._img.frameIndex = 0
        this._img.rows = 4
        this.currentIndex = 0
        this.cutY = 0

        this.tick = 0
        this.jump_position = this._ctx.canvas.height
        this._jumpstate = false
        this.vx = 0
        this.vy = 0
        this.g = 0

        this._setListener()
        this.weapon = new Weapon(this)
    }



    draw() {

        this._ctx.drawImage(
            this._img,
            this._img.frameIndex * this._img.width / this._img.frames,
            this._img.height * this.cutY / this._img.rows,
            this._img.width / this._img.frames,
            this._img.height / this._img.rows,
            this.x,
            this.y,
            this.width,
            this.height
        )
        this.weapon.draw()

    }

    move() {
        this.vy += this.g
        this.x += this.vx
        this.y += this.vy
        this._checkCollision()
        this.weapon.move()
      
    }


    _setListener() {
           document.addEventListener('keydown', event => {
            switch(event.keyCode) {
                case RIGHT_BUTTON:
                    this.vx = 1
                    this.cutY = 0
                    this._animate()
                    break;
                case LEFT_BUTTON:
                    this.cutY = 1
                    this.vx = -1
                    this._animate()
                    break;
                case UP_BUTTON:
                    this.vy = -1;
                    this._animate()
                    break;
                case DOWN_BUTTON:
                    this.vy = 1;
                    this._animate()
                    break;
                case SPACE:
                    this._jump()
                    break;
                case M_BUTTON:
                    this.weapon.shoot()
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


    _jump() {
        if (this._floor()){
            this.jump_position = this.y + this.height
            this.vy = -5
            this.g = 0.1
            if(this.cutY === 0){
            this.cutY = 2
            } else {
                this.cutY = 3
            }
        }
        this._jumpstate = true
    }



    _floor() {
        return this.y >= this._ctx.canvas.height * 0.50
    }


    _animate () {
       

        this._img.frameIndex++

        if (this._img.frameIndex >= this._img.frames) {
          this._img.frameIndex = 0
        }
      }


    _checkCollision() {


        if (this._jumpstate && this.jump_position < this.y + this.height) {
            this.y = this.jump_position - this.height
            this.vy = this.g = 0
            this._jumpstate = false
            this.cutY = 0
        }

        if (this.x >= this._ctx.canvas.width * 0.80) {
            this.x = this._ctx.canvas.width * 0.80
        } else if (this.x <= this._ctx.canvas.width * 0.10) {
            this.x = this._ctx.canvas.width * 0.10
        } else if (this.y + this.height >= this._ctx.canvas.height) {
            this.y = this._ctx.canvas.height - this.height
        }

    }


}