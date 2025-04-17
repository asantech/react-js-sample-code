export const setLocalStorage = (key: string, value: any) => {
  try {
    const stringifiedValue = JSON.stringify(value)
    localStorage.setItem(key, stringifiedValue)
  } catch (error) {
    console.log("Error: value not valid to be stringified")
  }
}

export const getLocalStorage = (key: string) => {
  try {
    const stringifiedValue = localStorage.getItem(key)
    if (!stringifiedValue) return
    const parsedValue = JSON.parse(stringifiedValue)
    return parsedValue
  } catch (error) {
    console.log("Error: value not valid to be parsed")
  }
}

export const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key)
}
