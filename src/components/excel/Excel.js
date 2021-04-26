import {$} from '@core/dom'
import {Emitter} from './../../core/Emitter'
export class Excel {
  constructor(selector, options) {
    this.$selector = $(selector)
    this.$components = options.components || []
    this.emitter = new Emitter()
  }
  getRoot() {
    const root = $.createElementAndClassName('div', 'excel')
    const componentOptions = {
      emitter: this.emitter
    }
    this.$components = this.$components.map(Component => {
      const el = $.createElementAndClassName('div', Component.className)
      // получаем инстанс класса
      const component = new Component(el, componentOptions )
      // DEBUG
      // вынесем компонент в глабальную область видемости
      // if ( component.name) {
      //   window['c' + component.name] = component
      // }
      el.html(component.toHTML())
      root.append(el)
      return component
    });
    return root
  }
  // отрисовывает nody in document
  render() {
    this.$selector.append(this.getRoot())
    this.$components.forEach(component => component.init())
  }

  destroy() {
    this.$components.forEach(component => component.destroy())
  }
}


