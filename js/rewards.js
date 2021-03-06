class Rewards {
    constructor(ctx, x, y, number, w = 50, h = 50) {
        this._ctx = ctx
        this.x = x
        this.y = y
        this.vx = 0
        this.sum = 0
        
        this.img = new Image()
        this.img.src = './images/reward.gif'
        this.img.frames = 7
        this.img.frameIndex = number
        this.width = w
        this.height = h 
        this.audioRewards = new Audio('./sound/rewards.mp3')
        this.audioRewards.volume = 0.4
        
    }

    draw() {

        this._ctx.drawImage(
            this.img,
            this.img.frameIndex * this.img.width / this.img.frames,
            0,
            this.img.width / this.img.frames,
            this.img.height,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }


    move() {
        this.x += this.vx
    }

    sumRewards() {
        this.audioRewards.load()
        this.audioRewards.play()

        switch (this.img.frameIndex) {
            case 0:
                this.sum = 100
            case 1:
            case 3:
                this.sum = 50
                break;
            case 2:
                this.sum = 150
                break;
            case 4:
                this.sum = 25
                break;
            case 5:
                this.sum = 'life'
                break;
            case 6:
                this.sum = 'final'
                break;
        }

        return this.sum
    }



}