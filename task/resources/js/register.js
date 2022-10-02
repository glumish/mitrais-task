class Register
{
  run()
  {
    this.bindSubmit()
  }

  bindSubmit()
  {
    const submit = document.querySelector('#register-btn')

    submit.onclick = (e) => {
      const form = e.target.closest('form')
      const valid = this.validate(form)
      const validPass = this.passConfirm(form)

      if (valid && validPass) {
        this.sendRequest(form)
      }
    }
  }

  validate(form)
  {
    const invalid = []

    for (let item of form.querySelectorAll('.form-control')) {
      if (item.required && !item.value) {

        this.setInvalid(item, 'Field cannot be left blank')

        invalid.push(true)

        continue
      }

      this.setInvalid(item)
    }

    return !invalid.includes(true)
  }

  passConfirm(form)
  {
    const pass_verify = form.querySelector('[name=pass_verify]')
    const password = form.querySelector('[name=password]')

    const valid = pass_verify.value == password.value

    if (!password.value) {
      return valid
    }

    if (!valid) {

      this.setInvalid(pass_verify, 'Password not match')

      return valid
    }

    this.setInvalid(pass_verify)

    return valid
  }

  setInvalid(el, msg=null)
  {
    if (!msg) {
      el.closest('.border').classList.remove('border-danger')
      const label = el.parentNode.querySelector('small')

      if (label) {
        el.parentNode.removeChild(label)
      }

      return
    }

    el.focus()
    el.closest('.border').classList.add('border-danger')
    el.parentNode.appendChild(this.alertText(msg))
  }

  alertText(text)
  {
    const element = document.createElement('small')
    element.classList.add(...'invalid text-danger'.split(' '))

    element.innerHTML = text

    return element
  }

  disableAll()
  {
    const form = document.querySelector('form')
    const btn = document.querySelector('#register-btn')

    for (let item of form) {
      item.classList.add('disabled')
      item.disabled = true
    }

    btn.classList.add('disabled')
    btn.disabled = true
  }

  showLogin()
  {
    const loginbtn = document.querySelector('#login-btn')

    loginbtn.parentNode.classList.remove('d-none')
  }

  sendRequest(form)
  {
    const data = new FormData(form)

    fetch('', {
      method: 'POST',
      headers: {
        'X-CSRFTOKEN': Cookies.get('csrftoken')
      },
      body: data
    })
      .then((res) => {
        if (res.status == 400) {
          return res.json()
        }

        if (res.status == 500) {
          alert('Something went wrong')

          return res.json()
        }
      })

      .then((res) => {
        if (!res) {

          this.disableAll()
          this.showLogin()

          return
        }

        this.showErrorField(res)
      })
  }

  showErrorField(res) {
    const element = document.querySelector(`[name="${res.name}"`)

    if (element) {
      element.focus()

      this.setInvalid(element, res.message)
    }
  }
}


new Register().run()