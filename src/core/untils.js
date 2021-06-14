// Pure functions, метод функции которого не находятся в глобальном скоупе
// реагируюют только на входящие параметры и реагируют только на входящий результа

// создать функцию капиталайз

export const stringGluing = (string) => {
  if (typeof string === 'string') {
    string = string.charAt(0).toUpperCase() + string.slice(1)
  } else {
    string = ''
  }
  return string
}

// Функция для работы с localStorage
export function storage(key, data = null) {
  if (!data) {
    return JSON.parse( localStorage.getItem(key ))
  }
  return localStorage.setItem(key, JSON.stringify(data))
}

export function isEqual(a, b) {
  // иначе понадобится функция dipEquale() где будим бежатся ректусивно
  // по объекту и сравнивать его с другими ключами объекта
  if (typeof a === 'object' && typeof b === 'object' ) {
    // то объекты нужно ставнивать по другому
    // работает только если в объектах неиспользуются
    // сложные структурные данные: new Data(), .map, inc
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return a === b // true or false
}
