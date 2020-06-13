class Police {
    constructor(ctx) {
        this._ctx = ctx


        this._img = new Image()
        this._img.src = './images/police.gif'

        this._imglife = new Image()
        this._imglife.src = './images/heart.png'


        this.x = 15
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
        this.jumpstate = false
        this.vx = 0
        this.vy = 0
        this.g = 0
        this.life = 100
        this.damage = 20

        this.collisionObjectFloor = true
        this.collisionJumpUpper = false
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
        this._checkJump()
        const lifeNow = this._calculateLife()
        let j = 10

        for (let i = 0; i < lifeNow; i++ , j += 35) {
            this._ctx.drawImage(
                this._imglife,
                this._ctx.canvas.width * 0.03 + j,
                this._ctx.canvas.height * 0.03,
                30,
                30
            )
        }
        
    
    }

    move() {
        this.vy += this.g
        this.x += this.vx
        this.y += this.vy
        this.weapon.move()
    }

    _calculateLife() {
        let n = 0
        if (this.life < 25){
            n = 1
        } else if (this.life >= 25 && this.life < 50){
            n = 2
        } else if (this.life >= 50 && this.life < 75) {
            n = 3
        } else {
            n = 4
        }
        return n
    }


    jump() {
            if  (this._floor()) {
            this.jump_position = this.y + this.height
            }
            if (this._floor() || this.collisionJumpUpper)
            this.vy = -5
            this.g = 0.1
            this.cutY === 0 ? this.cutY = 2 : this.cutY = 3
            this.jumpstate = true
            this._img.frameIndex = 4
            
    }



    _floor() {
        return (this.y >= this._ctx.canvas.height * 0.50) && this.collisionObjectFloor
    }


    animate () {
        this._img.frameIndex++
        if (this._img.frameIndex >= this._img.frames) {
          this._img.frameIndex = 0
        }
      }


     _checkJump() {


        if (this.jump_position !== this._ctx.canvas.height && this.jump_position < this.y + this.height) {
            this.y = this.jump_position - this.height
            this.vy = this.g = 0
            this.jumpstate = false
            this.cutY = 0
            this.jump_position = this._ctx.canvas.height
        } 

    }
    
    collisionUpper(element) {
        const colY =  (this.y + this.height) * 0.95 <= element.y + element.height * 0.2
        const colX = this.x + this.width  > element.x && this.x < (element.x + element.width)
        // console.log('police', this.y + this.height);
        // console.log('y',  element.y);
        // console.log('total', element.y + element.height  * 0.10 );
        return colY && colX
    }

    collisionX(element) {
        const colX = this.x + this.width > element.x && this.x + this.width < element.x + element.width * 0.05
        return colX
    }

    collisionBg () {
        const colX = (this.x  < 10) || this.x + this.width > this._ctx.canvas.width
        const colY = (this.y  < this._ctx.canvas.height * 0.50) || (this.y + this.height) * 0.99 > this._ctx.canvas.height
        return colX || colY
    }


    otherCollision(element) {
        const colX = (this.x + this.width) * 0.9 > element.x && this.x < (element.x + element.width) * 0.85
        //const colX = this.x + this.width  > element.x && this.x < (element.x + element.width)
        const colY = (this.y + this.height) * 0.95 > element.y && this.y + this.height * 0.98 < (element.y + element.height)
        return colX && colY
    }

    collisionRewards(element) {
        const colX = (this.x + this.width) > element.x && this.x < (element.x + element.width)
        const colY = (this.y + this.height) > element.y && this.y + this.height * 0.75 < (element.y + element.height)
        return colX && colY
    }


}