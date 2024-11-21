/**
 * result.js
 */
;(() => {
  const container = document.querySelector('.js-result-end-container')
  const stickList = container.querySelectorAll('.js-result-stick')
  const patternList = container.querySelectorAll('.js-result-pattern')
  const bladeList = container.querySelectorAll('.js-result-blade')

  const name = container.querySelector('.js-result-name-text')

  const showFinishScreen = (data) => {
    const stickNameColor =
      data.color_stick === window.const.STICK_COLOR[0] ||
      data.color_stick === window.const.STICK_COLOR[1]
        ? 'black'
        : 'white'

    // stick
    stickList.forEach((it) => {
      if (it.classList.contains(data.color_stick)) {
        window.utils.showEl(it)
      } else {
        window.utils.hideEl(it)
      }
    })

    // pattern
    if (data.shaft_texture === '0') {
      patternList.forEach((it) => window.utils.hideEl(it))
    } else {
      const patternColor = data.shaft_color || 'red'
      const patternClass = `${patternColor}-${data.shaft_texture}`

      patternList.forEach((it) => {
        if (it.classList.contains(patternClass)) {
          window.utils.showEl(it)
        } else {
          window.utils.hideEl(it)
        }
      })
    }

    // blade
    const bladeClass = `${data.color_hook}-${data.hook_cover}`
    bladeList.forEach((it) => {
      if (it.classList.contains(bladeClass)) {
        window.utils.showEl(it)
      } else {
        window.utils.hideEl(it)
      }
    })

    // name
    name.textContent = data.text
    name.style = `color: ${stickNameColor};`
  }

  window.result = showFinishScreen
})()
