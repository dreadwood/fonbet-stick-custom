/**
 * form.js
 */
;(() => {
  //
  // const form = container.querySelector('.js-auth-form')
  // const telEl = container.querySelector('.js-auth-el-tel')
  // const bdayEl = container.querySelector('.js-auth-el-bday')
  // const passEl = container.querySelector('.js-auth-el-pass')
  // const agreeEl = container.querySelector('.js-auth-el-agree')
  // const ad = container.querySelector('.js-auth-checkbox-ad')
  // const TEL_LENGTH = 11
  // const MASK_TEL = '+{7} ({9}00) 000-00-00'
  // const MIN_AGE_BDAY = 18
  // function initTelField(fieldWrp, mask, telLength) {
  //   const field = fieldWrp.querySelector('input[type="tel"]')
  //   const error = fieldWrp.querySelector('[data-field-error]')
  //   /**
  //    * IMask 7.6.1
  //    * vendor/imask.js
  //    */
  //   const telMask = IMask(field, { mask })
  //   field.addEventListener('input', () => {
  //     const isComplete = telMask.unmaskedValue.length === telLength
  //     if (isComplete) {
  //       fieldWrp.classList.remove('error')
  //     }
  //   })
  //   return [
  //     field,
  //     () => {
  //       const isError = telMask.unmaskedValue.length !== telLength
  //       if (isError) {
  //         telEl.classList.add('error')
  //       }
  //       return !isError
  //     }
  //   ]
  // }
  // function initBirthdayField(fieldWrp, minAge) {
  //   const BIRTHDAY_LENGTH = 10
  //   const field = fieldWrp.querySelector('input[type="text"]')
  //   const error = fieldWrp.querySelector('[data-field-error]')
  //   const date18YearsAgo = new Date()
  //   date18YearsAgo.setFullYear(new Date().getFullYear() - minAge)
  //   /**
  //    * IMask 7.6.1
  //    * vendor/imask.js
  //    */
  //   const birthdayMask = IMask(field, {
  //     mask: Date,
  //     min: new Date(1900, 0, 1),
  //     max: date18YearsAgo,
  //     lazy: false
  //   })
  //   field.addEventListener('input', () => {
  //     const isComplete = birthdayMask.unmaskedValue.length === BIRTHDAY_LENGTH
  //     if (isComplete) {
  //       fieldWrp.classList.remove('error')
  //     }
  //   })
  //   return [
  //     field,
  //     () => {
  //       const isError = birthdayMask.unmaskedValue.length !== BIRTHDAY_LENGTH
  //       if (isError) {
  //         fieldWrp.classList.add('error')
  //         error.textContent = `Вам должно быть ${minAge} лет`
  //       }
  //       return !isError
  //     }
  //   ]
  // }
  // function initPassField(fieldWrp) {
  //   const field = fieldWrp.querySelector('input[type="password"]')
  //   const btn = fieldWrp.querySelector('button[data-field-show]')
  //   const error = fieldWrp.querySelector('[data-field-error]')
  //   const checkValidPass = () => {
  //     let isError = false
  //     const regexMinLatin = /[A-Za-z]/
  //     const regexMinNum = /\d/
  //     const regexOnlyLatinNum = /^[A-Za-z\d]+$/
  //     switch (true) {
  //       case !regexMinLatin.test(field.value):
  //         isError = true
  //         error.textContent = 'Пароль должен содержать латинские буквы'
  //         break
  //       case !regexMinNum.test(field.value):
  //         isError = true
  //         error.textContent = 'Пароль должен содержать цифры'
  //         break
  //       case !regexOnlyLatinNum.test(field.value):
  //         isError = true
  //         error.textContent =
  //           'Пароль может содержать только цифры и латинские буквы'
  //         break
  //       case field.value.length < 8:
  //         isError = true
  //         error.textContent = 'Пароль должен быть не менее 8 символов'
  //         break
  //       default:
  //         error.textContent = ''
  //         break
  //     }
  //     return isError
  //   }
  //   field.addEventListener('input', () => {
  //     if (field.value.length > 0) {
  //       btn.removeAttribute('hidden')
  //     } else {
  //       btn.setAttribute('hidden', 'hidden')
  //     }
  //     const isError = checkValidPass()
  //     if (!isError) {
  //       fieldWrp.classList.remove('error')
  //     }
  //   })
  //   btn.addEventListener('click', () => {
  //     if (field.type === 'password') {
  //       field.type = 'text'
  //       btn.classList.add('show')
  //     } else {
  //       console.log(field.type)
  //       field.type = 'password'
  //       btn.classList.remove('show')
  //     }
  //   })
  //   return [
  //     field,
  //     () => {
  //       const isError = checkValidPass()
  //       if (isError) {
  //         fieldWrp.classList.add('error')
  //       } else {
  //         fieldWrp.classList.remove('error')
  //       }
  //       return !isError
  //     }
  //   ]
  // }
  // function initCheckbox(fieldWrp) {
  //   const field = fieldWrp.querySelector('input[type="checkbox"]')
  //   if (field.checked) {
  //     fieldWrp.classList.add('error')
  //   }
  //   field.addEventListener('change', () => {
  //     if (field.checked) {
  //       fieldWrp.classList.remove('error')
  //     } else {
  //       fieldWrp.classList.add('error')
  //     }
  //   })
  //   return [
  //     field,
  //     () => {
  //       if (!field.checked) {
  //         fieldWrp.classList.add('error')
  //       }
  //       return field.checked
  //     }
  //   ]
  // }
  // const [telField, checkValidTel] = initTelField(telEl, MASK_TEL, TEL_LENGTH)
  // const [bdayField, checkValidBday] = initBirthdayField(bdayEl, MIN_AGE_BDAY)
  // const [passField, checkValidPass] = initPassField(passEl)
  // const [agree, checkAgree] = initCheckbox(agreeEl)
  // form.addEventListener('submit', (evt) => {
  //   evt.preventDefault()
  //   const isValidTel = checkValidTel()
  //   const isValidBday = checkValidBday()
  //   const isValidPass = checkValidPass()
  //   const isValidAgree = checkAgree()
  //   if ((!isValidTel, !isValidBday, !isValidPass, !isValidAgree)) {
  //     return
  //   }
  //   const fields = {
  //     [telField.name]: telField.value,
  //     [bdayField.name]: bdayField.value,
  //     [passField.name]: passField.value,
  //     [agree.name]: agree.checked,
  //     [ad.name]: ad.checked
  //   }
  //   console.log(fields)
  // })
})()
