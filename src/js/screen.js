/**
 * screen.js
 */
;(() => {
  /** @type {HTMLDivElement | null} */
  const startScreen = document.querySelector('.js-b-start')
  /** @type {HTMLDivElement | null} */
  const firstScreen = document.querySelector('.js-b-first')

  /** @type {HTMLButtonElement | null} */
  const startBtn = document.querySelector('.js-b-start-btn')
  /** @type {HTMLButtonElement | null} */
  const screenNextBtn = document.querySelector('.js-screen-next-btn')
  /** @type {HTMLButtonElement | null} */
  const screenPrevBtn = document.querySelector('.js-screen-prev-btn')

  if (
    !startScreen ||
    !firstScreen ||
    !startBtn ||
    !screenNextBtn ||
    !screenPrevBtn
  ) {
    console.error(
      'startScreen, firstScreen, startBtn, screenNextBtn, screenPrevBtn does not exist'
    )
    return
  }

  let index = 0
  const screens = [startScreen, firstScreen]

  function nextScreen() {
    screens[index].setAttribute('hidden', 'hidden')
    index = screens.length - 1 !== index ? index + 1 : 0

    screens[index].removeAttribute('hidden')
  }

  function prevScreen() {
    screens[index].setAttribute('hidden', 'hidden')
    index = index === 0 ? screens.length - 1 : index - 1

    screens[index].removeAttribute('hidden')
  }

  startBtn.addEventListener('click', nextScreen)
  screenPrevBtn.addEventListener('click', prevScreen)
})()
