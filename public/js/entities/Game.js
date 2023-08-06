import Table from './Table.js';
import Snake from './Snake.js';
import Food from './Food.js';
export default class Game {
    constructor() {
        this.points = 0;
        this.Table = new Table(10);
        this.Snake = new Snake({ row: 6, column: 3 });
        this.Food = new Food();
        this.gameInterval = setInterval(this.bodyGameInterval.bind(this), 1000);
        document.addEventListener("keypress", this.startListenersWASD.bind(this));
    }
    bodyGameInterval() {
        if (!this.gameOver()) {
            this.Table.clearTable();
            this.Snake.move();
            this.Food.spawn();
            this.Snake.spawn();
            if (this.Snake.headPosition.row === this.Food.position.row && this.Snake.headPosition.column === this.Food.position.column) {
                this.Snake.eat();
                this.addPoint();
                this.Food.newPosition([this.Snake.headPosition, ...this.Snake.lastMovements], this.Table.size);
            }
            console.log("Frame");
        }
    }
    gameOver() {
        var _a, _b;
        const condition = this.Snake.headPosition.column === this.Table.size + 1 || this.Snake.headPosition.row === this.Table.size + 1 || this.Snake.headPosition.column === 0 || this.Snake.headPosition.row === 0;
        const bumpIntoMyselfCondition = this.Snake.lastMovements.find(x => x.row === this.Snake.headPosition.row && x.column === this.Snake.headPosition.column);
        if (condition || bumpIntoMyselfCondition) {
            clearInterval(this.gameInterval);
            (_a = document.querySelector('.table')) === null || _a === void 0 ? void 0 : _a.remove();
            const $btnPlayAgain = document.createElement('button');
            $btnPlayAgain.textContent = 'Play Again';
            $btnPlayAgain.id = 'btn-playagain';
            $btnPlayAgain.classList.add('btn');
            (_b = document.querySelector(".game")) === null || _b === void 0 ? void 0 : _b.appendChild($btnPlayAgain);
        }
        return condition || bumpIntoMyselfCondition;
    }
    startListenersWASD(e) {
        if (e.key === 'w' && this.Snake.direction !== "down")
            this.Snake.changeDirection("up");
        else if (e.key === 'a' && this.Snake.direction !== "right")
            this.Snake.changeDirection("left");
        else if (e.key === 's' && this.Snake.direction !== "up")
            this.Snake.changeDirection("down");
        else if (e.key === 'd' && this.Snake.direction !== "left")
            this.Snake.changeDirection("right");
    }
    addPoint() {
        this.points++;
        const $spanPoints = document.getElementById("counter");
        $spanPoints.textContent = `${this.points}`;
    }
}
