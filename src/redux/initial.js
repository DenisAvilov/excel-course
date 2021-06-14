import {storage} from './../core/untils'
const defaultState = {
  colState: {},
  rowState: {},
  cellState: {},
  curentCellText: '',
}

export const initial = storage('excel-state')
    ? storage('excel-state')
    : defaultState

