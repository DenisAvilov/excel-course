import {DomListener} from './DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listener)
    this.name = options.name || ''
    this.prepare()
    this.emitter = options.emitter
    this.store = options.store
    this.unSubStore = null
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
  // Полуяем состояние всего преложения
  getStore() {
    return this.store.getStore()
  }
  // получаем состояние через редьюсер
  $distpath(action) {
    this.store.dispath(action)
  }
  // единожді подписіваемся на состояние
  $subscribeStore(fn) {
    this.unSubStore = this.store.subscribelStore(fn)
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
    this.unSubStore.unSubscrube()
  }
}

