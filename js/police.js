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
        this.life = 100
        this.damage = 25


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
        this._checkCollision()
    }

    move() {
        this.vy += this.g
        this.x += this.vx
        this.y += this.vy
        this.weapon.move()

    }


    jump() {
        console.log(this.y);
        // if (this._floor()){
            this.jump_position = this.y + this.height
            this.vy += -5
            this.g = 0.1
            this.cutY === 0 ? this.cutY = 2 : this.cutY = 3
        
        this._jumpstate = true
    }



    _floor() {
        return this.y + this.height >= this._ctx.canvas.height * 0.60
    }


    animate () {


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

    }
    collisionUpper(element) {
        const colY =  (this.y + this.height) > element.y + element.h * 0.10
        return colY
    }

    collisionBg () {
        const colX = (this.x  < 0) || this.x + this.width > this._ctx.canvas.width
        const colY = (this.y  < 0) || (this.y + this.height) * 0.99 > this._ctx.canvas.height
        return colX || colY
    }


    otherCollision(element) {
        const colX = (this.x + this.width) * 0.98 > element.x && this.x < (element.x + element.w) * 0.98
        const colY = (this.y + this.height) * 0.95 > element.y && this.y + this.height * 0.98 < (element.y + element.h)
        return colX && colY

    }


}