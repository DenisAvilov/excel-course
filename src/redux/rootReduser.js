import {TABLE_RESIZE, CHANGE_TEXT} from './types'
export const rootReduser = (state, action) => { 
  let prevState 
  let flag  
  console.log(action.data)
  switch (action.type) {   
    case TABLE_RESIZE:
      flag = action.data.type === 'col' ? 'colState' : 'rowState'
      prevState = state[flag] || {}
      prevState[action.data.id] = action.data.value
      return {
        ...state, [flag]: prevState
      }
    case CHANGE_TEXT:
      prevState = state['cellState'] || {}      
      prevState[action.data.id] = action.data.text
      return {...state, curentCellText: action.data.text, cellState: prevState}
      default: return state
  }
}


// 06_12_Сохранение состояния ячеек

// https://daveceddia.com/react-redux-immutability-guide/