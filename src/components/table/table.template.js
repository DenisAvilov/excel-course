const CODES = {
  A: 65,
  Z: 90,
  a: 97,
  z: 122
}
const addLiteral = (index) => {
  // из ЮНИ КОДА в Обычный Алфавит
  return String.fromCharCode( CODES.A + index )
}

const createRow = (col, index) => {
  return `
    <div class="row">
        <div class="row-info">${index ? index : ''}</div> 
        <div class="row-data"> 
        ${col}
        </div>
    </div>
`
}

const createColums = (col) => {
  return `
        <div class="column">
        ${col}
        </div>
        `
}

const createCell = () => {
  return `
        <div class="cell " contenteditable="true"></div>    
  `
}

export const createTable = (countRow = 15) => {
  const countColumns = CODES.Z - CODES.A + 1
  const rows = []

  const componentColum = new Array(countColumns)
      .fill('')
      .map( (_, index) => addLiteral(index))
      .map( (el) => createColums(el))
      .join('')

  rows.push(createRow(componentColum, null))

  for (let i = 0; i < countRow; i++) {
    const cells = new Array(countColumns)
        .fill('')
        .map(comp => createCell(comp))
        .join('')
    rows.push(createRow(cells, i + 1))
  }

  return rows.join('')
}

