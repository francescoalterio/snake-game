export function getBox(row: number, column: number): HTMLElement | null {
    return document.getElementById(`row-${row}/column-${column}`)
}