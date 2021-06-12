const CODES = {
  A: 65,
  Z: 90,
  a: 97,
  z: 122
}
const DEFAULT_WIDTH_CELL = 120 + 'px'
const DEFAULT_HEIGHT_ROW = 24 + 'px'
const widthColState = (index, width) => {
  return width ? width[index] + 'px' : DEFAULT_WIDTH_CELL
}
const heightRowState = (index, height) => {
  return height ? height[index] + 'px' : DEFAULT_HEIGHT_ROW
}

const addLiteral = (index) => {
  return String.fromCharCode( CODES.A + index )
}

const createRow = (col, index, state) => {
  const height = heightRowState(index, state)
  const dataRow = index
  ? `data-type="resizer" data-row="${index}" style="height: ${height}"`
  : ''
  const resize = index
  ? `<div class="resize-row" data-resize="row" ></div>`
  : ''
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

const createColums = (col, index, width) => {
  return `
        <div class="column" data-type="resizer" 
        data-col="${index}" style="width:${width}"> 
        ${col}
        <div class="resize-col" data-resize="col"></div>
        </div>
        `
}

const createCell = (row, index, state) => {
  const width = widthColState(index, state.colState)
  const id = row +':'+ index
  const value = state.cellState[id] || ''
  return `
        <div class="cell"
        contenteditable="true"
        data-col="${index}"
        data-rowcell="${id}"
        style="width:${width}"
        >
        ${value}
        </div>  
        
  `
}

export const createTable = (countRow = 15, state = {}) => {
  const countColumns = CODES.Z - CODES.A + 1
  const rows = []
  const componentColum = new Array(countColumns)
      .fill('')
      .map( (_, index) => addLiteral(index))
      .map( (el, index) => {
        const width = widthColState(index, state.colState)
        return createColums(el, index, width)
      })
      .join('')

  rows.push(createRow(componentColum, null))

  for (let row = 0; row < countRow; row++) {
    const cells = new Array(countColumns)
        .fill('')
        .map( (_, index) => {
          return createCell(row, index, state)
        })
        .join('')
       
    rows.push(createRow(cells, row + 1, state.rowState))
  }

  return rows.join('')
}

