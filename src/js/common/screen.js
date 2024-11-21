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
  /** @type {HTMLDivElement | null} */
  const modalStep = document.querySelector('.js-modal-step')
  /** @type {HTMLButtonElement | null} */
  const startBtn = document.querySelector('.js-start-btn')

  if (
    !loadingScreen ||
    !startScreen ||
    !setScreen ||
    !startBtn ||
    !modalAuth ||
    !modalStep
  ) {
    return
  }

  const [openAuthModal, closeAuthModal] = window.modal.initAuth(modalAuth)
  const [openStepModal, closeStepModal, btnAgree] =
    window.modal.initStep(modalStep)

  const showStartScreen = () => {
    window.utils.hideEl(loadingScreen)
    window.utils.showEl(startScreen)
  }

  const showResultScreen = () => {
    window.utils.hideEl(startScreen)
    window.utils.hideEl(loadingScreen)
    window.utils.showEl(resultScreen)
  }

  const openSetScreen = () => {
    window.utils.hideEl(startScreen)
    window.utils.showEl(setScreen)
  }

  const checkRegistration = async (req) => {
    try {
      const res = await window.utils.fetchData(
        window.const.GET_USER_INFO_URL,
        req
      )

      if (res.status === 200) {
        const data = await res.json()

        return !data.error
      } else {
        console.error('Не удалось проверить инфо ВП. Pin:', req.pin)
        return false
      }
    } catch (error) {
      console.error('Ошибка проверки инфо ВП (catch). Pin:', req.pin, error)
      return false
    }
  }

  const registration = async (req) => {
    try {
      const res = await window.utils.fetchData(
        window.const.REGISTER_USER_URL,
        req
      )

      if (res.status === 200) {
        const data = await res.json()

        return data.error
      } else {
        console.error('Не удалось зарегистрировать ВП. Pin:', req.pin)
      }
    } catch (error) {
      console.error('Ошибка регистрации ВП (catch). Pin:', req.pin, error)
      return false
    }
  }

  const getStickInfo = async (req) => {
    try {
      const res = await window.utils.fetchData(window.const.GET_STICK_URL, req)

      if (res.status === 200) {
        return await res.json()
      }

      return false
    } catch (error) {
      // console.error(
      //   'Ошибка при получении данных клюшки (catch). Pin:',
      //   req.pin,
      //   error
      // )
      return false
    }
  }

  const init = async () => {
    const clientId = window.userInfo.getClientID()

    if (clientId) {
      const req = { pin: clientId }
      const stickInfo = await getStickInfo(req)

      if (stickInfo) {
        window.result(stickInfo.data)
        showResultScreen()
        return
      }
    }

    showStartScreen()
  }

  document.addEventListener('userInfoUpdated', (evt) => {
    console.log('User info updated:', evt.detail)
    console.log('Previous Client ID:', evt.detail.prevClientId)
    console.log('Current Client ID:', evt.detail.clientId)
    if (evt.detail.clientId !== evt.detail.prevClientId) {
      // location.reload()
      // closeAuthModal()
      // closeStepModal()
      // openSetScreen()
    }
  })

  document.addEventListener('registrationCompleted', async (evt) => {
    const clientId = evt.detail.clientId

    if (clientId) {
      window.utils.clientId = clientId
      const req = { pin: clientId }

      const isReg = await checkRegistration(req)

      if (!isReg) {
        closeAuthModal()
        openStepModal()
        return
      }

      const stickInfo = await getStickInfo(req)

      if (stickInfo) {
        window.result(stickInfo.data)
        closeAuthModal()
        closeStepModal()
        showResultScreen()
        return
      }

      closeAuthModal()
      closeStepModal()
      openSetScreen()
    }
  })

  startBtn.addEventListener('click', async () => {
    const clientId = window.userInfo.getClientID()

    if (!clientId) {
      openAuthModal()
      return
    }

    const req = { pin: clientId }
    const isReg = await checkRegistration(req)

    console.log('isReg', isReg)

    if (isReg) {
      closeAuthModal()
      closeStepModal()
      openSetScreen()
    } else {
      openStepModal()
    }
  })

  btnAgree.addEventListener('click', async () => {
    const req = { pin: window.utils.clientId }
    await registration(req)

    const stickInfo = await getStickInfo(req)

    if (stickInfo) {
      window.result(stickInfo.data)
      closeAuthModal()
      closeStepModal()
      showResultScreen()
    } else {
      closeAuthModal()
      closeStepModal()
      openSetScreen()
    }
  })

  init()
})()
