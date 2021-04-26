import {$} from './../../core/dom'
export class TableSelection {

  static className = 'selected'

  constructor() {
    this.group = []
    this.startGroup = null
  }  

  select($el) {    
    this.clear()
    $el.focus().classListAdd(TableSelection.className)
    this.group.push($el)
    this.startGroup = $el
  }
  clear() {
    this.group.forEach(e => e.classListRemove(TableSelection.className))
    this.group = []
    
  }
 
  selectGroup($group = []) {
    this.clear()
    this.group = $group   
    this.group.forEach($el => $el.classListAdd(TableSelection.className))
    
    
    }
}

