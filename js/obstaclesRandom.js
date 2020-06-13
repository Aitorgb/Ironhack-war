class ObstaclesRandom extends Obstacles{
    constructor(ctx, x, y, number) {
        super(ctx, x, y)
        this._img = new Image()
        this._img.src = './images/obstacles.gif'
        this._img.frames = 3
        this._img.frameIndex = number
        this.width = 150
        this.height = 100
    }

    draw() {
        
            this._ctx.drawImage(
                this._img,
                this._img.frameIndex * this._img.width / this._img.frames,
                0,
                this._img.width / this._img.frames,
                this._img.height,
                this.x,
                this.y,
                this.width,
                this.height
            )
        
    }
}