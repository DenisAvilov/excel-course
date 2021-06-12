import {$} from '@core/dom'
import {Emitter} from './../../core/Emitter'
export class Excel {
  constructor(selector, options) {
    this.$selector = $(selector)
    this.store = options.store
    this.$components = options.components || []
    this.emitter = new Emitter()
  }
  getRoot() {
    const root = $.createElementAndClassName('div', 'excel')
    const componentOptions = {
      emitter: this.emitter,
      store: this.store
    }
    this.$components = this.$components.map(Component => {
      const el = $.createElementAndClassName('div', Component.className)
      const component = new Component(el, componentOptions )
      el.html(component.toHTML())
      root.append(el)
      return component
    });
    return root
  }

  render() {
    this.$selector.append(this.getRoot())
    this.$components.forEach(component => component.init())
  }

  destroy() {
    this.$components.forEach(component => component.destroy())
  }
}


