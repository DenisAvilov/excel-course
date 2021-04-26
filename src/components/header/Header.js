import {ExcelComponent} from '@core/ExcelComponent';

export class Header extends ExcelComponent {
    constructor($root, options) {
        super($root, {
            name: 'Header',
            listener: [],
            ...options
        })
    }
    // коневой класс для данного блока
  static className = 'excel__header'
  toHTML() {
    return `
    
                <input class="input" type="text" value="Новая Таблица"/>
                <div>
                    <div class="button">
                        <span class="material-icons">
                            exit_to_app
                        </span>
                    </div>
                    <div class="button"> 
                        <span class="material-icons">
                            delete_forever
                        </span>
                    </div>
                </div>
           
    `
  }
}
