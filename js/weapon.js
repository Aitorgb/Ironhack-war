class Weapon {
    constructor(shooter) {
      this.shooter = shooter;
      this.bullets = []
    }
  
    shoot() {
      const bullet = new Bullet(
        this.shooter._ctx,
        this.shooter.x + this.shooter.width,
        this.shooter.y + this.shooter.height * 0.6,
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
      this.bullets.forEach(b => b.move())
    }
  }