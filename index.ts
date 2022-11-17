import Game from './entities/Game.js';

type event = MouseEvent | null

document.addEventListener('click', (event: event) => {
    const button = event?.target as HTMLButtonElement;
    if(button.id === "btn-start") {
        button.remove();
        new Game() 
    } 

    if(button.id === "btn-playagain") {
        button.remove();
        document.querySelector('p')?.remove()
        new Game()
    }
})

