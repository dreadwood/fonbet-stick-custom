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
