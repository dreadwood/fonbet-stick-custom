/**
 * modal.js
 */
;(() => {
  window.modal = {
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
      const btnClose = modalScore.querySelector('.js-score-btn-close')

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
