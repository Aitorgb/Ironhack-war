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
        this._bg = bg

        this._img = new Image()
        this._img.src = './images/bomb.png'

        
    }


    draw() {
        this._ctx.drawImage(
          this._img,
          this.x,
          this.y,
          this.width,
          this.height
        )
    }
    
      move() {
        this.vy += this.g
        this.y += this.vy
        this.x += this.vx
      }


}