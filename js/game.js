class Game {
    constructor (ctx, number = 0, score = 0) {
        this._ctx = ctx
        this._idInterval = null
        this._bg = new BackgroundGame (ctx)
        this._police = new Police (ctx)
        this._score = new Score (ctx)
       
        this.frameNumber = 0
        this.tick = 0
        this._obstacles = []
        this._terrorist = []
        this._bombs = []
        this.rewards  = []
        this.lastBg = true;
        this.lastCollisionBackground = false;
        this._setListener()
        
        this.countShoot = 49
        this.score =  score - 14
        this.audioGame = new Audio('./sound/principal.mp3')
        this.audioGame.volume = 0.5
        this.audioGame.loop = true
        
        this._levels = new Levels (this)
        this.levelsNumber = number
        this.intervalBoomTime = 3000

        this._preload()
    }

   

    start() {
        console.log(this.score);
        this._idInterval = setInterval(() => {
            this._clear()
            this._draw()
            this._move()
            this._collision()
            this._shoot()
            this._createTerrorist()
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
        
        this.rewards.forEach(rewards => {
            rewards.draw()
        })
        this._bombs.forEach(bomb => {
            bomb.draw()
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
        this.rewards.forEach(reward => {
            reward.move()
        })
        this._bombs.forEach(bomb => {
            bomb.move()
        })
    }

    _preload() {
        this.audioGame.play()
        this._numberLevels()
        this._addObstacle()
        this._addObstacle(this._bg.v)
        this._addreward()
        this._addterrorist()
        this._addreward(this._bg.v)
    }

    _numberLevels() {
        if (this.levelsNumber === 2) {
            this._levels.secondLevel()
        } else if (this.levelsNumber === 3) {
            this._levels.thirdLevel()
        }
    }

    _createTerrorist() {
        if (this._bg.x === 0 && this._police.x > 500 && this.lastBg) {
            this.lastBg = false
            this._addterrorist()
            this.lastCollisionBackground = true;
        }
    }

    _collision() {

        const isCollisionBackground = this._obstacles.some (obstacle => {
            return this._police.collisionBg()
        });

        const obstaclesRandomCollision = this._obstacles.filter( obstacle => {
            return obstacle instanceof ObstaclesRandom
        })
        const obstaclesFixedCollision = this._obstacles.filter( obstacle => {
            return obstacle instanceof ObstaclesFixed
        })
       

        const isCollisionFixed = obstaclesFixedCollision.some (obstacle => {
                return this._police.otherCollision(obstacle)
            });
        const isCollisionRandom = obstaclesRandomCollision.some (obstacle => {
                return this._police.otherCollision(obstacle)
            });

        isCollisionFixed ? this._police.collisionObjectFloor = false : this._police.collisionObjectFloor = true
        

        const iscollisionUpperFixed = obstaclesFixedCollision.some (obstacle => {
            return this._police.collisionUpper (obstacle)
        });
        iscollisionUpperFixed ? this._police.collisionJumpUpper = true : this._police.collisionJumpUpper = false

        const iscollisionUpperRandom = obstaclesRandomCollision.some (obstacle => {
            return this._police.collisionUpper(obstacle)
        });

        const elementCollision = obstaclesFixedCollision.some(obstacle => {
            return this._police.collisionX(obstacle)
        })


      

        const newBgCollision = this._bg.x > 0
        
        const fixedJump = this._police.jumpstate && iscollisionUpperFixed && isCollisionFixed
        const randomJump = this._police.jumpstate && iscollisionUpperRandom && isCollisionRandom
        
        if (newBgCollision) {
            if (this._police.x < 15) {
                this._police.x -= this._police.vx
                this._police.y -= this._police.vy
            }
                this._bg.x -= this._bg.vx
                this._obstacles.forEach (obstacle => {
                    obstacle.x -= obstacle.vx
                })
                this.rewards.forEach (reward => {
                    reward.x -= reward.vx
                })
                this._bombs.forEach (bomb => {
                    bomb.x -= bomb.vx
                })
            
        }else if ((isCollisionFixed || isCollisionBackground || isCollisionRandom) && !this._police.jumpstate) {

                this._police.x -= this._police.vx
                this._police.y -= this._police.vy
                this._bg.x -= this._bg.vx
                this._obstacles.forEach (obstacle => {
                    obstacle.x -= obstacle.vx
                })
                this.rewards.forEach (reward => {
                    reward.x -= reward.vx
                })
                this._bombs.forEach (bomb => {
                    bomb.x -= bomb.vx
                })

               
             
        
        } else if (fixedJump) {
            
                if(elementCollision) {
                    this._police.x -= this._police.vx
                    this._police.y -= this._police.vy
                    this._police.vy -= this._police.g 
                    this._bg.x -= this._bg.vx
                    this._obstacles.forEach (obstacle => {
                    obstacle.x -= obstacle.vx
                    })
                    this.rewards.forEach (reward => {
                    reward.x -= reward.vx
                    })

                } else {
                    this._police.y -= this._police.vy
                    this._police.vy -= this._police.g 

                }               
        } else if(randomJump) {
            this._police.y -= this._police.vy
            this._police.vy -= this._police.g 

        }
        
        const finalBackground = this._bg.v + this._bg.x + this._ctx.canvas.width === this._bg.v * 0.9

        if(this.lastCollisionBackground && finalBackground){
            this._bg.x -= this._bg.vx
            this._obstacles.forEach (obstacle => {
                obstacle.x -= obstacle.vx
            })
            this.rewards.forEach (reward => {
                reward.x -= reward.vx
            })
        }


        const isCollisionBombs = this._bombs.some (bomb => {
            return this._police.otherCollision(bomb)
        });

        if(isCollisionBombs) this._police.life = 0
       this._bombs =  this._bombs.filter (bomb => !bomb.final())
      
        this.rewards.forEach (reward => {
            if (this._police.collisionRewards(reward)) {
                const resul = reward.sumRewards()
                if (!isNaN(resul)) {
                    this.score += resul
                } else if (resul === 'life') {
                    this._police.life = 100
                } else if (resul === 'final') {
                    this._stop()
                    this._score.final()
                    localStorage.setItem('score', this.score)
                }
                this.rewards = this.rewards.filter (rewardCollision => rewardCollision !== reward)
            }
        });

    }

    


    _shoot() {

        this._obstacles.forEach(obstacle => this._police.weapon.collide(obstacle))
        this._obstacles.forEach(obstacle => {
            this._terrorist.forEach(terrorist => terrorist.weapon.collide(obstacle))            
        })

    
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
                        this._police.animate()
                        this._police.vx = 0.5
                        this._police.cutY = 0
                        this._bg.vx = -2
                        this._obstacles.forEach (obstacle => {
                            obstacle.vx = -2
                        })
                        this.rewards.forEach (reward => {
                            reward.vx = -2
                        })
                        this._bombs.forEach (bomb => {
                            bomb.vx = -2
                        })
                        break;
                    case LEFT_BUTTON:
                        this._police.animate()
                        this._police.vx = -0.5
                        this._police.cutY = 1
                        this._bg.vx = 2
                        this._obstacles.forEach (obstacle => {
                            obstacle.vx = 2
                        })
                        this.rewards.forEach (reward => {
                            reward.vx = 2
                        })
                        this._bombs.forEach (bomb => {
                            bomb.vx = 2
                        })
                        break;
                    case UP_BUTTON:
                        this._police.animate()
                        this._police.vy = -1;
                        break;
                    case DOWN_BUTTON:
                        this._police.animate()
                        this._police.vy = 1;
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
                            this.rewards.forEach (reward => {
                                reward.vx = 0
                            })
                            this._bombs.forEach (bomb => {
                                bomb.vx = 0
                            })
                            break;
                        case LEFT_BUTTON:
                            this._police.vx = 0
                            this._bg.vx = 0
                            this._obstacles.forEach (obstacle => {
                                obstacle.vx = 0
                            })
                            this.rewards.forEach (reward => {
                                reward.vx = 0
                            })
                            this._bombs.forEach (bomb => {
                                bomb.vx = 0
                            })
                            break;
                        case UP_BUTTON:
                            this._police.vy = 0
                            break;
                        case DOWN_BUTTON:
                            this._police.vy = 0
                            break;
                    }
            })
    }


    _addterrorist() {
        this._terrorist = [ new Terrorist(
            this._ctx,
            this._ctx.canvas.width,
            this._ctx.canvas.height * 0.57,
            this._bg,
            1000
             ),
             new Terrorist(
                this._ctx,
                this._ctx.canvas.width + 500,
                this._ctx.canvas.height * 0.8,
                this._bg,
                1200
             )
        ]
            
    }





    _addObstacle(position = 0) {
        this._obstacles.push(new ObstaclesFixed (this._ctx, position + 0, 200, 20, 190))
        this._obstacles.push(new ObstaclesFixed (this._ctx, position + 100, 0, 190, 310))
        this._obstacles.push(new ObstaclesFixed (this._ctx, position + 190, 0, 300, 400))
        this._obstacles.push(new ObstaclesFixed (this._ctx, position + 490, 0, 140, 370))
        this._obstacles.push(new ObstaclesFixed (this._ctx, position + 620, 0, 180, 400)) 
        this._obstacles.push(new ObstaclesFixed (this._ctx, position + 1530, 320, 150, 50))
        this._obstacles.push(new ObstaclesFixed (this._ctx, position + 1608, 310, 180,70))
        this._obstacles.push(new ObstaclesFixed (this._ctx, position + 1685, 230, 220, 150))
        this._obstacles.push(new ObstaclesFixed (this._ctx, position + 1835, 200, 183, 190))
        this._obstacles.push(new ObstaclesRandom (this._ctx, position + 500, 400, 0))
        this._obstacles.push(new ObstaclesRandom (this._ctx, position + 900, 300, 1))
        this._obstacles.push(new ObstaclesRandom (this._ctx, position + 1100, 400, 0))
        this._obstacles.push(new ObstaclesRandom (this._ctx, position + 1800, 400, 2))
    }

    _addreward(position = 0) {
    
        if (this.levelsNumber === 1 || this.levelsNumber === 0) {
            let numberImg = 3
            for (let j = 0; j <= 600; j += 600) {
                for (let i = 0; i < 400; i += 200) {
                    this.rewards.push (new Rewards(this._ctx, position + j + i + 150, 420, numberImg))
                }
                numberImg++
            }
            numberImg = 0
            for (let i = 0; i < 600; i += 200) {
                this.rewards.push (new Rewards(this._ctx, position + i + 1250, 400, numberImg))
                numberImg++
                if (numberImg >= 3) numberImg = 0
            }
            for (let i = 0; i <= 300; i += 150) {
                this.rewards.push (new Rewards(this._ctx, position + i + 1150, 330, 3))
            }
            numberImg = 1
            this.rewards.push (new Rewards(this._ctx, position + 1620, 250, numberImg))
            
            for (let i = 0; i <= 100; i += 100) {
                this.rewards.push (new Rewards(this._ctx, position + i + 1700, 180, numberImg))    
            }
                    
            if(position != 0) {
                this.rewards.push (new Rewards(this._ctx, position + 1850, 105, 6, 100, 100))
                this.lastBg = true
            }else {
                this.rewards.push (new Rewards(this._ctx, position + 1850, 155, 5))
            } 

        } else {
            let numberImg = 3
            for (let j = 0; j <= 500; j += 500) {
                for (let i = 0; i < 300; i += 90) {
                    this.rewards.push (new Rewards(this._ctx, position + j + i + 150, 420, numberImg))
                }
                numberImg++
            }
            numberImg = 0
                for (let i = 0; i <= 600; i += 90) {
                    this.rewards.push (new Rewards(this._ctx, position + i + 1250, 400, numberImg))
                    numberImg++
                    if (numberImg >= 3) numberImg = 0
                }
                for (let i = 0; i < 400; i += 100) {
                    this.rewards.push (new Rewards(this._ctx, position + i + 1150, 330, 3))
                }
            numberImg = 1
                this.rewards.push (new Rewards(this._ctx, position + 1620, 250, numberImg))
                this.rewards.push (new Rewards(this._ctx, position + 1670, 215, numberImg))
                this.rewards.push (new Rewards(this._ctx, position + 1710, 190, numberImg))
                
                for (let i = 0; i < 100; i += 50) {
                    this.rewards.push (new Rewards(this._ctx, position + i + 1750, 180, numberImg))    
                }
                        
                if(position != 0) {
                    this.rewards.push (new Rewards(this._ctx, position + 1850, 105, 6, 100, 100))
                    this.lastBg = true
                }else {
                    this.rewards.push (new Rewards(this._ctx, position + 1850, 155, 5))
                } 
        }  
    }

    _createbombs() {
        this._bombs.push(new Bomb (this._ctx, this._numberRandom(), this._bg))
    }

    _numberRandom() {
        return Math.floor(Math.random() * (this._ctx.canvas.width - 20) + 20)
    }

    bombs() {
       
        setInterval(() => {
            this._createbombs()
        }, this.intervalBoomTime);
    }
}