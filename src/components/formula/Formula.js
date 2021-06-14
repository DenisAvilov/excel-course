import {ExcelComponent} from '@/core/ExcelComponent'
import {$} from './../../core/dom'
export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name : 'Formula',
      listener: ['input','keydown'],
      subscribe: ['curentCellText'],
      ...options     
    })
  }

  toHTML() {
    return `
        <div class="info">fx</div>
        <div id="formula" class="input" contenteditable="true" spellcheck="false"></div>
      `
  }



  init() {
    super.init()

    this.$formula = this.$root.querySelector('#formula') 
  
    this.$on('table:select', $cell => this.$formula.text($cell.text()) )
    
    this.$on('table:onMouseDown',  text => this.$formula.text(text) )
    
  }

  storeChanged({curentCellText}){
    this.$formula.text(curentCellText)
  }

  onInput(event){
    this.$emit('formula:input', $(event.target).text() )   
  }  

  

  onKeydown(event){
    const keys = ['Tab','Enter']
  if( keys.includes(event.key)){
    const $target = $(event.target)
    event.preventDefault() 
    this.$emit('formula:done',)
    }  
  }

}
