class Game {
    constructor (ctx) {
        this._ctx = ctx
        this._idInterval = null
        this._bg = new BackgroundGame (ctx)
        this._police = new Police (ctx)
        this.frameNumber = 0
        this.tick = 0
        this._obstacles = []
        this._speed = 0
        this._obstacles.push(new Obstacles (this._ctx, 150, 0, 300, 400))

    }

    start() {
        this._idInterval = setInterval(() => {
            this._clear()
            this._draw()
            this._move()
            // this._addObstacle()
            this._collision()

        }, 1000/60);
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
    }

    _move() {
        this._bg.move()
        this._police.move()
        this._obstacles.forEach(obstacle => {
            obstacle.move()
        })
    }

    // _addObstacle() {
    //     if (this.tick++ % 200){

    //     }
    // }

    _collision() {
        
       
        this._obstacles.forEach(obstacle => {
            const colX = obstacle.x < this._police.x + this._police.width && obstacle.w + obstacle.x > this._police.x
            const colY = obstacle.h + obstacle.y > this._police.y + (this._police.height * 0.85) && obstacle.y < this._police.y + this._police.height
            if(colX && colY) {
                
            
                    //Invest value for control all posibilities
               if((obstacle.x + obstacle.w) * 0.90 < this._police.x) {
                   
                this._police.x = obstacle.w + obstacle.x
                //     this._bg.x = 0
               } else if (obstacle.x + obstacle.w * 0.10 > this._police.x + this._police.width) {
                    console.log('no')
                    this._police.x = obstacle.x - this._police.width
                    this._bg.x = 0
                    obstacle.x = obstacle.top
               } else if (obstacle.y + obstacle.h > this._police.y + (this._police.height * 0.85)) {
                    this._police.y = obstacle.h + obstacle.y - (this._police.height * 0.85)
               } else if (obstacle.y > this._police.y ) {
                    this._police.y = obstacle.y - this._police.height
               }
            }


        });

    }







}