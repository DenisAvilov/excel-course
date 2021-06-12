import {TABLE_RESIZE, CHANGE_TEXT} from './types'
// Action Creator
export const resizeCol = (data) =>{
  return {
    type: TABLE_RESIZE,
    data
  }
}

export const changeText = (data) => {
  return {
    type: CHANGE_TEXT,
    data
  }
}
