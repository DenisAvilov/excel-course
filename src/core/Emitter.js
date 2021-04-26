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
  fire(сhangesEvent, ...args) {
    if (!Array.isArray(this.observers[сhangesEvent])) {
      return false
    }
    this.observers[сhangesEvent].forEach(listener => {
      listener(...args)
    });
    return true
  }
}

// const emitter = new Emitter()
// const unSub = emitter.subscrube('Denis', data => console.log(data))
// emitter.fire('Denis', 36)
// emitter.fire('Denis', 37)
// unSub()
// emitter.fire('Denis', 38)
