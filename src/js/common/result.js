/**
 * result.js
 */
;(() => {
  const STICK_COLOR = ['red', 'white', 'black', 'carbon']

  const container = document.querySelector('.js-result-end-container')
  const stick = container.querySelector('.js-set-result-stick')
  const pattern = container.querySelector('.js-set-result-pattern')
  const blade = container.querySelector('.js-set-result-blade')
  const name = container.querySelector('.js-set-result-name')

  const showFinishScreen = (data) => {
    const stickNameColor =
      data.color_stick === STICK_COLOR[0] || data.color_stick === STICK_COLOR[1]
        ? 'black'
        : 'white'

    // stick
    stick.src = `./img/sticks/stick-empty-${data.color_stick}.webp`

    // pattern
    if (data.shaft_texture === '0') {
      pattern.setAttribute('hidden', 'hidden')
    } else {
      const patternColor = data.shaft_color || 'black'
      pattern.src = `./img/sticks/pattern-${patternColor}-${data.shaft_texture}.webp`
      pattern.removeAttribute('hidden')
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
