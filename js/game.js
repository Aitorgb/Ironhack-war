class Game {
    constructor (ctx) {
        this._ctx = ctx
        this._idInterval = null
        this._bg = new BackgroundGame (ctx)
        this._police = new Police (ctx)
        this.frameNumber = 0
        this._obstacles = []
        this._speed = 0
    }

    start() {
        this._idInterval = setInterval(() => {
            this._clear()
            this._draw()
            this._move()
        }, 1000/60);
    }

    _stop() {
       clearInterval(this._idInterval)
    }


    _clear() {
        this._ctx.clearRect(0 , 0, this._ctx.canvas.width, this._ctx.canvas.height)
    }

    _draw() {
        this.frameNumber += 1
        this._bg.draw()
        this._police.draw()
    }

    _move() {
        this._bg.move()
        this._police.move()
    }



  

}