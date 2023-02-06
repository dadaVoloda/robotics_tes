export const transformDate = (date) => {
  return date.includes('-') ? date : date.split('.').reverse().join('-')
}

export const transformNumber = (num) => {
  return num >= 10 ? String(num) : `0${num}`
}
