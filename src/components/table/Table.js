import {$} from './../../core/dom'
import {ExcelComponent} from './../../core/ExcelComponent'
import {TableSelection} from './TableSelection'
import {createTable} from './table.template'
import {shutResize, shutRowcell, matrix, matrixCell} from './table.function'
import {tableResize} from './table.resize' 
export class Table extends ExcelComponent {
  constructor($root, options){
    super($root, {
      name: 'Table',
      listener: ['mousedown', 'keydown', 'input'],
      ...options,
    }) 
 
  }

  static className = 'excel__table'

  toHTML() {
      return `
      ${createTable(33)}
        `
  }


  prepare() {
    this.selected = new TableSelection()
  }

  init() {
    super.init()  
    
    this.tableSelect(this.$root.querySelector(`[data-rowcell="${'0:0'}"]`))

    this.$on('formula:input', text => {
        this.selected.startGroup.text(text)
      })
    this.$on('formula:enter', () => {
      this.selected.startGroup.focus()
    }  )  
 
  }
 

  tableSelect (cell) {
    this.selected.select(cell)  
    this.$fire('table:change', cell.text())
  }

  onMousedown (event) {
    if (shutResize(event)) {
      tableResize(this.$root, event)
    } else if (shutRowcell(event)) {
      const $target = $(event.target)   
    if ( event.ctrlKey ) {
   const $cells = matrix($target, this.selected.startGroup)
      .map( id => this.$root.querySelector(`[data-rowcell="${id}"]`))
      this.selected.selectGroup($cells)
      }    
    else { this.selected.select($target)}
    }
  }

  onKeydown(event) {
    const items = this.$root.querySelector(`.row-data:last-child`)
    const maxColumns = items.$element.childElementCount - 1   
    const maxRows = this.$root.querySelector(`.row:last-child`).$element.innerText 
    const rows = +maxRows - 1
    const keys = ['ArrowRight','ArrowDown','ArrowLeft','ArrowUp','Tab','Enter']
    if(keys.includes(event.key) && !event.shiftKey ){
    event.preventDefault()
    const col = this.selected.startGroup.id(true).col
    const row = this.selected.startGroup.id(true).row
    const $cell  = this.$root.querySelector(matrixCell(event.key, row, col, maxColumns, rows))
      
    this.tableSelect($cell)
    }
  }

  onInput(event) {     
      this.$fire('table:input', $(event.target).text())
  }

}




