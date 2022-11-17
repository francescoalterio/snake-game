import { Position } from "../types/index.js";

export function getBox({ row, column }: Position): HTMLElement | null {
    return document.getElementById(`row-${row}/column-${column}`)
}