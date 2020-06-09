class BackgroundGame {
    constructor (ctx) {
        this._ctx = ctx

        this.x = 0
        this.y = 0
        this.v = this._ctx.canvas.width + 1000
        this.h = this._ctx.canvas.height
        this._img = new Image()
        this._img.src = './images/City-sin-obstacles.png'
        this.auxX = 0
        this.back = true


        this.vx = 0
        this.vy = 0
        this.vgx = 0

        

    }

    draw() {
        this._ctx.drawImage(
            this._img,
            this.x,
            this.y,
            this.v,
            this.h
        )
        this._ctx.drawImage(
            this._img,
            this.x + this.v,
            this.y,
            this.v,
            this.h
        )


    }

    move() {
        this.x += this.vx
        this.x + this.v <= 0 && (this.x = 0)
    }


    

}