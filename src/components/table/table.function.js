export function shutResize(event) {
  return event.target.dataset.resize
}

export function shutRowcell(event) {
  return event.target.dataset.rowcell
}

export function matrix($target, $current) {
  const target = $target.id(true)
  const current = $current.id(true)

  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)

  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, [])
}


const range = (start, end) => {
  if (start > end) {
    [start, end] = [end, start]
  }
  return new Array(end - start + 1)
      .fill('')
      .map((_, index) => start + index)
}

// Keyboard navigation
export const matrixCell = (key, row, col, maxColumns, maxRows) => {
  switch (key) {
    case 'ArrowRight':
    case 'Tab':
    col == maxColumns ? col = maxColumns : col++
      break
    case 'ArrowDown':
    case 'Enter':
      row == maxRows? row = maxRows: row++
      break
    case 'ArrowLeft':
      col == 0 ? col = 0 : col--
      break
    case 'ArrowUp':
      row == 0? row = 0 : row--
      break
  }
  return `[data-rowcell="${row}:${col}"]`
}
