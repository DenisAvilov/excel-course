import {isEqual} from './untils'
export class StoreSubscriber {
  constructor(store) {
    this.store = store
    this.sun = null
    this.prevState = {}
  }

  // Подписываем определенные компоненты
  subscribleComponents(components) {
    // переапределяем предыдущее состояние, состояние которое было до изменения
    this.prevState = this.store.getStore()
    this.sub = this.store.subscribelStore(state => {
      // проверяем ключи в  state
      Object.keys(state).forEach(key => {
        if (!isEqual(this.prevState[key], state[key] )) {
          components.forEach((component) => {
            if (component.isWatching(key)) {
              const changes = {[key]: state[key]}
              component.storeChanged(changes)
            }
          })
        }
      })

      this.prevState = this.store.getStore()
    })
  }
  // Отписываемся от компонентов
  unsubscribeFromStore() {
    this.sub.unsubscribe()
  }
}
