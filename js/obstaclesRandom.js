class ObstaclesRandom extends Obstacles{
    constructor(ctx, x, y) {
        super(ctx, x, y)
        this._img = new Image
        this._img.src = './images/obstacles.gif'
        this._img.frames = 6
        this._img.frameIndex = Math.floor(Math.random() * 6)
        this.w = 150
        this.h = 100

    }

    draw() {
            this._ctx.drawImage(
                this._img,
                0,
                this._img.frameIndex * this._img.height / this._img.frames,
                this._img.width,   
                this._img.height / this._img.frames,
                this.x,
                this.y,
                150,
                100
            )
    }

    move() {
        this.x += this.vx
    }
}