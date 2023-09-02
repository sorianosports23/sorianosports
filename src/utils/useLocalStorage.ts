const getLocalStorage = (varName: string, isJSON: boolean) => {
  const storage = localStorage

  const variable = storage.getItem(varName)
  if (!variable) {
    return false
  }

  if (isJSON) {
    return JSON.parse(variable)
  }

  return variable
}

const setLocalStorage = (varName: string, value: any, isJSON: boolean) => {
  if (isJSON) {
    localStorage.setItem(varName, JSON.stringify(value))
  } else
  localStorage.setItem(varName, value)
}

const clearLocalStorage = () => {
  localStorage.clear()
}

export {getLocalStorage, setLocalStorage, clearLocalStorage}