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
  /** @type {HTMLButtonElement | null} */
  const modalAuthCloseBtn = modalAuth.querySelector('.js-modal-auth-btn-close')

  if (
    !loadingScreen ||
    !startScreen ||
    !setScreen ||
    !startBtn ||
    !modalAuth ||
    !modalAuthCloseBtn
  ) {
    return
  }

  const showStartScreen = () => {
    window.utils.hideEl(loadingScreen)
    window.utils.showEl(startScreen)
  }

  const showResultScreen = () => {
    window.utils.hideEl(startScreen)
    window.utils.hideEl(loadingScreen)
    window.utils.showEl(resultScreen)
  }

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
      closeModal()
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
          closeModal()
        } else {
          closeModal()
          openSet()
        }
      } catch (error) {
        console.error(error)
        closeModal()
        openSet()
      }
    }
  })

  startBtn.addEventListener('click', () => {
    const clientId = window.userInfo.getClientID()
    if (clientId) {
      openSet()
    } else {
      openModal()
    }
  })

  modalAuthCloseBtn.addEventListener('click', () => closeModal())

  modalAuth.addEventListener('click', (evt) => {
    if (evt.target === modalAuth) closeModal()
  })

  init()
})()
