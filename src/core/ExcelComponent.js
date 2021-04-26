import {DomListener} from './DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listener)
    this.name = options.name || ''
    this.prepare()
    this.emitter = options.emitter
    this.unSubscrube = []
  }
  // Возвращяем шаблон компонета
  toHTML() {
    return ''
  }
  // подписываемся на событие event
  $on(event, fn) {
    const unSub = this.emitter.subscrube(event, fn)
    this.unSubscrube.push(unSub)
  }
  // шаблон програмирования фасад
  // Уведомляем слушателей про события event
  $fire(event, ...args) {
    this.emitter.fire(event, ...args)
  }

  // Настраиваем наш компонент до Инит
  prepare() {
  }

  // Инициализируем компонент
  // Добовляем DOM слушателей
  init() {
    this.initDomListener()
  }
  // Удаляем слушателей
  // Удаляем компонент
  destroy() {
    this.remuveDomListener()
    this.unSubscrube.forEach( component => component())
  }
}

