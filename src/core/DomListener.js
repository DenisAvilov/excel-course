// В этот класс будим добовлять какие то изолированные
// события для конкретного элемента которые наследуются от этого класса
import {stringGluing} from './untils'

export class DomListener {
// $root корневой элемент на который будим вешать различные слушатели
  constructor($root, listener = [], name) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener!`)
    }
    this.$root = $root
    this.listener = listener
  }

  initDomListener() {
    this.listener.forEach(listener => {
      // Получаем сканкотенированое имя события
      const method = getMethodName(listener)
      if (!this[method]) {
        throw new Error(`Method ${method} is not implemented in ${this.name} Component. 
                        Add method ${method} in ${this.name} Component
        `)
      }
      // bind создает новую функцию и передает в метод on
      this[method] = this[method].bind(this)
      this.$root.on(listener, this[method] )
    });
  }

  remuveDomListener() {
    this.listener.forEach(listener => {
      // Получаем сканкотенированое имя события
      const method = getMethodName(listener)
      this.$root.off(listener, this[method] )
    })
  }
}


const getMethodName = (eventName) => {
  eventName = 'on' + stringGluing(eventName)
  return eventName
}
