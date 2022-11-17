import Table, { ITable } from './Table.js';
import Snake, { ISnake } from './Snake.js';
import Food, { IFood } from './Food.js';


interface IGame {
    Table: ITable;
    Snake: ISnake;
    Food: IFood;
    gameInterval: number;
    points: number;
}

export default class Game implements IGame {
    Table: ITable; 
    Snake: ISnake;
    Food: IFood;
    gameInterval: number;
    points: number = 0;

    constructor() {
        this.Table = new Table(10);
        this.Snake = new Snake({ row: 6, column: 3 })
        this.Food = new Food();
        this.gameInterval = setInterval(this.bodyGameInterval.bind(this), 1000)
        document.addEventListener("keypress", this.startListenersWASD.bind(this))
    }

    private bodyGameInterval() {
        if(!this.gameOver()) {
            this.Table.clearTable()
            this.Snake.move()
            this.Food.spawn()
            this.Snake.spawn()
            if(this.Snake.headPosition.row === this.Food.position.row && this.Snake.headPosition.column === this.Food.position.column) {
                this.Snake.eat()
                this.addPoint()
                this.Food.newPosition([this.Snake.headPosition, ...this.Snake.lastMovements], this.Table.size)
            }
            console.log("Frame"); 
        }
    }

    private gameOver() {
        const condition = this.Snake.headPosition.column === this.Table.size + 1 || this.Snake.headPosition.row === this.Table.size + 1 || this.Snake.headPosition.column === 0 || this.Snake.headPosition.row === 0
        const bumpIntoMyselfCondition = this.Snake.lastMovements.find(x => x.row === this.Snake.headPosition.row && x.column === this.Snake.headPosition.column)
        if(condition || bumpIntoMyselfCondition) {
            clearInterval(this.gameInterval)
            document.querySelector('.table')?.remove()
            const $btnPlayAgain = document.createElement('button');
            $btnPlayAgain.textContent = 'Play Again';
            $btnPlayAgain.id = 'btn-playagain';
            $btnPlayAgain.classList.add('btn')
            document.querySelector(".game")?.appendChild($btnPlayAgain)
        } 

        return condition || bumpIntoMyselfCondition
    }

    private startListenersWASD(e: KeyboardEvent) {
        if(e.key === 'w' && this.Snake.direction !== "down") this.Snake.changeDirection("up")
        else if(e.key === 'a' && this.Snake.direction !== "right") this.Snake.changeDirection("left")
        else if(e.key === 's' && this.Snake.direction !== "up") this.Snake.changeDirection("down")
        else if(e.key === 'd' && this.Snake.direction !== "left") this.Snake.changeDirection("right")
    }

    private addPoint() {
        this.points++;
        const $spanPoints = document.getElementById("counter") as HTMLSpanElement;
        $spanPoints.textContent = `${this.points}`
    }

}