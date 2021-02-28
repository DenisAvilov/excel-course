import {DomListener} from '@core/DomListener'


export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listener)
    this.name = options.name || ''
    // this.options = options
    // console.log(this.options)
  }
  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }
 
  init() {
    this.initDomListener()
  }
 
  destroy() {
    this.remuveDomListener()
  }
 
}

