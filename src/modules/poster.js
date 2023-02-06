import Swiper, { Navigation, Autoplay } from 'swiper'
import AirDatepicker from 'air-datepicker'
import 'air-datepicker/air-datepicker.css'
import 'swiper/css'
import 'swiper/css/autoplay'
import { transformDate } from '../utils'

const events = [
  {
    id: 1,
    title: 'Бизнесменам ЮФО и СКФО расскажут о преимуществах системы быстрых платежей',
    tags: ['Для предпринимателей'],
    date: '08.01.2023',
    link: '#',
  },
  {
    id: 2,
    title: 'Крутое февральское событие',
    tags: ['Для студентов'],
    date: '10.02.2023',
    link: '#',
  },
  {
    id: 3,
    title:
      'МАСТЕР- КЛАСС «5 ПСИХОТИПОВ ПОКУПАТЕЛЕЙ В ФЭШН– ЗНАТЬ И ВЛИЯТЬ! КАКИЕ ТРИГГЕРЫ У ЦЕЛЕВОЙ АУДИТОРИИ ВАШЕГО БРЕНДА?»',
    tags: ['Для предпринимателей'],
    date: '28.02.2023',
    link: '#',
  },
]

const eventDates = events.map((ev) => ev.date)

const createEventSlides = (events) => {
  const fragment = document.createDocumentFragment()
  events.forEach((ev) => {
    const slideWrapper = document.createElement('div')
    slideWrapper.className = 'swiper-slide'

    slideWrapper.insertAdjacentHTML(
      'beforeend',
      `<div class="poster-slide">
         <div class="poster-slide__date">
           ${ev.date.split('.').join('/')}
         </div>
         <h4 class="poster-slide__title">
           ${ev.title}
         </h4>
         <div class="poster-slide__bottom">
           <ul class="poster-slide__tags">
             ${ev.tags
               .map(
                 (tag) => `<li class="poster-slide__tag">
               ${tag}
              </li>`
               )
               .join(' ')}
           </ul>
           <a class="poster-slide__link" href="${ev.link}">Подробнее</a>
         </div>
       </div>`
    )
    fragment.append(slideWrapper)
  })
  return fragment
}

export default () => {
  const swiperWrapper = document.querySelector('.j-poster-slider .swiper-wrapper')
  swiperWrapper.append(createEventSlides(events))

  const posterSlider = new Swiper('.j-poster-slider', {
    loop: true,
    spaceBetween: 24,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    modules: [Navigation, Autoplay],
    navigation: {
      nextEl: '.j-poster-next',
      prevEl: '.j-poster-prev',
    },
  })

  const calendar = new AirDatepicker('#calendar', {
    inline: true,
    minDate: new Date('2023-01-01'),
    maxDate: new Date('2023-02-28'),
    navTitles: {
      days: 'MMMM yyyy',
    },
    onSelect({ date }) {
      if (date) {
        const slideIndex = events.findIndex((ev) => ev.date === date.toLocaleDateString())
        if (slideIndex >= 0) {
          posterSlider.slideToLoop(slideIndex)
        }
      }
    },
    onRenderCell({ date }) {
      if (eventDates.includes(date.toLocaleDateString())) {
        return { classes: 'has-event' }
      }
    },
  })

  const setSelectedDate = () => {
    const dateElem = document.querySelector('.swiper-slide-active .poster-slide__date')
    const correctDate = transformDate(dateElem.textContent.trim().replaceAll('/', '.'))
    calendar.selectDate(new Date(correctDate), { silent: true })
  }

  posterSlider.on('slideChangeTransitionEnd', function (e) {
    setSelectedDate()
  })
}
