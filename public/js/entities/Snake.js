import { getBox } from "../utils/getBox.js";
export default class Snake {
    constructor(headPosition) {
        this.size = 1;
        this.direction = 'right';
        this.headPosition = headPosition;
        this.lastMovements = [{ row: headPosition.row, column: headPosition.column - 1 }];
        this.lastBodyBoxPosition = { row: headPosition.row, column: headPosition.column - 2 };
        this.spawn();
    }
    ;
    spawn() {
        const $box = getBox(this.headPosition);
        $box.style.backgroundColor = "#145c00";
        for (let i = 0; i < this.lastMovements.length; i++) {
            const bodyRow = this.lastMovements[i].row;
            const bodyColumn = this.lastMovements[i].column;
            const $bodyBox = getBox({ row: bodyRow, column: bodyColumn });
            $bodyBox.style.backgroundColor = "green";
        }
    }
    move() {
        const directionAction = {
            "right": Object.assign(Object.assign({}, this.headPosition), { column: this.headPosition.column + 1 }),
            "left": Object.assign(Object.assign({}, this.headPosition), { column: this.headPosition.column - 1 }),
            "up": Object.assign(Object.assign({}, this.headPosition), { row: this.headPosition.row - 1 }),
            "down": Object.assign(Object.assign({}, this.headPosition), { row: this.headPosition.row + 1 })
        };
        const lastMovementsCopy = [...this.lastMovements];
        const lastBodyBox = this.lastMovements[this.lastMovements.length - 1];
        this.lastBodyBoxPosition = lastBodyBox;
        for (let i = 1; i < lastMovementsCopy.length; i++) {
            lastMovementsCopy[i] = this.lastMovements[i - 1];
        }
        lastMovementsCopy[0] = this.headPosition;
        this.lastMovements = lastMovementsCopy;
        this.headPosition = directionAction[this.direction];
        console.log(this.headPosition);
    }
    changeDirection(direction) {
        if (direction !== this.direction)
            this.direction = direction;
    }
    eat() {
        this.lastMovements.push(this.lastBodyBoxPosition);
    }
}
