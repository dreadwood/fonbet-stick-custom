/**
 * set.js
 */
;(() => {
  const stepNames = Object.values(window.const.STEPS)

  const state = {
    step: 1,

    stickColor: window.const.STICK_COLOR[0],
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
    /** @type {HTMLDivElement | null} */
    modalBet: null,
    /** @type {HTMLDivElement | null} */
    modalShare: null,
    /** @type {HTMLDivElement | null} */
    modalScore: null,

    init() {
      const container = document.querySelector('.js-set')
      if (!container) return

      this.stepEl = document.querySelector('.js-set-step')
      this.titleEl = document.querySelector('.js-set-title')
      this.setBtnPrev = document.querySelector('.js-set-btn-prev')
      this.setBtnNext = document.querySelector('.js-set-btn-next')
      this.setBtnSave = document.querySelector('.js-set-btn-save')
      this.setBtnReturn = document.querySelector('.js-set-btn-return')

      this.modalBet = document.querySelector('.js-modal-bet')
      this.modalShare = document.querySelector('.js-modal-share')
      this.modalScore = document.querySelector('.js-modal-score')

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
      this.initModalShare()
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
      this.titleEl.textContent = window.const.TITLES[this.step]

      this.changeCssClass('.js-set-content')
      this.changeCssClass('.js-set-wrp')
      this.changeCssClass('.js-set-left')
      this.changeVisibility('.js-set-visibility')

      if (this.step === 6) {
        this.updateWindowResult()
        window.utils.showEl(this.setBtnSave)
        window.utils.hideEl(this.setBtnReturn)
      }
    },

    updateSetBtnsNavigation() {
      if (this.step !== 1) {
        window.utils.showEl(this.setBtnPrev)
      } else {
        window.utils.hideEl(this.setBtnPrev)
      }

      if (this.step === 5) {
        window.utils.hideEl(this.setBtnSave)
        window.utils.showEl(this.setBtnNext)
      }

      if (this.step === 6) window.utils.hideEl(this.setBtnNext)

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
        const index = window.const.STICK_COLOR.findIndex(
          (el) => el === this.stickColor
        )
        if (index === 0) {
          btnPrev.setAttribute('disabled', 'disabled')
          btnNext.removeAttribute('disabled')
        } else if (index + 1 === window.const.STICK_COLOR.length) {
          btnPrev.removeAttribute('disabled')
          btnNext.setAttribute('disabled', 'disabled')
        } else {
          btnPrev.removeAttribute('disabled')
          btnNext.removeAttribute('disabled')
        }

        img.src = `./img/sticks/stick-${this.stickColor}.webp`
        imgSecond.src = `./img/sticks/shaft-${this.stickColor}.webp`
        imgFourth.src = `./img/sticks/end-${this.stickColor}.webp`
        nameColor.textContent = window.const.COLORS[this.stickColor]

        this.stickNameColor =
          this.stickColor === window.const.STICK_COLOR[0] ||
          this.stickColor === window.const.STICK_COLOR[1]
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
        const index = window.const.STICK_COLOR.findIndex(
          (el) => el === this.stickColor
        )

        const color = window.const.STICK_COLOR[index - 1]
        this.stickColor = color

        changeSlide()
      })

      btnNext.addEventListener('click', () => {
        const index = window.const.STICK_COLOR.findIndex(
          (el) => el === this.stickColor
        )

        const color = window.const.STICK_COLOR[index + 1]
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
        } else if (
          this.stickPatternType + 1 ===
          window.const.STICK_PATTERN_TYPE.length
        ) {
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
          window.utils.hideEl(imgPattern)
        } else {
          const color = window.const.STICK_PATTERN_COLOR[this.stickPatternColor]
          imgPattern.src = `./img/sticks/pattern-${color}-${this.stickPatternType}.webp`
          window.utils.showEl(imgPattern)
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
        } else if (
          this.stickBladeTexture + 1 ===
          window.const.BLADE_TEXTURE.length
        ) {
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

        const color = window.const.STICK_COLOR[this.stickBladeColor]
        const texture = window.const.BLADE_TEXTURE[this.stickBladeTexture]

        nameTexture.textContent = window.const.TEXTURE[texture]
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
      const modalBetBtn = this.modalBet.querySelector('.js-modal-bet-btn')

      modalBetBtn.addEventListener('click', () => {
        window.utils.closeModal(this.modalBet)
        window.utils.showModal(this.modalShare)
      })
    },

    initModalShare() {
      const btnShare = this.modalShare.querySelector(
        '.js-modal-share-btn-share'
      )
      const btnSite = this.modalShare.querySelector('.js-modal-share-btn-site')

      const openNextModal = () => {
        window.utils.closeModal(this.modalShare)
        window.utils.showModal(this.modalScore)
      }

      btnShare.addEventListener('click', () => openNextModal())
      btnSite.addEventListener('click', () => openNextModal())

      this.modalShare.addEventListener('click', (evt) => {
        if (evt.target === this.modalShare) {
          openNextModal()
        }
      })
    },

    initModalScore() {
      const btnClose = this.modalScore.querySelector('.js-score-btn-close')

      btnClose.addEventListener('click', () =>
        window.utils.closeModal(this.modalScore)
      )

      this.modalScore.addEventListener('click', (evt) => {
        if (evt.target === this.modalScore) {
          window.utils.closeModal(this.modalScore)
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
        window.utils.hideEl(pattern)
      } else {
        const patternColor =
          window.const.STICK_PATTERN_COLOR[this.stickPatternColor]
        pattern.src = `./img/sticks/pattern-${patternColor}-${this.stickPatternType}.webp`
        window.utils.showEl(pattern)
      }

      // blade
      const bladeColor = window.const.STICK_COLOR[this.stickBladeColor]
      const bladeTexture = window.const.BLADE_TEXTURE[this.stickBladeTexture]
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

      window.utils.hideEl(this.setBtnPrev)
      window.utils.hideEl(this.setBtnSave)
      window.utils.showEl(this.setBtnReturn)

      const req = {
        pin: clientId || window.const.clientId,
        color_stick: this.stickColor,
        shaft_texture: this.stickPatternType,
        shaft_color: window.const.STICK_PATTERN_COLOR[this.stickPatternColor],
        color_hook: window.const.STICK_COLOR[this.stickBladeColor],
        hook_cover: window.const.BLADE_TEXTURE[this.stickBladeTexture],
        text: this.stickName,
        grip: this.stickFormGrip,
        flex: this.stickFormFlex,
        deflection_point: ''
      }

      try {
        const data = await window.utils.fetchData(
          window.const.STICK_SEND_URL,
          req
        )

        if (data.ok) {
          window.utils.showModal(this.modalBet)
          window.utils.showEl(this.setBtnReturn)
        }
      } catch (error) {
        console.error(error)
      }

      try {
        this.renderStick()
      } catch (error) {
        console.error(error)
      }

      this.updateResuteScreenContent()
    },

    updateResuteScreenContent() {
      const resultTitle = document.querySelector('.js-set-result-title')
      const resultText = document.querySelector('.js-set-result-text')

      resultTitle.textContent = 'Твой дизайн'
      resultText.textContent = `Отличный результат! Совсем скоро мы подведем итоги и объявим победителей, которые выиграют Верную подругу Великой погони! Жди результатов ${window.const.END_DATE}.`
    },

    /**
     * @param {string} selector
     */
    changeVisibility(selector) {
      /** @type {NodeListOf<HTMLElement>} */
      const contents = document.querySelectorAll(selector)

      contents.forEach((it) => {
        if (it.classList.contains(window.const.STEPS[this.step])) {
          window.utils.showEl(it)
        } else {
          window.utils.hideEl(it)
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
        if (it !== window.const.STEPS[this.step]) {
          el.classList.remove(it)
        } else {
          el.classList.add(it)
        }
      })
    }
  }

  state.init()
})()
