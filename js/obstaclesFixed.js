class ObstaclesFixed extends Obstacles {
    constructor(ctx, x, y, w, h) {
        super(ctx, x, y)
        this.width = w
        this.height = h
        this.top = x
    }



    draw() {
        this._ctx.fillRect (
            this.x,
            this.y,
            this.width,
            this.height
        )
    }


}