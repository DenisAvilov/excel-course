import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from './table.template'
import {shutResize} from './table.function'
import {tableResize} from './table.resize'

export class Table extends ExcelComponent {
  constructor($root){
    super($root, {
      name: 'Table',
      listener: ['mousedown', ] 
    })
  }
  
  static className = 'excel__table'

  toHTML() {
      return `
      ${createTable(20)}
        `
  }
    
  onMousedown (event) {
    if (shutResize(event)) {
      tableResize(event)
    }
  }
}
