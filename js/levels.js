class Levels {
    constructor(game) {
        this._game = game
        
    }

    secondLevel(){
        this._game.bombs()
        this._game._police.damage = 30
        this._game._terrorist.forEach(terrorist => {
            terrorist.damage = 30
        });
    }

    thirdLevel() {
        this._game.intervalBoomTime = 1000
        this._game.bombs()
        this._game._police.damage = 50
        this._game._terrorist.forEach(terrorist => {
            terrorist.damage = 50
        });
        this._game._bombs.forEach(bombs => {
            bombs.vy = 3
        })
    }
}