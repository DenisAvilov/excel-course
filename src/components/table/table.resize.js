import {$} from '../../core/dom'
export const tableResize = ($root, event) => {
  return new Promise( resolve => {
    const $resize = $(event.target)
    const type = $resize.data.resize

    const $parant = $resize.closest('[data-type="resizer"]')
    const parantCoords = $parant.getCoords()
    let value
    const resizeActive = type === 'col' ? 'bottom' : 'right'
    $resize.css({[resizeActive]: '-3000px', opacity: 1})
    document.onmousemove = e => {
      if (type == 'col') {
        const pageX = e.pageX
        const delta = pageX - parantCoords.right
        value = parantCoords.width + delta
        value <= 40 ? value = 40 : $parant.css({width: value + 'px'})
        $resize.css({left: value + 'px'})
      } else {
        const pageY = e.clientY
        const delta = pageY - parantCoords.bottom
        value = parantCoords.height + delta
        value <= 20 ? value = 20 : $parant.css({height: value + 'px'})
        $resize.css({top: value + 'px'})
      }
    }
    document.onmouseup = () => {
      if ( type === 'col') {
        $root.querySelectorAll(`[data-col="${$parant.data.col}"]`)
            .forEach(e => {
              e.style.width = value + 'px'
            })
        document.onmousemove = null
        $resize.css({opacity: 0, bottom: 0})
        document.onMouseup = null
      } else {
        $parant.css({height: value + 'px'})
        document.onmousemove = null
        $resize.css({right: 0, bottom: 0, opacity: 0})
        document.onmouseup = null
      }

      resolve({
        value,
        id: $parant.data[type],
        type
      })
    }
  })
}
