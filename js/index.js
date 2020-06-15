window.onload = () => {
    const buttonPlay = document.getElementById('play-button')
    const buttonSetting = document.getElementById('setting-button')
    const buttonRetry = document.getElementById('retry-button')
    const canvas = document.getElementById('canvas')
    const menu = document.getElementById('menu-start')
    const menuFinal = document.getElementById('menu-final')
    const menuVictory = document.getElementById('victory')
    const mainButtons =  [...document.querySelectorAll('.menu-button')]
    const ctx = canvas.getContext('2d')
    const loadingBar = document.getElementById('loading-bar')
    const loading = document.getElementById('loading') 
    const backButton = document.getElementById('back-button')
    const howToPlay = document.getElementById('how-to-play')
    const howToPlayButton = document.getElementById('setting-button')
    const optionsMenu = document.getElementById('options')
    const levelsMenu = document.getElementById('levels-menu')
    const levelButton = document.getElementById('level-button')
    const levelButtons = [...document.querySelectorAll('#levels-menu > button')]
    const nextLevelButton = document.getElementById('next-level')
    const audioButton = new Audio()
    audioButton.src = './sound/boton.mp3'


    function levelsButttonGame (button) {
        const numberlevel = button.getAttribute('id')
        let newGame
      
        switch (numberlevel) {
            case 'level-one':
                newGame = new Game(ctx)
                localStorage.setItem('level', 1)
                break;
            case 'level-two':
                newGame = new Game(ctx, 2)
                localStorage.setItem('level', 2)
                break;
            case 'level-three':
                newGame = new Game(ctx, 3)
                localStorage.setItem('level', 3)
                break;
        }
        newGame.start()
        optionsMenu.classList.add('no-visible')
        optionsMenu.classList.remove('visible')
        levelsMenu.classList.add('no-visible')
        levelsMenu.classList.remove('visible')
        loadingScreen()
        audioButton.load()
        audioButton.play()
    }

    

    function loadingScreen() {
        loading.classList.remove('no-visible')
        loading.classList.add('visible')
        let load = 0

        const loadingIntervalId = setInterval(() => {
            loadingBar.setAttribute('value', load)
            load++
        }, 25);
        
       setTimeout(() => {
            clearInterval(loadingIntervalId)
            loading.classList.remove('visible')
            loading.classList.add('no-visible')
            canvas.classList.remove('no-visible')
            canvas.classList.add('visible')
        }, 3000);
    }
  

    buttonPlay.addEventListener('click', () => {
        menuFinal.classList.remove('visible')
        menuFinal.classList.add('no-visible')
        menu.classList.remove('visible')
        menu.classList.add('no-visible')
        const game = new Game(ctx)
        game.start()
        localStorage.setItem('level', 1)
        loadingScreen()
        audioButton.load()
        audioButton.play()
        
    })
    
    howToPlayButton.addEventListener('click', () => {
        menu.classList.remove('visible')
        menu.classList.add('no-visible')
        optionsMenu.classList.add('visible')
        optionsMenu.classList.remove('no-visible')
        howToPlay.classList.add('visible')
        howToPlay.classList.remove('no-visible')
        audioButton.load()
        audioButton.play()

    })

    levelButton.addEventListener('click', () => {
        menu.classList.remove('visible')
        menu.classList.add('no-visible')
        optionsMenu.classList.add('visible')
        optionsMenu.classList.remove('no-visible')
        levelsMenu.classList.add('visible')
        levelsMenu.classList.remove('no-visible')
        audioButton.load()
        audioButton.play()

    })

    buttonRetry.addEventListener('click', () => {
        audioButton.load()
        audioButton.play()
       const level =  localStorage.getItem('level')
        let newGame
        switch (level) {
            case '1':
                newGame = new Game(ctx)
                localStorage.setItem('level', 1)
                break;
            case '2':
                newGame = new Game(ctx, 2)
                localStorage.setItem('level', 2)
                localStorage.setItem('levelGame', 2)
                break;
            case '3':
                newGame = new Game(ctx, 3)
                localStorage.setItem('level', 3)
                localStorage.setItem('levelGame', 3)
                break;
        }

        newGame.start()
        menuFinal.classList.add('no-visible')
        menuFinal.classList.remove('visible')
        loadingScreen()
        
    })

    nextLevelButton.addEventListener('click', () => {
        audioButton.load()
        audioButton.play()
        const level =  localStorage.getItem('level')
        const score = parseInt(localStorage.getItem('score'))
         let newGame

        if (level !== null) {
            switch (level) {
                case '1':
                    newGame = new Game(ctx, 2, score)
                    localStorage.setItem('level', 2)
                    break;
                case '2':
                    newGame = new Game(ctx, 3, score)
                    localStorage.setItem('level', 3)
                    break;
            }
        } else {
            newGame = new Game(ctx)
            localStorage.setItem('level', 1)
        }
         newGame.start()
         menuVictory.classList.add('no-visible')
         menuVictory.classList.remove('visible')
         loadingScreen()
     })




     mainButtons.forEach (button => {
         button.addEventListener('click', () => {
            menu.classList.remove('no-visible')
            menu.classList.add('visible')
            menuVictory.classList.remove('visible')
            menuVictory.classList.add('no-visible')
            menuFinal.classList.remove('visible')
            menuFinal.classList.add('no-visible')
            audioButton.load()
            audioButton.play()
         })
     })
     
     

    backButton.addEventListener('click', () => {
        menu.classList.remove('no-visible')
        menu.classList.add('visible')
        optionsMenu.classList.add('no-visible')
        optionsMenu.classList.remove('visible')
        howToPlay.classList.add('no-visible')
        howToPlay.classList.remove('visible')
        levelsMenu.classList.add('no-visible')
        levelsMenu.classList.remove('visible')
        audioButton.load()
        audioButton.play()
    })

    levelButtons.forEach (button => button.addEventListener('click', () => levelsButttonGame(button)))


   

}


