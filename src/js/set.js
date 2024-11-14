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

  const COLORS = {
    red: 'красный',
    white: 'белый',
    black: 'черный',
    // chrome: 'хром',
    // reflective: 'reflective',
    carbon: 'карбон'
  }

  const TEXTURE = {
    matte: 'матовое',
    normal: 'обычное',
    glossy: 'глянцевое',
    glitter: 'Зернистое'
  }

  const STICK_COLOR = ['red', 'white', 'black', 'carbon']
  const STICK_PATTERN_COLOR = ['red', 'white', 'black', 'chrome', 'reflective']
  const STICK_PATTERN_TYPE = [0, 1, 2, 3, 4, 5, 6]
  const BLADE_TEXTURE = ['normal', 'glossy', 'matte', 'glitter']

  const stepNames = Object.values(STEPS)

  const state = {
    step: 1,

    stickColor: STICK_COLOR[0],
    stickPatternColor: 0,
    stickPatternType: '0',
    stickBladeColor: 0,
    stickBladeTexture: 0,
    stickName: '',
    stickNameColor: 'black',

    stickFormGrip: 'right',
    stickFormFlex: '90',
    stickFormPoint: 'middle',

    /** @type {HTMLButtonElement | null} */
    stepEl: null,
    /** @type {HTMLButtonElement | null} */
    titleEl: null,
    /** @type {HTMLButtonElement | null} */
    setBtnPrev: null,
    /** @type {HTMLButtonElement | null} */
    setBtnNext: null,

    init() {
      const container = document.querySelector('.js-set')
      if (!container) return

      console.log(this)

      this.stepEl = document.querySelector('.js-set-step')
      this.titleEl = document.querySelector('.js-set-title')
      this.setBtnPrev = document.querySelector('.js-set-btn-prev')
      this.setBtnNext = document.querySelector('.js-set-btn-next')

      this.setBtnPrev.addEventListener('click', () => this.prevStep())
      this.setBtnNext.addEventListener('click', () => this.nextStep())

      this.initWindowFirst()
      this.initWindowSecond()
      this.initWindowThird()
      this.initWindowFourth()
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

      this.changeCssClass('.js-set-content')
      this.changeCssClass('.js-set-wrp')
      this.changeCssClass('.js-set-left')
      this.changeVisibility('.js-set-visibility')

      if (this.step === 6) {
        this.updateWindowResult()
      }
    },

    updateSetBtnsNavigation() {
      if (this.step !== 1) {
        this.setBtnPrev.removeAttribute('hidden')
      } else {
        this.setBtnPrev.setAttribute('hidden', 'hidden')
      }

      if (this.step === 6) {
        this.setBtnNext.setAttribute('disabled', 'disabled')
      } else {
        this.setBtnNext.removeAttribute('disabled')
      }

      this.changeCssClass('.js-set-btn-prev')
    },

    initWindowFirst() {
      const container = document.querySelector('.js-widow.first')
      const containerSecond = document.querySelector('.js-widow.second')
      const containerFourth = document.querySelector('.js-widow.fourth')
      const btnPrev = container.querySelector('.js-widow-btn.prev')
      const btnNext = container.querySelector('.js-widow-btn.next')
      const img = container.querySelector('.js-widow-img')
      const imgSecond = containerSecond.querySelector('.js-widow-img')
      const imgFourth = containerFourth.querySelector('.js-widow-img')
      const list = container.querySelector('.js-widow-pag-list')
      const nameColor = document.querySelector('.js-widow-color-stick-name')
      const label = containerFourth.querySelector('.js-window-name-label')

      const changeSlide = () => {
        const index = STICK_COLOR.findIndex((el) => el === this.stickColor)
        if (index === 0) {
          btnPrev.setAttribute('disabled', 'disabled')
          btnNext.removeAttribute('disabled')
        } else if (index + 1 === STICK_COLOR.length) {
          btnPrev.removeAttribute('disabled')
          btnNext.setAttribute('disabled', 'disabled')
        } else {
          btnPrev.removeAttribute('disabled')
          btnNext.removeAttribute('disabled')
        }

        img.src = `/img/sticks/stick-${this.stickColor}.webp`
        imgSecond.src = `/img/sticks/shaft-${this.stickColor}.webp`
        imgFourth.src = `/img/sticks/end-${this.stickColor}.webp`
        nameColor.textContent = COLORS[this.stickColor]

        this.stickNameColor =
          this.stickColor === STICK_COLOR[0] ||
          this.stickColor === STICK_COLOR[1]
            ? 'black'
            : 'white'
        label.style = `color: ${this.stickNameColor};`
      }

      list.addEventListener('click', (evt) => {
        if (evt.target.tagName !== 'BUTTON') return

        this.stickColor = evt.target.dataset.color
        changeSlide()
      })

      btnPrev.addEventListener('click', () => {
        const index = STICK_COLOR.findIndex((el) => el === this.stickColor)

        const color = STICK_COLOR[index - 1]
        this.stickColor = color

        changeSlide()
      })

      btnNext.addEventListener('click', () => {
        const index = STICK_COLOR.findIndex((el) => el === this.stickColor)

        const color = STICK_COLOR[index + 1]
        this.stickColor = color

        changeSlide()
      })
    },

    initWindowSecond() {
      const container = document.querySelector('.js-widow.second')
      const btnPrev = container.querySelector('.js-widow-btn.prev')
      const btnNext = container.querySelector('.js-widow-btn.next')
      const imgPattern = container.querySelector('.js-widow-pattern')
      const listPattern = container.querySelector('.js-widow-pag-list')
      const listColor = container.querySelector('.js-widow-color-list')

      const changePattern = () => {
        if (this.stickPatternType === 0) {
          btnPrev.setAttribute('disabled', 'disabled')
          btnNext.removeAttribute('disabled')
        } else if (this.stickPatternType + 1 === STICK_PATTERN_TYPE.length) {
          btnPrev.removeAttribute('disabled')
          btnNext.setAttribute('disabled', 'disabled')
        } else {
          btnPrev.removeAttribute('disabled')
          btnNext.removeAttribute('disabled')
        }

        if (this.stickPatternType === '0') {
          imgPattern.setAttribute('hidden', 'hidden')
        } else {
          const color = STICK_PATTERN_COLOR[this.stickPatternColor]
          imgPattern.src = `/img/sticks/pattern-${color}-${this.stickPatternType}.webp`
          imgPattern.removeAttribute('hidden')
        }
      }

      listColor.addEventListener('click', (evt) => {
        if (evt.target.tagName !== 'BUTTON') return

        this.stickPatternColor = evt.target.dataset.color
        changePattern()
      })

      listPattern.addEventListener('click', (evt) => {
        if (evt.target.tagName !== 'BUTTON') return

        this.stickPatternType = +evt.target.dataset.pattern
        changePattern()
      })

      btnPrev.addEventListener('click', () => {
        this.stickPatternType = this.stickPatternType - 1
        changePattern()
      })

      btnNext.addEventListener('click', () => {
        this.stickPatternType = this.stickPatternType + 1
        changePattern()
      })
    },

    initWindowThird() {
      const container = document.querySelector('.js-widow.third')
      const btnPrev = container.querySelector('.js-widow-btn.prev')
      const btnNext = container.querySelector('.js-widow-btn.next')
      const img = container.querySelector('.js-widow-img')
      const listColor = container.querySelector('.js-widow-color-list')
      const listTexture = container.querySelector('.js-widow-pag-list')
      const nameTexture = document.querySelector('.js-widow-blade-texture')
      const pagText = document.querySelector('.js-widow-pag-text')
      const pagBtns = listTexture.querySelectorAll('button')

      const changeBlade = () => {
        if (this.stickBladeTexture === 0) {
          btnPrev.setAttribute('disabled', 'disabled')
          btnNext.removeAttribute('disabled')
        } else if (this.stickBladeTexture + 1 === BLADE_TEXTURE.length) {
          btnPrev.removeAttribute('disabled')
          btnNext.setAttribute('disabled', 'disabled')
        } else {
          btnPrev.removeAttribute('disabled')
          btnNext.removeAttribute('disabled')
        }

        pagBtns.forEach((it, i) => {
          if (i === this.stickBladeTexture) {
            it.classList.add('actv')
          } else {
            it.classList.remove('actv')
          }
        })

        const color = STICK_COLOR[this.stickBladeColor]
        const texture = BLADE_TEXTURE[this.stickBladeTexture]

        nameTexture.textContent = TEXTURE[BLADE_TEXTURE[this.stickBladeTexture]]
        pagText.textContent = `Покрытие крюка ${this.stickBladeTexture + 1}/4`
        img.src = `/img/sticks/blade-${color}-${texture}.webp`
      }

      listColor.addEventListener('click', (evt) => {
        if (evt.target.tagName !== 'BUTTON') return

        this.stickBladeColor = evt.target.dataset.color
        changeBlade()
      })

      listTexture.addEventListener('click', (evt) => {
        if (evt.target.tagName !== 'BUTTON') return

        this.stickBladeTexture = +evt.target.dataset.texture
        changeBlade()
      })

      btnPrev.addEventListener('click', () => {
        this.stickBladeTexture = this.stickBladeTexture - 1
        changeBlade()
      })

      btnNext.addEventListener('click', () => {
        this.stickBladeTexture = this.stickBladeTexture + 1
        changeBlade()
      })
    },

    initWindowFourth() {
      const container = document.querySelector('.js-widow.fourth')
      const label = container.querySelector('.js-window-name-label')
      const input = document.querySelector('.js-window-name-input')

      input.addEventListener('input', (evt) => {
        const text = evt.target.value.slice(0, 14)
        evt.target.value = text
        label.textContent = text
        this.stickName = text
      })
    },

    updateWindowResult() {
      const container = document.querySelector('.js-set-design')
      const stick = container.querySelector('.js-set-result-stick')
      const pattern = container.querySelector('.js-set-result-pattern')
      const blade = container.querySelector('.js-set-result-blade')
      const name = container.querySelector('.js-set-result-name')

      // stick
      stick.src = `/img/sticks/stick-empty-${this.stickColor}.webp`

      // pattern
      if (this.stickPatternType === '0') {
        pattern.setAttribute('hidden', 'hidden')
      } else {
        const patternColor = STICK_PATTERN_COLOR[this.stickPatternColor]
        pattern.src = `./img/sticks/pattern-${patternColor}-${this.stickPatternType}.webp`
        pattern.removeAttribute('hidden')
      }

      // blade
      const bladeColor = STICK_COLOR[this.stickBladeColor]
      const bladeTexture = BLADE_TEXTURE[this.stickBladeTexture]
      blade.src = `./img/sticks/blade-${bladeColor}-${bladeTexture}.webp`

      // name
      name.textContent = this.stickName
      name.style = `color: ${this.stickNameColor};`
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

    /**
     * @param {string} selector
     */
    changeVisibility(selector) {
      /** @type {NodeListOf<HTMLElement>} */
      const contents = document.querySelectorAll(selector)

      contents.forEach((it) => {
        if (it.classList.contains(STEPS[this.step])) {
          it.removeAttribute('hidden')
        } else {
          it.setAttribute('hidden', 'hidden')
        }
      })
    },

    /**
     * @param {string} selector
     */
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
})()
