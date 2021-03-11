import {$} from '@core/dom'

export class Excel {
  constructor(selector, options) {
    this.$selector = $(selector)
    this.$components = options.components || []
    
  }


  getRoot() {
    //  alert('o4_04',)
    const root = $.createElementAndClassName('div', 'excel')

    this.$components = this.$components.map(Component => {
      const el = $.createElementAndClassName('div', Component.className)
      // получаем инстанс класса
      const component = new Component(el)
      // DEBUG
      // вынесем компонент в глабальную область видемости
      // if ( component.name) {
      //   window['c' + component.name] = component
      // }
      el.html(component.toHTML())

      // afterbegin, afterend, beforeend, beforebegin
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
}


