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


}