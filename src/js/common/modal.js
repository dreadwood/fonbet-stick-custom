/**
 * modal.js
 */
;(() => {
  window.modal = {
    initAuth(modalAuth) {
      /** @type {HTMLButtonElement | null} */
      const btnClose = modalAuth.querySelector('.js-modal-auth-btn-close')

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

      btnClose.addEventListener('click', () => closeModal())

      modalAuth.addEventListener('click', (evt) => {
        if (evt.target === modalAuth) {
          closeModal()
        }
      })

      return [openModal, closeModal]
    },

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
      /** @type {HTMLButtonElement | null} */
      const btnClose = modalShare.querySelector('.js-modal-share-btn-close')
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
      btnClose.addEventListener('click', () => openNextModal())

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
      const btnClose = modalScore.querySelector('.js-modal-score-btn-close')

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
