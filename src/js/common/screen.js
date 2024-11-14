/**
 * screen.js
 */
;(() => {
  /** @type {HTMLDivElement | null} */
  const startScreen = document.querySelector('.js-start')
  /** @type {HTMLDivElement | null} */
  const setScreen = document.querySelector('.js-set')
  /** @type {HTMLButtonElement | null} */
  const startBtn = document.querySelector('.js-start-btn')

  if (!startScreen || !setScreen || !startBtn) {
    console.error('startScreen, setScreen, startBtn does not exist')
    return
  }

  startBtn.addEventListener('click', () => {
    startScreen.setAttribute('hidden', 'hidden')
    setScreen.removeAttribute('hidden')
  })
})()
