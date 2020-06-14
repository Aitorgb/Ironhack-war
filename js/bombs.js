class Bomb {
    constructor(ctx, x, bg) {
        this._ctx = ctx
        this.g = 0.1
        this.vy = 0.4
        this.vx = 0
        this.x = x
        this.y = 0
        this.width = 60
        this.height = 60
        this.i = 0
        this.tick = 0
        this._img = new Image()
        this._img.src = './images/bomb.png'

        this._img.frames = 6
        this._img.frameIndex = 0
        this._img.rows = 2
        this.currentIndex = 0
        this.cutY = 0
        this.audioBombs = new Audio('./sound/bombs.mp3')

        
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
        this.width,
        this.height
    )

      this.animate()
      this.collision()
        
    }
    
    move() {
        this.vy += this.g
        this.y += this.vy
        this.x += this.vx
      }

    collision() {
      const colY = this.y + this.height > this._ctx.canvas.height 
      if (colY) {
        this.cutY = 1
        this.audioBombs.play()
        this.y = this._ctx.canvas.height - this.height
      }

    }

    animate() {
      
      if (this.tick++ > 7){
      this._img.frameIndex++
      if (this._img.frameIndex >= this._img.frames) {
        this._img.frameIndex = 0
      }
      this.tick = 0
      }
     
    }


    final() {
      return this.y + this.height * 0.7 > this._ctx.canvas.height 
    }


}