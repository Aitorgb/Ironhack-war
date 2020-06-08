class Obstacles {
    constructor(ctx, x, y) {
        this._ctx = ctx
        this.x = x
        this.y = y
        this.vx = 0
        this.vy = 0
       
    }

    move() {
        this.x += this.vx
    }

}