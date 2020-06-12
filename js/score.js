class Score {
    constructor(ctx) {
        this._ctx = ctx;
        this._count = 0
        this.score = document.getElementById('score-failed')

        this._img = new Image()
        this._img.src = './images/money-icon.png'
        this.x = this._ctx.canvas.width * 0.84
        this.y = this._ctx.canvas.height * 0.01
        this.audioFailed = new Audio('./sound/gameover.mp3')
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
        this.audioFailed.play()
        this.score.innerText = this._count
        document.getElementById('canvas').classList.remove('visible')
        document.getElementById('canvas').classList.add('no-visible')
        document.getElementById('menu-final').classList.remove('no-visible')
        document.getElementById('menu-final').classList.add('visible')
    }

    final(rewards) {
        const level =  sessionStorage.getItem('level')
        if (level !== null && level === '3') {
            document.getElementById('next-level').style.display = 'none'
        }
        document.getElementById('score-final').innerText = this._count
        document.getElementById('canvas').classList.remove('visible')
        document.getElementById('canvas').classList.add('no-visible')
        document.getElementById('victory').classList.remove('no-visible')
        document.getElementById('victory').classList.add('visible')
    }

}