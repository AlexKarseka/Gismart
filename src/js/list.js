'use strict'

const button = document.getElementById('user__button')
const form = document.querySelector('.form__wrapper')
const list = document.querySelector('.list')

// Открытие формы и закрытие листа
button.onclick = (() => {
    form.style.display = 'block'
    list.style.display = 'none'
})