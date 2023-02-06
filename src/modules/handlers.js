import { checkIsValid, makeValid, removeErrorClass } from './validation'

export default () => {
  const heroBtn = document.querySelector('.hero__btn')
  const modalWrapper = document.querySelector('.modal-wrapper')
  const form = document.querySelector('.form')
  const inputs = form.querySelectorAll('.required')

  const resetErrors = () => {
    inputs.forEach((input) => {
      removeErrorClass(input)
    })
  }

  heroBtn.addEventListener('click', () => {
    modalWrapper.classList.add('active')
  })

  modalWrapper.addEventListener('click', (e) => {
    const { target } = e
    if (!target.closest('.modal') || target.closest('.modal__close')) {
      modalWrapper.classList.remove('active')
      resetErrors()
    }
  })

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (checkIsValid(inputs)) {
      form.reset()
      alert('Форма успешно отправлена')
    } else {
      makeValid(inputs)
    }
  })
}
