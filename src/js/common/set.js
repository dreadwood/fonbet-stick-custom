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
    carbon: 'карбон'
  }

  const TEXTURE = {
    matte: 'матовое',
    normal: 'обычное',
    glossy: 'глянцевое',
    glitter: 'Зернистое'
  }

  const STICK_SEND_URL = 'https://xcomfeed.com/fonbet/great8/stick-send'

  const STICK_COLOR = ['red', 'white', 'black', 'carbon']
  const STICK_PATTERN_COLOR = ['red', 'white', 'black', 'chrome', 'reflective']
  const STICK_PATTERN_TYPE = [0, 1, 2, 3, 4, 5, 6]
  const BLADE_TEXTURE = ['normal', 'glossy', 'matte', 'glitter']

  const stepNames = Object.values(STEPS)

  const state = {
    step: 1,

    stickColor: STICK_COLOR[0],
    stickPatternColor: 0,
    stickPatternType: 0,
    stickBladeColor: 0,
    stickBladeTexture: 0,
    stickName: '',
    stickNameColor: 'black',

    stickFormGrip: 'right',
    stickFormFlex: '90',

    /** @type {HTMLButtonElement | null} */
    stepEl: null,
    /** @type {HTMLButtonElement | null} */
    titleEl: null,
    /** @type {HTMLButtonElement | null} */
    setBtnPrev: null,
    /** @type {HTMLButtonElement | null} */
    setBtnNext: null,
    /** @type {HTMLButtonElement | null} */
    setBtnSave: null,
    /** @type {HTMLLinkElement | null} */
    setBtnReturn: null,

    init() {
      const container = document.querySelector('.js-set')
      if (!container) return

      this.stepEl = document.querySelector('.js-set-step')
      this.titleEl = document.querySelector('.js-set-title')
      this.setBtnPrev = document.querySelector('.js-set-btn-prev')
      this.setBtnNext = document.querySelector('.js-set-btn-next')
      this.setBtnSave = document.querySelector('.js-set-btn-save')
      this.setBtnReturn = document.querySelector('.js-set-btn-return')

      this.setBtnPrev.addEventListener('click', () => this.prevStep())
      this.setBtnNext.addEventListener('click', () => this.nextStep())
      this.setBtnSave.addEventListener('click', () => this.saveResult())

      this.initWindowFirst()
      this.initWindowSecond()
      this.initWindowThird()
      this.initWindowFourth()
      this.initWindowFifth()

      this.initModalBet()
      this.initModalScore()
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
        this.setBtnSave.removeAttribute('hidden')
        this.setBtnReturn.setAttribute('hidden', 'hidden')
      }
    },

    updateSetBtnsNavigation() {
      if (this.step !== 1) this.showEl(this.setBtnPrev)
      else this.hideEl(this.setBtnPrev)

      if (this.step === 5) {
        this.hideEl(this.setBtnSave)
        this.showEl(this.setBtnNext)
      }

      if (this.step === 6) this.hideEl(this.setBtnNext)

      this.changeCssClass('.js-set-btn-prev')
      this.changeCssClass('.js-set-btn-next')
      this.changeCssClass('.js-set-btn-save')
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

        img.src = `./img/sticks/stick-${this.stickColor}.webp`
        imgSecond.src = `./img/sticks/shaft-${this.stickColor}.webp`
        imgFourth.src = `./img/sticks/end-${this.stickColor}.webp`
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
      const pagBtns = listPattern.querySelectorAll('button')

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

        pagBtns.forEach((it, i) => {
          if (i === this.stickPatternType) {
            it.classList.add('actv')
          } else {
            it.classList.remove('actv')
          }
        })

        if (this.stickPatternType === 0) {
          imgPattern.setAttribute('hidden', 'hidden')
        } else {
          const color = STICK_PATTERN_COLOR[this.stickPatternColor]
          imgPattern.src = `./img/sticks/pattern-${color}-${this.stickPatternType}.webp`
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
        img.src = `./img/sticks/blade-${color}-${texture}.webp`
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

    initWindowFifth() {
      const form = document.querySelector('.js-spec')
      form.addEventListener('change', () => {
        this.stickFormGrip = form.elements.grip.value
        this.stickFormFlex = +form.elements.flex.value
      })
    },

    initModalBet() {
      const modalBet = document.querySelector('.js-bet')
      const modalBetBtn = modalBet.querySelector('.js-bet-btn')
      const modalScore = document.querySelector('.js-score')

      modalBetBtn.addEventListener('click', () => {
        modalBet.classList.remove('show')
        modalScore.classList.add('show')
      })
    },

    initModalScore() {
      const modalScore = document.querySelector('.js-score')
      const modalScoreBtn = document.querySelector('.js-score-close')

      modalScoreBtn.addEventListener('click', () => {
        modalScore.classList.remove('show')
      })

      modalScore.addEventListener('click', (evt) => {
        if (evt.target === modalScore) {
          modalScore.classList.remove('show')
        }
      })
    },

    updateWindowResult() {
      const container = document.querySelector('.js-set-result')
      const stick = container.querySelector('.js-set-result-stick')
      const pattern = container.querySelector('.js-set-result-pattern')
      const blade = container.querySelector('.js-set-result-blade')
      const name = container.querySelector('.js-set-result-name')

      // stick
      stick.src = `./img/sticks/stick-empty-${this.stickColor}.webp`

      // pattern
      if (this.stickPatternType === 0) {
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

    async renderStick() {
      const resultField = document.querySelector('.js-set-result-field')
      const nameField = document.querySelector('.js-set-result-name')

      nameField.classList.add('print')

      try {
        const canvas = await html2canvas(resultField, { backgroundColor: null })

        console.log(canvas)

        const link = document.createElement('a')
        link.href = canvas.toDataURL('image/png')
        link.download = 'result.png'
        link.click()

        nameField.classList.remove('print')
      } catch (error) {
        console.error(error)
      }

      return
    },

    async saveResult() {
      const clientId = window.userInfo.getClientID()
      const modalBet = document.querySelector('.js-bet')

      this.hideEl(this.setBtnPrev)
      this.hideEl(this.setBtnSave)
      this.showEl(this.setBtnReturn)

      try {
        await this.renderStick()

        const req = {
          pin: clientId,
          color_stick: this.stickColor,
          shaft_texture: this.stickPatternType,
          shaft_color: STICK_PATTERN_COLOR[this.stickPatternColor],
          color_hook: STICK_COLOR[this.stickBladeColor],
          hook_cover: BLADE_TEXTURE[this.stickBladeTexture],
          text: this.stickName,
          grip: this.stickFormGrip,
          flex: this.stickFormFlex,
          deflection_point: ''
        }

        const data = await window.utils.fetchData(STICK_SEND_URL, req)

        console.log(modalBet)

        if (data.ok) {
          console.log('test')
          modalBet.classList.add('show')
          this.showEl(this.setBtnReturn)
        }
      } catch (error) {
        console.error(error)
      }
    },

    /**
     * @param {HTMLElement} el
     */
    showEl(el) {
      el.removeAttribute('hidden')
    },

    /**
     * @param {HTMLElement} el
     */
    hideEl(el) {
      el.setAttribute('hidden', 'hidden')
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
