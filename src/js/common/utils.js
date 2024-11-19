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
