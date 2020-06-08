class Score {
    constructor(ctx) {
        this._ctx = ctx;
        this._count = 0
        this.score = document.getElementById('score-failed')
        this._img = new Image()
        this._img.src = './images/money-icon.png'
        this.x = this._ctx.canvas.width * 0.84
        this.y = this._ctx.canvas.height * 0.01
    }

    draw(count) {

        this._count = count
        this._ctx.drawImage(
            this._img,
            this.x,
            this.y,
            40,
            40
        )
        this._ctx.font = "bold 30px Arial";
        this._ctx.fillStyle = 'white'
        this._ctx.fillText (this._count, this._ctx.canvas.width * 0.90 ,this._ctx.canvas.height * 0.08)
    }

    scoreFailed() {
        this.score.innerText = this._count
        document.getElementById('canvas').className = 'no-visible'
        document.getElementById('menu-final').className = 'visible'
    }

    final() {



    }

}