import { getBox } from "../utils/getBox.js";

export interface ITable {
    size: number;
    clearTable(): void; 
}

export default class Table implements ITable {
    size: number;

    constructor(size: number) {
        this.size = size;

        let row = 1;
        let column = 10;

        const $table = document.createElement('div');
        $table.classList.add('table');
        $table.style.width = `${size * 50}px`

        for(let i = 0; i < size * size; i++) {
            const $box = document.createElement('div');
            $box.id = `row-${row}/column-${column}`;
            $box.classList.add('box');
            $table.appendChild($box);
            if(column === 1) {
                row += 1;
                column = 10;
            } else {
                column--
            }
        }

        document.querySelector(".game")?.appendChild($table)
    }

    public clearTable() {
        let row = 1;
        let column = 10;
        for(let i = 0; i < this.size * this.size; i++) {
            const $box = getBox(row, column) as HTMLDivElement;
            $box.style.background = "none";
            if(column === 1) {
                row += 1;
                column = 10;
            } else {
                column--
            }
        }
    }
}