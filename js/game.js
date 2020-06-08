class Game {
    constructor (ctx) {
        this._ctx = ctx
        this._idInterval = null
        this._bg = new BackgroundGame (ctx)
        this._police = new Police (ctx)
        this._score = new Score (ctx)
        this.frameNumber = 0
        this.tick = 0
        this._obstacles = []
        this._terrorist = []
        this._rewards  = []
        this.lastBg = true;
        this._setListener()
        this._addObstacle()
        this._addterrorist()
        this._addreward()
        this.countShoot = 49
        this.score = 0
    }

    start() {
        this._idInterval = setInterval(() => {
            this._clear()
            this._draw()
            this._move()
           this._collision()
           this._shoot()
           this.createObstacles()

        }, 1000 / 60);
    }

    _stop() {
       clearInterval(this._idInterval)
    }


    _clear() {
        this._ctx.clearRect(0 , 0, this._ctx.canvas.width, this._ctx.canvas.height)
    }

    _draw() {
        this._bg.draw()
        
        this._obstacles.forEach(obstacle => {
            obstacle.draw()
        })
        
        this._rewards.forEach(rewards => {
            rewards.draw()
        })
        this._score.draw(this.score)
        this._police.draw()
        this._terrorist.forEach(terrorist => {
            terrorist.draw()
        })

        if (this.tick++ > 10) {
            this.score++
            this.tick = 0
        }
    }

    _move() {
        this._bg.move()
        this._police.move()
        this._obstacles.forEach(obstacle => {
            obstacle.move()
        })
        this._terrorist.forEach(terrorist => {
            terrorist.move()
        })
        this._rewards.forEach(reward => {
            reward.move()
        })
    }

    _addObstacle() {
        this._obstacles = [
            new ObstaclesFixed (this._ctx, 0, 200, 20, 190),
            new ObstaclesFixed (this._ctx, 100, 210, 190, 110),
            new ObstaclesFixed (this._ctx, 190, 0, 300, 400),
            new ObstaclesFixed (this._ctx, 490, 0, 140, 370),
            new ObstaclesFixed (this._ctx, 620, 0, 180, 400),
            new ObstaclesFixed (this._ctx, 1600, 310, 70,70),
            new ObstaclesFixed (this._ctx, 1560, 320, 50, 50),
            new ObstaclesFixed (this._ctx, 1670, 230, 200, 150),
            new ObstaclesFixed (this._ctx, 1800, 200, 210, 190),
            new ObstaclesFixed (this._ctx, 2000, 200, 20, 190),
            new ObstaclesFixed (this._ctx, 2100, 210, 190, 110),
            new ObstaclesFixed (this._ctx, 2200, 0, 300, 400),
            new ObstaclesFixed (this._ctx, 2450, 0, 170, 370),
            new ObstaclesFixed (this._ctx, 2620, 0, 180, 400),
            new ObstaclesRandom (this._ctx, 500, 400, 0),
            new ObstaclesRandom (this._ctx, 900, 300, 1),
            new ObstaclesRandom (this._ctx, 1200, 380, 0),
            new ObstaclesRandom (this._ctx, 1800, 400, 1, 1, 2),
            new ObstaclesRandom (this._ctx, 2508, 400, 0)
        ]
        
    }

    _addreward() {
        let numberImg = 3
        for (let j = 0; j <= 500; j += 500) {
            for (let i = 0; i < 300; i += 90) {
                this._rewards.push (new Rewards(this._ctx, j + i + 150, 420, numberImg))
            }
            numberImg++
        }
        numberImg = 0
            for (let i = 0; i <= 600; i += 90) {
                this._rewards.push (new Rewards(this._ctx, i + 1250, 400, numberImg))
                numberImg++
                if (numberImg >= 3) numberImg = 0
            }
            for (let i = 0; i < 400; i += 100) {
                this._rewards.push (new Rewards(this._ctx, i + 1150, 330, 3))
            }
        numberImg = 1
            this._rewards.push (new Rewards(this._ctx, 1620, 250, numberImg))
            this._rewards.push (new Rewards(this._ctx, 1670, 215, numberImg))
            this._rewards.push (new Rewards(this._ctx, 1710, 190, numberImg))
            
            for (let i = 0; i < 100; i += 50) {
                this._rewards.push (new Rewards(this._ctx, i + 1750, 180, numberImg))    
            }
            this._rewards.push (new Rewards(this._ctx, 1850, 155, 5))
            if(!this.lastBg) {
                this._rewards.push (new Rewards(this._ctx, 1950, 155, 6))
            }        
    }


    createObstacles() {

        if (this._bg.x === 0 && this._police.x > 100 && this.lastBg) {
            this.lastBg = false
            this._addObstacle()
            this._addterrorist()
            this._addreward()
            
        }
    }

    _collision() {
        
        const isCollision = this._obstacles.some (obstacle => {
            return this._police.otherCollision(obstacle)
        });
         
        const isCollisionBackground = this._obstacles.some (obstacle => {
            return this._police.collisionBg()
        });

        const isCollisionUpper = this._obstacles.some (obstacle => {
            return this._police.collisionUpper(obstacle)
        });

        this._rewards.forEach (reward => {
            if (this._police.otherCollision(reward)) {
                const resul = reward.sumRewards()
                if (!isNaN(resul)) {
                    this.score += resul
                } else if (resul === 'life') {
                    this._police.life = 100
                } else if (resul === 'final') {
                    this._score.final()
                }
                this._rewards = this._rewards.filter (rewardCollision => rewardCollision !== reward)
            }
        });
           if (isCollision || isCollisionBackground) {

                // this._obstacles.forEach( obstacle => {
                //     if (this._police.collisionUpper(obstacle)) {
                //         this._police.y = obstacle.y
                //     }

                    
                // });



            // if (isCollisionUpper) {
            //     this._police.y -= this._police.vy
            //     console.log('hei');
            // } else {
                this._police.x -= this._police.vx
                this._police.y -= this._police.vy
                this._bg.x -= this._bg.vx
                this._obstacles.forEach (obstacle => {
                    obstacle.x -= obstacle.vx
                })
                this._rewards.forEach (reward => {
                    reward.x -= reward.vx
                })
           }
           

          

    }

    _addterrorist() {
        this._terrorist = [ new Terrorist(
            this._ctx,
            this._ctx.canvas.width,
            this._ctx.canvas.height * 0.57,
            this._bg
             ),
            new Terrorist(
                this._ctx,
                this._ctx.canvas.width + 200,
                this._ctx.canvas.height * 0.7,
                this._bg
             )
            ]
    }


    _shoot() {
        this._terrorist.forEach (terrorist => {
            const isCollisionBullet = this._police.weapon.collide(terrorist);
            if (isCollisionBullet) this.score += 500
            if(terrorist.isNear(this._police)) {
                terrorist.x -= terrorist.vx
                if (this._police.x < (terrorist.x + terrorist._bg.x)) {
                    terrorist.cutY = 1
                    terrorist.direction === 'right' ? terrorist.vx *= -1 : terrorist.vx *= 1
                } else {
                    terrorist.cutY = 0
                    terrorist.direction === 'right' ? terrorist.vx *= 1 : terrorist.vx *= -1
                }
                if (this.countShoot++ > 50) {
                    terrorist.weapon.shoot()
                    this.countShoot = 0
                }
                
                
            } 
        })

        this._terrorist.forEach(terrorist => terrorist.weapon.collide(this._police))
        this._terrorist = this._terrorist.filter (terrorist => terrorist.life > 0)

        this._police.life <= 0 && this._gameover()

        
    }
    

    _gameover() {
        this._stop()
        this._score.scoreFailed()
    }

    _setListener() {
            document.addEventListener('keydown', event => {
                switch(event.keyCode) {
                    case RIGHT_BUTTON:
                        this._police.vx = 0.5
                        this._police.cutY = 0
                        this._bg.vx = -2
                        this._obstacles.forEach (obstacle => {
                            obstacle.vx = -2
                        })
                        this._rewards.forEach (reward => {
                            reward.vx = -2
                        })
                        this._police.animate()
                        break;
                    case LEFT_BUTTON:
                        this._police.vx = -0.5
                        this._police.cutY = 1
                        this._bg.vx = 2
                        this._obstacles.forEach (obstacle => {
                            obstacle.vx = 2
                        })
                        this._rewards.forEach (reward => {
                            reward.vx = 2
                        })
                        this._police.animate()
                        break;
                    case UP_BUTTON:
                        this._police.vy = -1;
                        this._police.animate()
                        break;
                    case DOWN_BUTTON:
                        this._police.vy = 1;
                        this._police.animate()
                        break;
                    case SPACE:
                        this._police.jump()
                        break;
                    case M_BUTTON:
                        this._police.weapon.shoot()
                }


            })

            document.addEventListener('keyup', event => {
                    switch(event.keyCode) {
                        case RIGHT_BUTTON:
                            this._police.vx = 0
                            this._bg.vx = 0
                            this._obstacles.forEach (obstacle => {
                                obstacle.vx = 0
                            })
                            this._rewards.forEach (reward => {
                                reward.vx = 0
                            })
                            break;
                        case LEFT_BUTTON:
                            this._police.vx = 0
                            this._bg.vx = 0
                            this._obstacles.forEach (obstacle => {
                                obstacle.vx = 0
                            })
                            this._rewards.forEach (reward => {
                                reward.vx = 0
                            })
                            break;
                        case UP_BUTTON:
                            this._police.vy = 0
                            break;
                        case DOWN_BUTTON:
                            this._police.vy = 0
                            break;
                        case SPACE:
                        this._police.vy += this._police.jump_position
                        this._police.g = 0
                        break;
                    }
            })
    }







}