class Obstacles {
    constructor(ctx, x, y, w, h) {
        this._ctx = ctx
        // this._img = new Image()
        // this._img.src = //meter imagen
        

        // this.x = this.numberRandomX()
        // this.y = this.numberRandomY()

        // this.w =
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.top = x
        this.vx = 0
        this.vy = 0
        this._setListener()
    }



    draw() {
        // this._ctx.fillRect (
        //     this.x,
        //     this.y,
        //     this.w,
        //     this.h
        // )
    }


    move() {
        this.x += this.vx
        if (this.x > this.top) {
            this.x = this.top
        }
    }

    _numberRandomX() {
        return Math.floor(Math.random() * this._ctx.canvas.height * 0.61)
    }

    _setListener() {
        document.addEventListener('keydown', event => {
        switch(event.keyCode) {
            case RIGHT_BUTTON:
                this.vx = -1
                break;
            case LEFT_BUTTON:
                this.vx = 1
                break;
            
        }
    })

    document.addEventListener('keyup', event => {
        switch(event.keyCode) {
            case RIGHT_BUTTON:
                this.vx = 0;
                break;
            case LEFT_BUTTON:
                this.vx = 0;
                break;
        }
    })
}


}