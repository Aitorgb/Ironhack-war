window.onload = () => {
    const buttonPlay = document.getElementById('play-button')
    const buttonSetting = document.getElementById('setting-button')
    const buttonRetry = document.getElementById('retry-button')
    const canvas = document.getElementById('canvas')
    const menu = document.getElementById('menu-start')
    const menuFinal = document.getElementById('menu-final')
    const menuVictory = document.getElementById('victory')
    const mainButton =  document.getElementById('menu-button')
    const ctx = canvas.getContext('2d')
    const loadingBar = document.getElementById('loading-bar')
    const loading = document.getElementById('loading')

    buttonPlay.addEventListener('click', () => {
        menuFinal.className = 'no-visible'
        menu.className = 'no-visible'
        loading.className = 'visible'
        const game = new Game(ctx)
        game.start()
        let load = 0
        

        const loadingIntervalId = setInterval(() => {
            loadingBar.setAttribute('value', load)
            load++
        }, 10);
        
       setTimeout(() => {
            clearInterval(loadingIntervalId)
            loading.className = 'no-visible'
            canvas.className = 'inline'
        }, 1500);
        
    })
    
    buttonSetting.addEventListener('click', () => {
        
    })

    buttonRetry.addEventListener('click', () => {
        buttonPlay.click()
        
    })

    mainButton.addEventListener('click', () => {
        menuFinal.className = 'no-visible'
        menu.className = 'visible'
        canvas.className = 'no-visible'
    })


}


