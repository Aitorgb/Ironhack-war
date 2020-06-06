class Game {
    constructor (ctx) {
        this._ctx = ctx
        this._idInterval = null
        this._bg = new BackgroundGame (ctx)
        this._police = new Police (ctx)
        this.frameNumber = 0
        this.tick = 0
        this._obstacles = []
        this._terrorist = []
        this._speed = 0
        //this._addObstacleFixed()
        this.oneObstacle = true;
        this._setListener()
        this._addterrorist()


    }

    start() {
        this._idInterval = setInterval(() => {
            this._clear()
            this._draw()
            this._move()
           // this._addObstacleRandom()
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
        this.frameNumber += 1
        this._bg.draw()
        this._police.draw()
        this._obstacles.forEach(obstacle => {
            obstacle.draw()
        })
        this._terrorist.forEach(terrorist => {
            terrorist.draw()
        })
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
    }

    _addObstacleFixed() {
        this._obstacles = [
            new ObstaclesFixed (this._ctx, 0, 200, 20, 190),
            new ObstaclesFixed (this._ctx, 20, 210, 190, 110),
            new ObstaclesFixed (this._ctx, 190, 0, 300, 400),
            new ObstaclesFixed (this._ctx, 490, 0, 140, 370),
            new ObstaclesFixed (this._ctx, 620, 0, 180, 400),
            new ObstaclesFixed (this._ctx, 1600, 310, 70,70),
            new ObstaclesFixed (this._ctx, 1560, 320, 50, 50),
            new ObstaclesFixed (this._ctx, 1670, 230, 200, 150),
            new ObstaclesFixed (this._ctx, 1800, 200, 210, 190),
            new ObstaclesFixed (this._ctx, 2000, 200, 20, 190),
            new ObstaclesFixed (this._ctx, 2020, 210, 190, 110),
            new ObstaclesFixed (this._ctx, 2200, 0, 300, 400),
            new ObstaclesFixed (this._ctx, 2450, 0, 170, 370),
            new ObstaclesFixed (this._ctx, 2620, 0, 180, 400)
        ]
        
    }


    createObstacles() {
        if (this._bg.x === 0) {
            this._addObstacleFixed()
        }
    }

    _collision() {
        console.log(this._bg.x);
        
        const isCollision = this._obstacles.some (obstacle => {
            return this._police.otherCollision(obstacle)
        });
            if (isCollision) {
                this._police.x -= this._police.vx
                this._police.y -= this._police.vy
                this._bg.x -= this._bg.vx
                this._obstacles.forEach (obstacle => {
                    obstacle.x -= obstacle.vx
                })
            }
            console.log(this._obstacles);


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
            if (terrorist.x - this._police.x <= 500 && terrorist.y - this._police.y <= 50) {
              // terrorist.weapon.shoot()
            }


        })



    }

    _numberRandom() {
        const max = this._ctx.canvas.height * 0.8
        const min = this._ctx.canvas.height * 0.50
        return Math.floor(Math.random() * (max - min) + min)

    }



    _setListener() {
            document.addEventListener('keydown', event => {
                switch(event.keyCode) {
                    case RIGHT_BUTTON:
                        this._police.vx = 2
                        this._police.cutY = 0
                        this._bg.vx = -2
                        this._obstacles.forEach (obstacle => {
                            obstacle.vx = -2
                        })
                        break;
                    case LEFT_BUTTON:
                        this._police.vx = -2
                        this._police.cutY = 2
                        this._bg.vx = 2
                        this._obstacles.forEach (obstacle => {
                            obstacle.vx = 2
                        })
                        break;
                    case UP_BUTTON:
                        this._police.vy = -1;
                        break;
                    case DOWN_BUTTON:
                        this._police.vy = 1;
                        break;
                    case SPACE:
                        this._police.jump()
                        break;
                    case M_BUTTON:
                        this._police.weapon.shoot()
                }
                if (event.keyCode !== M_BUTTON) {
                    this._police.animate()
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
                            break;
                        case LEFT_BUTTON:
                            this._police.vx = 0
                            this._bg.vx = 0
                            this._obstacles.forEach (obstacle => {
                                obstacle.vx = 0
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







}