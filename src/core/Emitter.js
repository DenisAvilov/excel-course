export class Emitter {
  constructor() {
    this.observers = {}
  }

  subscrube(event, fn) {
    // если в объекте такого события нет то это будит пустой массив
    this.observers[event] = this.observers[event] || []
    this.observers[event].push(fn)
    return () => {
      this.observers[event] =
        this.observers[event].filter(listener => listener !== fn)
    }
  }

  // уведомляем сслушателя если он есть
  fire(event, ...args) {
    if (!Array.isArray(this.observers[event])) {
      return false
    }
    this.observers[event].forEach(listener => {
      listener(...args)
    });
    return true
  }
}
