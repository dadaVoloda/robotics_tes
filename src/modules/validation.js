const setErrorClass = (element) => {
  element.closest('.form__field-wrapper').classList.add('error')
}
export const removeErrorClass = (element) => {
  element.closest('.form__field-wrapper').classList.remove('error')
}

const fioRegex = /^[а-яА-ЯёЁ\s]+$/

const checkValid = (field) => {
  const isFio = field.dataset.method === 'fio'
  const isCheckbox = field.dataset.method === 'checkbox'
  const isSelect = field.dataset.method === 'select'
  const errorElem = field.closest('.form__field-wrapper').querySelector('.form__field-error')

  if (isCheckbox && !field.checked) {
    setErrorClass(field)
    return false
  }
  if (isSelect && !field.value) {
    errorElem.textContent = 'Выберите из списка'
    setErrorClass(field)
    return false
  }
  if (!field.value.trim()) {
    errorElem.textContent = 'Поле обязательно для заполнения'
    setErrorClass(field)
    return false
  }
  if (isFio && !fioRegex.test(field.value)) {
    errorElem.textContent = 'ФИО должно содержать только русские буквы'
    setErrorClass(field)
    return false
  }
  return true
}

export const makeValid = (fields) => {
  fields.forEach((field) => {
    const isFio = field.dataset.method === 'fio'
    const isCheckbox = field.dataset.method === 'checkbox'
    const isSelect = field.dataset.method === 'select'

    if (isCheckbox) {
      field.addEventListener('change', () => {
        if (field.checked) {
          removeErrorClass(field)
        }
      })
      return
    }
    if (isSelect) {
      field.addEventListener('change', () => {
        if (field.value) {
          removeErrorClass(field)
        }
      })
      return
    }
    if (isFio) {
      field.addEventListener('input', () => {
        if (fioRegex.test(field.value)) {
          removeErrorClass(field)
        }
      })
      return
    }
    field.addEventListener('input', () => {
      if (field.value !== '') {
        removeErrorClass(field)
      }
    })
  })
}

export const checkIsValid = (fields) => {
  let isValid = true
  fields.forEach((field) => {
    if (!checkValid(field)) {
      isValid = false
    }
  })
  return isValid
}
