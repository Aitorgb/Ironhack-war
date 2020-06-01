window.onload = () => {
    const buttonPlay = document.getElementById('play-button')
    const buttonSetting = document.getElementById('setting-button')
    const canvas = document.getElementById('canvas')
    const menu = document.getElementById('menu')

    buttonPlay.addEventListener('click', () => {
        menu.style.display = 'none'
        canvas.style.display = 'inline'
        const ctx = document.getElementById('canvas').getContext('2d')
        const game = new Game(ctx)
        game.start()
    })
    
    buttonSetting.addEventListener('click', () => {
        
    })



}


