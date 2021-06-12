export const createStore = ( rootReduser, initialState = {} ) => {
  let state = rootReduser( {...initialState}, {type: '__INIT__'})
  
  const listener = []
  
  return {
    subscribelStore(fn) {
      listener.push(fn)
      
      return {
        unsubscribeStore() {
          listener => listener.filter( l => l !== fn)
        }
      }
    },
    dispath(action) {
      state = rootReduser( state, action)
      listener.forEach(listener => listener(state))
    },
    getStore() {
      return state
    } 
  }
  
}

// Где сохранять состояние размера колонок? в локал сторидж
// В каком формате это все сохроняем сохранять ? в {'3': 274}
// Как сохранять состояния размера колонок?
// Как эти состояния получить при рендеринге страницы и отрисовать таблицу уже с новыми состояниями?