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
    size: number = 0;
    lastMovements: Position[] = [];
    direction: Direction = 'right';

    constructor(headPosition: Position) {
        this.headPosition = headPosition;
        this.spawn()
    }

    public spawn() {
        const $box = document.getElementById(`row-${this.headPosition.row}/column-${this.headPosition.column}`) as HTMLDivElement;
        $box.style.backgroundColor = "green";
    }

    public move() {
        const directionAction = {
            "right": { ...this.headPosition, column: this.headPosition.column + 1 },
            "left": { ...this.headPosition, column: this.headPosition.column - 1 },
            "up": { ...this.headPosition, row: this.headPosition.row - 1 },
            "down": { ...this.headPosition , row: this.headPosition.row + 1}
        }
        this.headPosition = directionAction[this.direction]
        console.log(this.headPosition);
    }

    public changeDirection(direction: Direction) {
        if(direction !== this.direction) this.direction = direction
    }
}