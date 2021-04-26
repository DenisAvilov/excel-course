class Dom {
  constructor(selectorNode) {
    this.$element = typeof selectorNode === 'string'
    ? document.querySelector(selectorNode)
      : selectorNode
  }
  html(html) {
    if (typeof html === 'string') {
      this.$element.innerHTML = html
      return this
    }
    return this.$element.outerHTML.trim()
  }

  text(text) {
    if ( typeof text === 'string') {
      this.$element.textContent = text
      return this
    }
    if (this.$element.tagName === 'input') {
      return this.$element.value.trim()
    }
    return this.$element.textContent.trim()
  }

  clear() {
    this.html('')
    return this
  }
  querySelector($el) {
    return $(document.querySelector($el))
  }
  querySelectorAll($el) {
    return document.querySelectorAll($el)
  }
  classListAdd($el) {
    this.$element.classList.add($el)
    return this
  }
  classListRemove($el) {
    this.$element.classList.remove($el)
    return this
  }
  focus() {
    this.$element.focus()
    return this
  }
  id(parse) {
    if (parse) {
      const id = this.id().split(':')
      return {
        row: +id[0],
        col: +id[1],
      }
    }
    return this.data.rowcell
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
  }
  off(eventType, method) {
    this.$element.removeEventListener(eventType, method);
  }
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


