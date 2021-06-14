import {$} from '@core/dom'
import {StoreSubscriber} from '../../core/StoreSubscriber'
import {Emitter} from './../../core/Emitter'
// подписки происходят сдесь
export class Excel {
  constructor(selector, options) {
    this.$selector = $(selector)
    this.store = options.store
    this.components = options.components || []
    this.emitter = new Emitter()
    this.sunbscriber = new StoreSubscriber(this.store)
  }
  getRoot() {
    const root = $.createElementAndClassName('div', 'excel')
    const componentOptions = {
      emitter: this.emitter,
      store: this.store
    }
    this.components = this.components.map(Component => {
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

    this.sunbscriber.subscribleComponents(this.components)
    this.components.forEach(component => component.init())
  }

  destroy() {
    this.sunbscriber.unsubscribeFromStore()
    this.components.forEach(component => component.destroy())
  }
}


