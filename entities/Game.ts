import Table, { ITable } from './Table.js';
import Snake, { ISnake } from './Snake.js';


interface IGame {
    Table: ITable;
    Snake: ISnake;
    gameInterval: number;
}

export default class Game implements IGame {
    Table: ITable; 
    Snake: ISnake;
    gameInterval: number;

    constructor() {
        this.Table = new Table(10);
        this.Snake = new Snake({ row: 6, column: 3 })
        this.gameInterval = setInterval(this.bodyGameInterval.bind(this), 1000)
        document.addEventListener("keypress", this.startListenersWASD.bind(this))
    }

    private bodyGameInterval() {
        if(!this.gameOver()) {
            this.Table.clearTable()
            this.Snake.move()
            this.Snake.spawn()
            console.log("Frame");
        }
    }

    private gameOver() {
        const condition = this.Snake.headPosition.column === this.Table.size + 1 || this.Snake.headPosition.row === this.Table.size + 1 || this.Snake.headPosition.column === 0 || this.Snake.headPosition.row === 0
        if(condition) {
            clearInterval(this.gameInterval)
        } 

        return condition
    }

    private startListenersWASD(e: KeyboardEvent) {
        if(e.key === 'w') this.Snake.changeDirection("up")
        else if(e.key === 'a') this.Snake.changeDirection("left")
        else if(e.key === 's') this.Snake.changeDirection("down")
        else if(e.key === 'd') this.Snake.changeDirection("right")
    }

}