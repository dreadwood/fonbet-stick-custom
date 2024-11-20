'use strict'

window.const = {
  clientId: null,

  END_DATE: '14.12.2024',

  STICK_SEND_URL: 'https://xcomfeed.com/fonbet/great8/stick-send',
  GET_STICK_URL: 'https://xcomfeed.com/fonbet/great8/get-stick',

  STEPS: {
    1: 'first',
    2: 'second',
    3: 'third',
    4: 'fourth',
    5: 'fifth',
    6: 'finish'
  },

  TITLES: {
    1: 'Цвет',
    2: 'Шафт',
    3: 'Покрытие крюка',
    4: 'Персонализация',
    5: 'Технические характеристики'
  },

  COLORS: {
    red: 'красный',
    white: 'белый',
    black: 'черный',
    carbon: 'карбон'
  },

  TEXTURE: {
    matte: 'матовое',
    normal: 'обычное',
    glossy: 'глянцевое',
    glitter: 'Зернистое'
  },

  STICK_COLOR: ['red', 'white', 'black', 'carbon'],

  STICK_PATTERN_COLOR: ['red', 'white', 'black', 'chrome', 'reflective'],

  STICK_PATTERN_TYPE: [0, 1, 2, 3, 4, 5, 6],

  BLADE_TEXTURE: ['normal', 'glossy', 'matte', 'glitter']
}

window.utils = {
  /**
   * wrapper for fetch
   * @param {string} URL
   * @param {Object} data
   * @returns
   */
  async fetchData(URL, data) {
    const res = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    return res
  },

  /**
   * show html element
   * @param {HTMLElement} el
   */
  showEl(el) {
    el.removeAttribute('hidden')
  },

  /**
   * hide html element
   * @param {HTMLElement} el
   */
  hideEl(el) {
    el.setAttribute('hidden', 'hidden')
  },

  /**
   * @param {HTMLElement} el
   */
  showModal(el) {
    el.classList.add('show')
    document.body.classList.add('scroll-lock')
  },

  /**
   * @param {HTMLElement} el
   */
  closeModal(el) {
    el.classList.remove('show')
    document.body.classList.remove('scroll-lock')
  }
}

/**
 * pin.js
 */
;(() => {
  // auth start
  let regFlag = false

  let refreshIntervalId = setInterval(() => {
    if (typeof window.registrationApi !== 'undefined') regFlag = true
    if (regFlag) {
      clearInterval(refreshIntervalId)
      document.dispatchEvent(new Event('registrationInit'))
      // console.log('window.registrationApi', window.registrationApi)
      registrationApi.onRegistrationStateChanged = (state) => {
        console.log('registrationApi state', state)
      }
      registrationApi.onRegistrationCompleted = (clientId) => {
        document.dispatchEvent(
          new CustomEvent('registrationCompleted', {
            detail: { clientId: clientId }
          })
        )
        console.log('Registration completed', clientId)
      }
    }
  }, 500)
  // auth end

  // auth start
  const userInfo = (() => {
    let clientId = null
    let prevClientId = null
    let fsid = null

    const getCookie = (name) => {
      const matches = document.cookie.match(
        new RegExp(
          `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`
        )
      )
      return matches ? decodeURIComponent(matches[1]) : undefined
    }

    const getParameterByName = (name, url = window.location.href) => {
      name = name.replace(/[\[\]]/g, '\\$&')
      const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`)
      const results = regex.exec(url)
      if (!results) return null
      if (!results[2]) return ''
      return decodeURIComponent(results[2].replace(/\+/g, ' '))
    }

    const setClientID = () => {
      prevClientId = clientId
      clientId =
        getParameterByName('clientId') ||
        getCookie('headerApi.cid') ||
        getParameterByName('fsid')
    }

    const setFSID = () => {
      fsid = getCookie('headerApi.fsid') || getCookie('headerApi.FSID')
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setClientID()
        const event = new CustomEvent('userInfoUpdated', {
          detail: {
            clientId,
            prevClientId
          }
        })
        document.dispatchEvent(event)
      }
    }

    setClientID()
    setFSID()

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return {
      getClientID: () => clientId,
      getPrevClientID: () => prevClientId,
      setClientID,
      getFSID: () => fsid,
      setFSID,
      handleVisibilityChange
    }
  })()

  window.userInfo = userInfo
  // auth end
})()

/**
 * modal.js
 */
;(() => {
  window.modal = {
    initAuth(modalAuth) {
      /** @type {HTMLButtonElement | null} */
      const btnClose = modalAuth.querySelector('.js-modal-auth-btn-close')

      const onEscKeydown = (evt) => {
        if (evt.key === 'Escape') closeModal()
      }

      const openModal = () => {
        window.utils.showModal(modalAuth)
        document.addEventListener('keydown', onEscKeydown)
      }

      const closeModal = () => {
        window.utils.closeModal(modalAuth)
        document.removeEventListener('keydown', onEscKeydown)
      }

      btnClose.addEventListener('click', () => closeModal())

      modalAuth.addEventListener('click', (evt) => {
        if (evt.target === modalAuth) {
          closeModal()
        }
      })

      return [openModal, closeModal]
    },

    /**
     * @param {HTMLDivElement} modalBet
     * @param {HTMLDivElement} modalShare
     */
    initBet(modalBet, modalShare) {
      /** @type {HTMLLinkElement | null} */
      const modalBetBtn = modalBet.querySelector('.js-modal-bet-btn')

      modalBetBtn.addEventListener('click', () => {
        window.utils.closeModal(modalBet)
        window.utils.showModal(modalShare)
      })
    },

    /**
     * @param {HTMLDivElement} modalShare
     * @param {HTMLDivElement} modalScore
     */
    initShare(modalShare, modalScore) {
      /** @type {HTMLButtonElement | null} */
      const btnClose = modalShare.querySelector('.js-modal-share-btn-close')
      /** @type {HTMLLinkElement | null} */
      const btnShare = modalShare.querySelector('.js-modal-share-btn-share')
      /** @type {HTMLLinkElement | null} */
      const btnSite = modalShare.querySelector('.js-modal-share-btn-site')

      const openNextModal = () => {
        window.utils.closeModal(modalShare)
        window.utils.showModal(modalScore)
      }

      btnShare.addEventListener('click', () => openNextModal())
      btnSite.addEventListener('click', () => openNextModal())
      btnClose.addEventListener('click', () => openNextModal())

      modalShare.addEventListener('click', (evt) => {
        if (evt.target === modalShare) {
          openNextModal()
        }
      })
    },

    /**
     * @param {HTMLDivElement} modalScore
     */
    initScore(modalScore) {
      /** @type {HTMLButtonElement | null} */
      const btnClose = modalScore.querySelector('.js-modal-score-btn-close')

      btnClose.addEventListener('click', () =>
        window.utils.closeModal(modalScore)
      )

      modalScore.addEventListener('click', (evt) => {
        if (evt.target === modalScore) {
          window.utils.closeModal(modalScore)
        }
      })
    }
  }
})()

/**
 * result.js
 */
;(() => {
  const container = document.querySelector('.js-result-end-container')
  const stick = container.querySelector('.js-set-result-stick')
  const pattern = container.querySelector('.js-set-result-pattern')
  const blade = container.querySelector('.js-set-result-blade')
  const name = container.querySelector('.js-set-result-name')

  const showFinishScreen = (data) => {
    const stickNameColor =
      data.color_stick === window.const.STICK_COLOR[0] ||
      data.color_stick === window.const.STICK_COLOR[1]
        ? 'black'
        : 'white'

    // stick
    stick.src = `./img/sticks/stick-empty-${data.color_stick}.webp`

    // pattern
    if (data.shaft_texture === '0') {
      window.utils.hideEl(pattern)
    } else {
      const patternColor = data.shaft_color || 'black'
      pattern.src = `./img/sticks/pattern-${patternColor}-${data.shaft_texture}.webp`
      window.utils.showEl(pattern)
    }

    // blade
    const bladeColor = data.color_hook
    const bladeTexture = data.hook_cover
    blade.src = `./img/sticks/blade-${bladeColor}-${bladeTexture}.webp`

    // name
    name.textContent = data.text
    name.style = `color: ${stickNameColor};`
  }

  window.result = showFinishScreen
})()

/**
 * screen.js
 */
;(() => {
  /** @type {HTMLDivElement | null} */
  const loadingScreen = document.querySelector('.js-loading')
  /** @type {HTMLDivElement | null} */
  const startScreen = document.querySelector('.js-start')
  /** @type {HTMLDivElement | null} */
  const setScreen = document.querySelector('.js-set')
  /** @type {HTMLDivElement | null} */
  const resultScreen = document.querySelector('.js-result-end')
  /** @type {HTMLDivElement | null} */
  const modalAuth = document.querySelector('.js-modal-auth')
  /** @type {HTMLButtonElement | null} */
  const startBtn = document.querySelector('.js-start-btn')

  if (!loadingScreen || !startScreen || !setScreen || !startBtn || !modalAuth) {
    return
  }

  const [openAuthModal, closeAuthModal] = window.modal.initAuth(modalAuth)

  const showStartScreen = () => {
    window.utils.hideEl(loadingScreen)
    window.utils.showEl(startScreen)
  }

  const showResultScreen = () => {
    window.utils.hideEl(startScreen)
    window.utils.hideEl(loadingScreen)
    window.utils.showEl(resultScreen)
  }

  const openSet = () => {
    window.utils.hideEl(startScreen)
    window.utils.showEl(setScreen)
  }

  const init = async () => {
    const clientId = window.userInfo.getClientID()

    if (clientId) {
      const req = { pin: clientId }

      try {
        const data = await window.utils.fetchData(
          window.const.GET_STICK_URL,
          req
        )

        if (data.status === 200) {
          const res = await data.json()

          window.result(res.data)
          showResultScreen()
        } else {
          showStartScreen()
        }
      } catch (error) {
        console.error(error)
        showStartScreen()
      }
    } else {
      showStartScreen()
    }
  }

  document.addEventListener('userInfoUpdated', (evt) => {
    console.log('User info updated:', evt.detail)
    console.log('Previous Client ID:', evt.detail.prevClientId)
    console.log('Current Client ID:', evt.detail.clientId)
    if (evt.detail.clientId !== evt.detail.prevClientId) {
      closeAuthModal()
      openSet()
    }
  })

  document.addEventListener('registrationCompleted', async (evt) => {
    const clientId = evt.detail.clientId

    if (clientId) {
      window.utils.clientId = clientId
      const req = { pin: clientId }

      try {
        const data = await window.utils.fetchData(
          window.const.GET_STICK_URL,
          req
        )

        if (data.status === 200) {
          const res = await data.json()

          window.result(res.data)
          showResultScreen()
          closeAuthModal()
        } else {
          closeAuthModal()
          openSet()
        }
      } catch (error) {
        console.error(error)
        closeAuthModal()
        openSet()
      }
    }
  })

  startBtn.addEventListener('click', () => {
    const clientId = window.userInfo.getClientID()
    if (clientId) {
      openSet()
    } else {
      openAuthModal()
    }
  })

  init()
})()

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

      window.modal.initBet(this.modalBet, this.modalShare)
      window.modal.initShare(this.modalShare, this.modalScore)
      window.modal.initScore(this.modalScore)
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
