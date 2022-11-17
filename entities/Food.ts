import { Position } from '../types/index.js';
import { getBox } from "../utils/getBox.js";

export interface IFood {
    position: Position;
    spawn(): void;
    newPosition(snakeBody:Position[], tableSize: number): void;
}

export default class Food implements IFood {
    position: Position;

    constructor() {
        this.position = { row: 3, column: 8 };
    }

    spawn() {
        const $foodBox = getBox(this.position) as HTMLDivElement;
        $foodBox.style.backgroundColor = "red"
    }

    newPosition(snakeBody:Position[], tableSize: number) {
        let row = 1;
        let column = 10;
        const allBoxs: Position[] = []

        for(let i = 0; i < tableSize * tableSize; i++) {
            allBoxs.push({ row, column })
            if(column === 1) {
                row += 1;
                column = 10;
            } else {
                column--
            }
        }

        const removeBodySnake = allBoxs.filter(x => {
            const findSnakeBody = snakeBody.find(y => y.row === x.row && y.column === x.column);
            return !findSnakeBody
        })

        const randomPosition = removeBodySnake[Math.floor(Math.random() * removeBodySnake.length)]
        this.position = randomPosition;
        this.spawn;
    }
}