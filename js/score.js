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
        this.audioNextLevel = new Audio('./sound/subir-nivel.mp3')
        

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
        this._ctx.font = "20px pressStart";
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

    final() {
        const level =  localStorage.getItem('level')
        this.audioNextLevel.play()
        if (level !== null) {
            if (level === '3') {
                document.getElementById('next-level').style.display = 'none'

            } else if(level === '2') {
                document.getElementById('level-three').disabled = true
                document.getElementById('level-three').classList.remove('disable')
                
            }  
        } 


        document.getElementById('score-final').innerText = this._count
        document.getElementById('canvas').classList.remove('visible')
        document.getElementById('canvas').classList.add('no-visible')
        document.getElementById('victory').classList.remove('no-visible')
        document.getElementById('victory').classList.add('visible')
    }

}