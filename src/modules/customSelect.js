import Choices from 'choices.js'
import SimpleBar from 'simplebar'
import 'choices.js/public/assets/styles/choices.min.css'
import 'simplebar/dist/simplebar.css'

export default () => {
  const element = document.querySelector('#service-select')
  const choices = new Choices(element, {
    searchEnabled: false,
    itemSelectText: '',
  })

  new SimpleBar(document.querySelector('.choices__list--dropdown'))
}
