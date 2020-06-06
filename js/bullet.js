class Bullet {
  constructor(ctx, x, y, value) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.vx = value
   
    
    this.w = 4
    this.h = 4
    this.r = this.h / 2
  }

  draw() {
    this.ctx.fillStyle = '#CD7F32'
    this.ctx.beginPath();
 
  this.ctx.fillRect(
    this.x, 
    this.y,
    this.w,
    this.h
  )

  this.ctx.arc(
      this.x + this.w,
      this.y + (this.h / 2),
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



  isVisible() {
    return (this.x < this.ctx.canvas.width && this.x > 0 && this.y < this.ctx.canvas.height && this.y > 0)
  }
}