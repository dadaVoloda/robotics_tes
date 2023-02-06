import Swiper, { Navigation, Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/autoplay'
import { transformNumber } from '../utils'

export default () => {
  const heroSlider = new Swiper('.j-hero-slider', {
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    modules: [Navigation, Autoplay],
    navigation: {
      nextEl: '.j-hero-slide-next',
      prevEl: '.j-hero-slide-prev',
    },
    breakpoints: {
      611: {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 0,
      },
    },
  })

  const totalNumEl = document.querySelector('.j-total-slides')
  const currentNumEl = document.querySelector('.j-cur-slide')
  const lineSliderEl = document.querySelector('.j-line-slider')

  const slidesCount = heroSlider.slides.length
  lineSliderEl.style.width = 100 / slidesCount + '%'
  totalNumEl.textContent = transformNumber(slidesCount)

  heroSlider.on('slideChange', function () {
    lineSliderEl.style.left = (this.activeIndex / slidesCount) * 100 + '%'
    currentNumEl.textContent = transformNumber(this.activeIndex + 1)
  })
}
