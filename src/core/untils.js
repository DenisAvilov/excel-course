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

