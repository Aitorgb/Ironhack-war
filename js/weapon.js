class Weapon {
    constructor(shooter) {
      this.shooter = shooter;
      this.bullets = []
      this.direction = this.shooter.x + this.shooter.width
      this.value = 10
      this.bg = 5
      this.audio = new Audio('./sound/boton.mp3')
    }
  
    shoot() {
      this.audio.load()
      this.audio.currentTime = 0.5
      this.audio.play()
     
      this.shooter.hasOwnProperty('_bg') ? this.bg = this.shooter._bg.x : this.bg = 0;

    if(this.shooter.cutY === 0 || this.shooter.cutY === 2) {
      this.direction = this.shooter.x + this.shooter.width + this.bg
      this.value = 15
    } else {
      this.direction = this.shooter.x + this.bg
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
      this.clearBullets()
    }
  
    move() {
      this.bullets.forEach(b => {
         b.move()
      })
    }

    collide (player) {
    const isCollisionBullet = this.bullets.some (b => b.collide(player))
    this.bullets.forEach(b => {
      if(b.collide(player)) {
        player.life -= player.damage
        this.bullets = this.bullets.filter(bull => b !== bull)
      };
    })
    return isCollisionBullet

    }
  }