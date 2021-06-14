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
      // глубоко скланируем объект для избежания мутаций и,
      // так как в методе isEqual() в ./untils.js используем упрощенный вариант по сравлению объектов
      // при спользовании сложных структурных данных это работать не будит
      return JSON.parse(JSON.stringify(state)) 
    } 
  }
  
}

// Где сохранять состояние размера колонок? в локал сторидж
// В каком формате это все сохроняем сохранять ? в {'3': 274}
// Как сохранять состояния размера колонок?
// Как эти состояния получить при рендеринге страницы и отрисовать таблицу уже с новыми состояниями?