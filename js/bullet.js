class Bullet {
  constructor(ctx, x, y, value) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.vx = value
    this.bg = 0
   
    
    
    this.r = 2
  }

  draw() {
    this.ctx.fillStyle = '#CD7F32'
    this.ctx.beginPath();

    this.ctx.arc(
      this.x,
      this.y,
      this.r,
      0,
      Math.PI * 2
    )

    this.ctx.fill()
    this.ctx.closePath()
  }

  move() {
    this.x += this.vx
  }

  collide(element) {
    element.hasOwnProperty('_bg') ? this.bg = element._bg.x : this.bg = 0;
    const colX = this.x + this.r > element.x + this.bg && this.x + this.r < element.x + element.width + this.bg 
    const colY = this.y + this.r > element.y && this.y + this.r < element.y + element.height
        return colX && colY
  }



  isVisible() {
    return (this.x < this.ctx.canvas.width && this.x > 0 && this.y < this.ctx.canvas.height && this.y > 0)
  }
}