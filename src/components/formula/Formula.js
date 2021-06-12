import {ExcelComponent} from '@/core/ExcelComponent'
import {$} from './../../core/dom'
export class Formula extends ExcelComponent {

  constructor($root, options){
    super($root, {
      name : 'Formula',
      listener: ['input','keydown'],
      ...options
     
    })
  }

  // коневой класс для данного блока
  static className = 'excel__formula'

  toHTML() {
    return `
                <div class="info">fx</div>
                <div id="formula" class="input" contenteditable="true" spellcheck="false"></div>
                
        `
  }

  onInput(event){
    this.$fire('formula:input', $(event.target).text() )
    // this.$subscribeStore(store =>   $formula.text(store.curentCellText.text))
 }

  init() {
    super.init()
    const $formula = this.$root.querySelector('#formula')
    
    this.$on('table:change', newText =>{  $formula.text(newText)    })
    this.$on('table:input',  text => $formula.text(text))
    this.$on('table:onMouseDown',  text => $formula.text(text))

    this.$subscribeStore(store => $formula.text(store.curentCellText.text))

  }

  onKeydown(event){
    const keys = ['Tab','Enter']
  if( keys.includes(event.key)){
    const $target = $(event.target)
    event.preventDefault() 
    this.$fire('formula:enter',)
  }
  
}
}
