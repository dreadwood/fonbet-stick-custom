/**
 * screen.js
 */
;(() => {
  const GET_STICK_URL = 'https://xcomfeed.com/fonbet/great8/get-stick'

  /** @type {HTMLDivElement | null} */
  const loadingScreen = document.querySelector('.js-loading')
  /** @type {HTMLDivElement | null} */
  const startScreen = document.querySelector('.js-start')
  /** @type {HTMLDivElement | null} */
  const setScreen = document.querySelector('.js-set')
  /** @type {HTMLDivElement | null} */
  const resultScreen = document.querySelector('.js-result-end')
  /** @type {HTMLDivElement | null} */
  const modalAuth = document.querySelector('.js-auth-overlay')
  /** @type {HTMLButtonElement | null} */
  const startBtn = document.querySelector('.js-start-btn')
  /** @type {HTMLButtonElement | null} */
  const closeBtn = document.querySelector('.js-auth-close')

  if (
    !loadingScreen ||
    !startScreen ||
    !setScreen ||
    !startBtn ||
    !modalAuth ||
    !closeBtn
  ) {
    return
  }

  const showStartScreen = () => {
    loadingScreen.setAttribute('hidden', 'hidden')
    startScreen.removeAttribute('hidden')
  }

  const showResultScreen = () => {
    startScreen.setAttribute('hidden', 'hidden')
    loadingScreen.setAttribute('hidden', 'hidden')
    resultScreen.removeAttribute('hidden')
  }

  const onEscKeydown = (evt) => {
    if (evt.key === 'Escape') closeModal()
  }

  const openModal = () => {
    modalAuth.classList.add('show')
    document.body.classList.add('scroll-lock')
    document.addEventListener('keydown', onEscKeydown)
  }

  const closeModal = () => {
    modalAuth.classList.remove('show')
    document.body.classList.remove('scroll-lock')
    document.removeEventListener('keydown', onEscKeydown)
  }

  const openSet = () => {
    startScreen.setAttribute('hidden', 'hidden')
    setScreen.removeAttribute('hidden')
  }

  const init = async () => {
    const clientId = window.userInfo.getClientID()

    if (clientId) {
      const req = { pin: clientId }

      try {
        const data = await window.utils.fetchData(GET_STICK_URL, req)

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

  document.addEventListener('userInfoUpdated', (event) => {
    console.log('User info updated:', event.detail)
    console.log('Previous Client ID:', event.detail.prevClientId)
    console.log('Current Client ID:', event.detail.clientId)
    if (event.detail.clientId !== event.detail.prevClientId) {
      closeModal()
      openSet()
    }
  })

  document.addEventListener('registrationCompleted', async (event) => {
    const clientId = event.detail.clientId

    if (clientId) {
      window.utils.clientId = clientId
      const req = { pin: clientId }

      try {
        const data = await window.utils.fetchData(GET_STICK_URL, req)

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

  closeBtn.addEventListener('click', () => closeModal())

  modalAuth.addEventListener('click', (evt) => {
    if (evt.target === modalAuth) closeModal()
  })

  init()
})()
