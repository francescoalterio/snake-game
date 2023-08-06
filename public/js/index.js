import Game from './entities/Game.js';
document.addEventListener('click', (event) => {
    var _a;
    const button = event === null || event === void 0 ? void 0 : event.target;
    if (button.id === "btn-start") {
        button.remove();
        new Game();
    }
    if (button.id === "btn-playagain") {
        button.remove();
        (_a = document.querySelector('p')) === null || _a === void 0 ? void 0 : _a.remove();
        new Game();
    }
});
