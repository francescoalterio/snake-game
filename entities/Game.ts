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
        const condition = this.Snake.headPosition.column === this.Table.size + 1 || this.Snake.headPosition.row === this.Table.size + 1
        if(condition) {
            clearInterval(this.gameInterval)
        } 

        return condition
    }

   


}