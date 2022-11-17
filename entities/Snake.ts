import { getBox } from "../utils/getBox.js";
import { Position } from '../types/index.js';

type Direction = "right" | "left" | "up" | "down"

export interface ISnake {
    headPosition: Position;
    size: number;
    lastMovements: Position[];
    direction: Direction;
    lastBodyBoxPosition: Position;
    spawn(): void 
    move(): void
    changeDirection(direction: Direction): void
    eat(): void
}

export default class Snake implements ISnake {
    headPosition: Position;
    size: number = 1;
    lastMovements: Position[];;
    direction: Direction = 'right';
    lastBodyBoxPosition: Position;

    constructor(headPosition: Position) {
        this.headPosition = headPosition;
        this.lastMovements = [{ row: headPosition.row, column: headPosition.column - 1}]
        this.lastBodyBoxPosition = { row: headPosition.row, column: headPosition.column - 2}
        this.spawn()
    }

    public spawn() {
        const $box = getBox(this.headPosition) as HTMLDivElement;
        $box.style.backgroundColor = "#145c00";
        for(let i = 0; i < this.lastMovements.length; i++) {
            const bodyRow = this.lastMovements[i].row;
            const bodyColumn = this.lastMovements[i].column;
            const $bodyBox = getBox({row: bodyRow, column: bodyColumn}) as HTMLDivElement;
            $bodyBox.style.backgroundColor = "green";
        }
    }

    public move() {
        const directionAction = {
            "right": { ...this.headPosition, column: this.headPosition.column + 1 },
            "left": { ...this.headPosition, column: this.headPosition.column - 1 },
            "up": { ...this.headPosition, row: this.headPosition.row - 1 },
            "down": { ...this.headPosition , row: this.headPosition.row + 1}
        }
        const lastMovementsCopy = [...this.lastMovements]
        const lastBodyBox = this.lastMovements[this.lastMovements.length - 1]
        this.lastBodyBoxPosition = lastBodyBox;
        for(let i = 1; i < lastMovementsCopy.length; i++) {
            lastMovementsCopy[i] = this.lastMovements[i - 1];
        }
        lastMovementsCopy[0] = this.headPosition
        this.lastMovements = lastMovementsCopy;
        this.headPosition = directionAction[this.direction]
        console.log(this.headPosition);
    }

    public changeDirection(direction: Direction) {
        if(direction !== this.direction) this.direction = direction
    }

    public eat() {
        this.lastMovements.push(this.lastBodyBoxPosition)
    }
}