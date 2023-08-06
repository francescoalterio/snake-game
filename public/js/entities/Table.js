import { getBox } from "../utils/getBox.js";
export default class Table {
    constructor(size) {
        var _a, _b;
        this.size = size;
        const $pCounter = document.createElement('p');
        $pCounter.textContent = 'Points: ';
        const $spanCounter = document.createElement('span');
        $spanCounter.textContent = '0';
        $spanCounter.id = 'counter';
        $pCounter.appendChild($spanCounter);
        (_a = document.querySelector(".game")) === null || _a === void 0 ? void 0 : _a.appendChild($pCounter);
        let row = 1;
        let column = 10;
        const $table = document.createElement('div');
        $table.classList.add('table');
        $table.style.width = `${size * 40}px`;
        for (let i = 0; i < size * size; i++) {
            const $box = document.createElement('div');
            $box.id = `row-${row}/column-${column}`;
            $box.classList.add('box');
            $table.appendChild($box);
            if (column === 1) {
                row += 1;
                column = 10;
            }
            else {
                column--;
            }
        }
        (_b = document.querySelector(".game")) === null || _b === void 0 ? void 0 : _b.appendChild($table);
    }
    clearTable() {
        let row = 1;
        let column = 10;
        for (let i = 0; i < this.size * this.size; i++) {
            const $box = getBox({ row, column });
            $box.style.background = "none";
            if (column === 1) {
                row += 1;
                column = 10;
            }
            else {
                column--;
            }
        }
    }
}
