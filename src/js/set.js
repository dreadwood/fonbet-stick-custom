/**
 * set.js
 */
;(() => {
  const STEPS = {
    1: 'first',
    2: 'second',
    3: 'third',
    4: 'fourth',
    5: 'fifth',
    6: 'finish'
  }

  const TITLES = {
    1: 'Цвет',
    2: 'Шафт',
    3: 'Покрытие крюка',
    4: 'Персонализация',
    5: 'Технические характеристики'
  }

  const stepNames = Object.values(STEPS)

  const state = {
    step: 1,

    /** @type {HTMLButtonElement | null} */
    stepEl: document.querySelector('.js-set-step'),
    /** @type {HTMLButtonElement | null} */
    titleEl: document.querySelector('.js-set-title'),
    /** @type {HTMLButtonElement | null} */
    setBtnPrev: document.querySelector('.js-set-btn-prev'),
    /** @type {HTMLButtonElement | null} */
    setBtnNext: document.querySelector('.js-set-btn-next'),

    init() {
      console.log(this)

      this.setBtnPrev.addEventListener('click', () => this.prevStep())
      this.setBtnNext.addEventListener('click', () => this.nextStep())
    },

    prevStep() {
      this.step = this.step - 1
      this.showBackground()
      this.updateSetBtnsNavigation()
      this.updateScreen()
    },

    nextStep() {
      this.step = this.step + 1
      this.showBackground()
      this.updateSetBtnsNavigation()
      this.updateScreen()
    },

    showBackground() {
      this.changeVisibility('.js-bg')
    },

    updateScreen() {
      this.stepEl.textContent = this.step
      this.titleEl.textContent = TITLES[this.step]

      this.changeVisibility('.js-set-content')
      this.changeCssClass('.js-set-wrp')
    },

    updateSetBtnsNavigation() {
      if (this.step !== 1) {
        this.setBtnPrev.removeAttribute('hidden')
      } else {
        this.setBtnPrev.setAttribute('hidden', 'hidden')
      }

      if (this.step === 5) {
        this.setBtnNext.setAttribute('disabled', 'disabled')
      } else {
        this.setBtnNext.removeAttribute('disabled')
      }

      this.changeCssClass('.js-set-btn-prev')
    },

    /**
     * @param {HTMLElement} el
     */
    showEl(el) {
      el.removeAttribute('hidden')
      el.classList.add('showing')
      setTimeout(() => {
        el.classList.add('showing')
      }, 3000)
    },

    /**
     * @param {HTMLElement} el
     */
    hideEl(el) {
      el.classList.add('hiding')
      setTimeout(() => {
        el.classList.remove('hidding')
        el.setAttribute('hidden', 'hidden')
      }, 3000)
    },

    changeVisibility(selector) {
      /** @type {NodeListOf<HTMLElement>} */
      const contents = document.querySelectorAll(selector)

      contents.forEach((it) => {
        console.log(STEPS[this.step])
        console.log(it)

        if (it.classList.contains(STEPS[this.step])) {
          it.removeAttribute('hidden')
        } else {
          it.setAttribute('hidden', 'hidden')
        }
      })
    },

    changeCssClass(selector) {
      /** @type {HTMLButtonElement | null} */
      const el = document.querySelector(selector)

      stepNames.forEach((it) => {
        if (it !== STEPS[this.step]) {
          el.classList.remove(it)
        } else {
          el.classList.add(it)
        }
      })
    }
  }

  state.init()
  // step
  // title
  // prev button text
  // prev button hide
  // prev button class
  // next button text
})()
