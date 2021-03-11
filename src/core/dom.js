class Dom {
  constructor(selectorNode) {
    this.$element = typeof selectorNode === 'string'
    // #app
    ? document.querySelector(selectorNode)
    // ivent.target
      : selectorNode
  }

  html(html) {
    if (typeof html === 'string') {
      this.$element.innerHTML = html
      // patern in js
      return this
    }
    return this.$element.outerHTML.trim()
  }

  clear() {
    this.html('')
    return this
  }

  get data() {
    return this.$element.dataset
  }

  css(styles) {
    Object.keys(styles)
        .forEach(e => this.$element.style[e] = styles[e])
  }


  closest(element) {
    return $(this.$element.closest(element))
  }

  getCoords() {
    return this.$element.getBoundingClientRect()
  }


  on(eventType, func) {
    this.$element.addEventListener(eventType, func)
    // https://developer.mozilla.org/en-US/docs/Web/Events
  }

  off(eventType, method) {
    this.$element.removeEventListener(eventType, method);
  }

  // Element
  append(node) {
    if (node instanceof Dom) {
      node = node.$element
    }
    if (Element.prototype.append) {
      this.$element.append(node)
    } else {
      this.$element.appendChild(node)
    }
    return this
  }
}

// end dom
// $('div').html('<h1>Test</h1>').clear()

// #app are ivent.target
export const $ = (element) => {
  return new Dom(element)
}

$.createElementAndClassName = (element, className = '') => {
  const root = document.createElement(element)
  if (className) {
    root.classList.add(className)
  }
  return $(root)
}


