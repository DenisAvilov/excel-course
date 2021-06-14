import {DomListener} from './DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listener)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.store = options.store
    this.unSubscribe = []

    this.prepare()
  }
  // Возвращяем шаблон компонета
  toHTML() {
    return ''
  }
  // подписываемся на событие event
  $on(event, fn) {
    const unSub = this.emitter.subscrube(event, fn)
    this.unSubscribe.push(unSub)
  }

  // шаблон програмирования фасад
  // Уведомляем слушателей про события event
  $emit(event, ...args) {
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

  // сюда приходят только изменения по полям на которые мы подписались
  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key)
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
    this.unSubscriber.forEach( component => component())
  }
}

