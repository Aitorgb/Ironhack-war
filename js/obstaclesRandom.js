class ObstaclesRandom extends Obstacles{
    constructor(ctx, x, y, number, cutY = 0, frames = 3) {
        super(ctx, x, y)
        this._img = new Image()
        this._img.src = './images/obstacles.gif'
        this._img.frames = frames
        this._img.frameIndex = number
        this.w = 150
        this.h = 100
        this._img.rows = 2
        this.currentIndex = 0
        this.cutY = cutY
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
                this.w,
                this.h
            )
        
    }
}