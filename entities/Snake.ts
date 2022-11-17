import { getBox } from "../utils/getBox.js";

interface Position { row: number; column: number }

type Direction = "right" | "left" | "up" | "down"

export interface ISnake {
    headPosition: Position;
    size: number;
    lastMovements: Position[];
    direction: Direction;
    spawn(): void 
    move(): void
    changeDirection(direction: Direction): void
}

export default class Snake implements ISnake {
    headPosition: Position;
    size: number = 1;
    lastMovements: Position[];;
    direction: Direction = 'right';

    constructor(headPosition: Position) {
        this.headPosition = headPosition;
        this.lastMovements = [{ row: headPosition.row, column: headPosition.column - 1}]
        this.spawn()
    }

    public spawn() {
        const $box = getBox(this.headPosition.row, this.headPosition.column) as HTMLDivElement;
        $box.style.backgroundColor = "#145c00";
        for(let i = 0; i < this.lastMovements.length; i++) {
            const bodyRow = this.lastMovements[i].row;
            const bodyColumn = this.lastMovements[i].column;
            const $bodyBox = getBox(bodyRow, bodyColumn) as HTMLDivElement;
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
        this.lastMovements[0] = this.headPosition
        this.headPosition = directionAction[this.direction]
        console.log(this.headPosition);
    }

    public changeDirection(direction: Direction) {
        if(direction !== this.direction) this.direction = direction
    }
}