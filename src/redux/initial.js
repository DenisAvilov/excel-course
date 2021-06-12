import {storage} from './../core/untils'
const defaultState = {
  colState: {},
  rowState: {},
  cellState: {},
  curentCellText: '',
}

export const initial = storage('tableResize')
    ? storage('tableResize')
    : defaultState

