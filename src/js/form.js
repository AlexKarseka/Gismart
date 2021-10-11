'use strict'

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form')
    form.addEventListener('submit', formSend)

    async function formSend(e) {
        e.preventDefault()

        const userList = document.getElementById("user_list")

        let error = formValidate(form)

        const user = {
            firstName: document.querySelector('[name = "firstName"]').value,
            lastName: document.querySelector('[name = "lastName"]').value,
            picture: document.querySelector('[name ="avatar"]').value,
            title: document.querySelector('[name ="title"]').value,
            email: document.querySelector('[name ="email"]').value
        };

        // передача данных серверу и получение json файла и передача его в DOM 
        if (error === 0) {
            const url = 'https://dummyapi.io/data/v1/user/create';
        
            const config = {
                method: "POST",
                headers: {
                    'app-id': '6154537832884b1a024b2f3c',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            }
            fetch(url, config)
            .then((response) => response.json())
            .then((user) => {
                const newUser = (user)
                userList.insertAdjacentHTML('beforeend',            
                    `<li class="list__container-user">
                        <div class="picture__user">
                            <img class="picture__user-img" src="${newUser.picture}" alt="user">
                        </div>
                        <div class="info__user">
                            <div class="title__user style__text">${newUser.title}</div>
                            <div class="firstName__user style__text">${newUser.firstName}</div>
                            <div class="lastName__user style__text">${newUser.lastName}</div>
                        </div>
                    </li>`)
            })
            if (error === 0) {
                form.reset()
                formCloser()
                alert('Congratulations! Data are submitted successfully!=)')
            } else {
                alert('Ошибка')
            }
        } else {
            alert('The form is filled out incorrectly')
        }
    }

    // Валидация формы
    function formValidate(form) {
        let error = 0
        let formReq = document.querySelectorAll('._req')

        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i]
            formRemoveError(input)

            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input)
                    error++
                }
            } else if (input.classList.contains('_name')) {
                if (firstAndLastNameTest(input)) {
                    formAddError(input)
                    error++
                }
            } else {
                if (input.value === '') {
                    formAddError(input)
                    error++
                }
            }
        }
        return error
    }

    function formAddError(input) {
        input.parentElement.classList.add('_error')
        input.nextElementSibling.classList.add('_error')
        input.classList.add('_error')
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error')
        input.nextElementSibling.classList.remove('_error')
        input.classList.remove('_error')
    }

    // Валидация email
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
    }

    // Валидация first и last name
    function firstAndLastNameTest(input) {
        return !/^[a-zA-Zа-яА-ЯёЁ]{2,}$/.test(input.value)
    }
})

// Закрытие формы, открытие лист
function formCloser() {
    const form = document.querySelector('.form__wrapper')
    const list = document.querySelector('.list')
    form.style.display = 'none'
    list.style.display = 'block'
}