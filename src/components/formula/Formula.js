import {ExcelComponent} from '@/core/ExcelComponent'

export class Formula extends ExcelComponent {

  constructor($root){
    super($root, {
      name : 'Formula',
      listener: ['input', 'click']
    })
   

    
  }

  // коневой класс для данного блока
  static className = 'excel__formula'

  toHTML() {
    return `
                <div class="info">fx</div>
                <div class="input" contenteditable="true" spellcheck="false"></div>
                
        `
  }

  onInput(event){    
    console.log(' onInput  listener inpur ', event.target.textContent.trim())  
  }

  onClick(event){  
    console.log(' onClick  listener ', event)  
  }


}
