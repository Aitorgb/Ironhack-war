class ObstaclesFixed extends Obstacles {
    constructor(ctx, x, y, w, h) {
        super(ctx, x, y)
        this.w = w
        this.h = h
        this.top = x
        
    }



    draw() {
        this._ctx.fillRect (
            this.x,
            this.y,
            this.w,
            this.h
        )
    }


    move() {
        this.x += this.vx 
        if (this.x > this.top) {
            this.x = this.top
        }
    }

    _numberRandomX() {
        return Math.floor(Math.random() * this._ctx.canvas.height * 0.61)
    }

   


}