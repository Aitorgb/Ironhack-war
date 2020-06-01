class BackgroundGame {
    constructor (ctx) {
        this._ctx = ctx

        this.x = 0
        this.y = 0
        this.v = this._ctx.canvas.width + 1000
        this.h = this._ctx.canvas.height
        this._img = new Image()
        this._img.src = './images/City-sin-obstacles.png'

        this.vx = 0
        this.vy = 0

        this.vgx = 0

        this._setListener()

    }

    draw() {
        //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        this._ctx.drawImage(
            this._img,
            this.x,
            this.y,
            this.v,
            this.h
        )
        this._ctx.drawImage(
            this._img,
            this.x + this.v,
            this.y,
            this.v,
            this.h
        )


    }

    move() {
        this.x += this.vx
        if (this.x + this.v <= 0) {
             this.x = 0
        }else if (this.x > 0){
            this.x = 0
        }
        
    }


        _setListener() {
            document.addEventListener('keydown', event => {
             switch(event.keyCode) {
                 case RIGHT_BUTTON:
                     this.vx += -1
                     break;
                 case LEFT_BUTTON:
                     this.vx += 1
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