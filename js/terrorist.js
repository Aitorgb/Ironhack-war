class Terrorist {
    constructor(ctx, x, y, bg, start) {
        this._ctx = ctx

       
        this._img = new Image()
        this._img.src = './images/terrorist.gif'
        this.x = x
        this.y = y
        this.width = 70
        this.height = 110
        this.life = 100

        this._bg = bg

        this.start = start
        this.end = start + 500

        this._img.frames = 6
        this._img.frameIndex = 0
        this._img.rows = 2
        this.currentIndex = 0
        this.cutY = 0

        this.tick = 0
        this.vx = 1
        this.vy = 0
        this.life = 100
        this.damage = 20

        this.near = false
        this.direction = 'right'
       
        this.weapon = new Weapon(this)
    }



    draw() {
        
        this._ctx.drawImage(
            this._img,
            this._img.frameIndex * this._img.width / this._img.frames,
            this._img.height * this.cutY / this._img.rows,
            this._img.width / this._img.frames,
            this._img.height / this._img.rows,
            this.x + this._bg.x,
            this.y,
            this.width,
            this.height
        )
        this.weapon.draw()
        this.animate()
        this._checkCollision()
    }

    move() {
        this.x += this.vx
        this.weapon.move()
    }


    animate () {
        if(!this.near) {
            if(this.tick++ > 9) {
                this._img.frameIndex++
                this.tick = 0
            }
        
            if (this._img.frameIndex >= this._img.frames) {
                  this._img.frameIndex = 0
            }
        } else {
            this._img.frameIndex = 0
        }
        
      }

    isNear (police) {
        const colX = (this.x + this._bg.x) - police.x  <= 400
        const colY = police.y - this.y <= 30 && police.y - this.y >= -30

            return colX && colY ? this.near = true : this.near = false
    }

    


    _checkCollision() {
        if (this.x >= this.end) {
            this.direction ='left'
            this.vx *= -1
            this.cutY = 1
        } else if ( this.x < this.start) {
            this.direction = 'right'
            this.vx *= -1
            this.cutY = 0
        }

    }


}