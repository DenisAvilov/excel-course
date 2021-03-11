const CODES = {
  A: 65,
  Z: 90,
  a: 97,
  z: 122
}
const addLiteral = (index) => {
  return String.fromCharCode( CODES.A + index )
}

const createRow = (col, index) => {
  const dataRow = index ? `data-type="resizer"` : ''
  const resize = index ? `<div class="resize-row" data-resize="row"></div>` : ''
  return `
    <div class="row" ${dataRow}>
        <div class="row-info">
        ${index ? index : ''}
        ${resize}
        </div> 
        <div class="row-data"> 
        ${col}
        </div>
    </div>
`
}

const createColums = (col, index) => {
  return `
        <div class="column" data-type="resizer" data-col="${index}"> 
        ${col}
        <div class="resize-col" data-resize="col"></div>
        </div>
        `
}

const createCell = (_, index) => {
  return `
        <div class="cell" contenteditable="true" data-col="${index}">
        </div>  
        
  `
}

export const createTable = (countRow = 15) => {
  const countColumns = CODES.Z - CODES.A + 1
  const rows = []

  const componentColum = new Array(countColumns)
      .fill('')
      .map( (_, index) => addLiteral(index))
      .map( (el, index) => createColums(el, index))
      .join('')

  rows.push(createRow(componentColum, null))

  for (let i = 0; i < countRow; i++) {
    const cells = new Array(countColumns)
        .fill('')
        .map((comp, index) => createCell(comp, index))
        .join('')
    rows.push(createRow(cells, i + 1))
  }

  return rows.join('')
}

