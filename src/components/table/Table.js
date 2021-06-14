import {$} from './../../core/dom'
import {ExcelComponent} from './../../core/ExcelComponent'
import {TableSelection} from './TableSelection'
import {createTable} from './table.template'
import {shutResize, shutRowcell, matrix, matrixCell} from './table.function'
import {tableResize} from './table.resize' 
import  * as actions from '../../redux/actions'
export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options){
    super($root, {
      name: 'Table',
      listener: ['mousedown', 'keydown', 'input'],
      ...options,
    })  
  }

  toHTML() {
      return createTable(33, this.getStore())
  }

  prepare() {
    this.selected = new TableSelection()    
    
  }

  init() {
    super.init()
   
    this.tableSelect(this.$root.querySelector(`[data-rowcell="0:0"]`))
   
    this.$on('formula:input', text => {
      this.selected.startGroup.text(text)
      this.upDateText(text)
      })

    this.$on('formula:done', () => {
      this.selected.startGroup.focus()
    }  )     
  } 
 
  tableSelect ($cell) {    
    this.selected.select($cell)
    this.$emit('table:select', $cell)
  }

 async resizeTable(event) {
   try {
    const data = await tableResize(this.$root, event)    
    this.$distpath(actions.resizeCol(data))
   } catch (e) {
    console.warn('this resize error', e.message)
   }
  
  }

  onMousedown (event) {
    if (shutResize(event)) {
      this.resizeTable(event)
    } else if (shutRowcell(event)) {
      const $target = $(event.target) 
      this.$emit('table:onMouseDown', $(event.target).text())
    if ( event.ctrlKey ) {
      const $cells = matrix($target, this.selected.startGroup)
      .map( id => this.$root.querySelector(`[data-rowcell="${id}"]`))
      this.selected.selectGroup($cells)
      }    
    else { 
      this.selected.select($target)
    }
    }
  }

  onKeydown(event) {
    const keys = [
      'ArrowRight',
      'ArrowDown',
      'ArrowLeft',
      'ArrowUp',
      'Tab',
      'Enter'
  ]

    const items = this.$root.querySelector(`.row-data:last-child`)
    const maxColumns = items.$element.childElementCount - 1   
    const maxRows = this.$root.querySelector(`.row:last-child`).$element.innerText 
    const rows = +maxRows - 1

    const {key} = event

    if(keys.includes(key) && !event.shiftKey ){
      event.preventDefault()
      const col = this.selected.startGroup.id(true).col
      const row = this.selected.startGroup.id(true).row
      this.tableSelect(this.$root.querySelector(matrixCell(key, row, col, maxColumns, rows)) )
    }
    
  }

   upDateText(value) {   
    this.$distpath(actions.changeText({
    id: this.selected.startGroup.id(),
    value
    })) 
  }

  onInput(event) { 
    this.upDateText($(event.target).text())
  }
}
