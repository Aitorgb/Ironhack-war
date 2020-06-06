class Weapon {
    constructor(shooter) {
      this.shooter = shooter;
      this.bullets = []
      this.direction = this.shooter.x + this.shooter.width
      this.value = 15
    }
  
    shoot() {

    if(this.shooter.cutY === 0 || this.shooter.cutY === 2) {
      this.direction = this.shooter.x + this.shooter.width
      this.value = 15
    } else {
      this.direction = this.shooter.x 
      this.value = -15
    }
      
        const bullet = new Bullet(
          this.shooter._ctx,
          this.direction,
          this.shooter.y + this.shooter.height * 0.6,
          this.value
        )
        this.bullets.push(bullet)
      
    }
  
    clearBullets() {
      this.bullets = this.bullets.filter(b => b.isVisible())
    }
  
    draw() {
      this.bullets.forEach(b => b.draw())
    }
  
    move() {
      this.bullets.forEach(b => {
         b.move()
      })
    }
  }