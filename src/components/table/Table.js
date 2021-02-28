import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from './table.template'

export class Table extends ExcelComponent {
     // коневой класс для данного блока
  static className = 'excel__table'

  toHTML() {
      return `
      ${createTable(20)}        
      `
  }
}
