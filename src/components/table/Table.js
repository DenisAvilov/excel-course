import {$} from './../../core/dom'
import {ExcelComponent} from './../../core/ExcelComponent'
import {TableSelection} from './TableSelection'
import {createTable} from './table.template'
import {shutResize, shutRowcell, matrix, matrixCell} from './table.function'
import {tableResize} from './table.resize' 
import  * as actions from '../../redux/actions'
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
      ${createTable(33, this.getStore())}
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
      console.log(text)
      this.upDateText(text)
      })
    this.$on('formula:enter', () => {
      this.selected.startGroup.focus()
    }  )  
    // this.$subscribeStore( table => 
    //   console.log('TableState', table))

  } 
 
  tableSelect (cell) {
    this.selected.select(cell)  
    this.$fire('table:change', cell.text())
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
      this.$fire('table:onMouseDown', $(event.target).text())
    if ( event.ctrlKey ) {
   const $cells = matrix($target, this.selected.startGroup)
      .map( id => this.$root.querySelector(`[data-rowcell="${id}"]`))
      this.selected.selectGroup($cells)
      }    
    else { this.selected.select($target)
      // this.upDateText( $(event.target).text())
    }
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
    this.upDateText( $(event.target).text())
       
  }

  upDateText(text) {   
    this.$distpath(actions.changeText({
    id: this.selected.startGroup.id(),
    text: text,
   })) 
}

}

 

