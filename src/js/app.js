'use strict'

function createUserCard(item) {
        return (
            `<li class="list__container-user">
                <div class="picture__user">
                    <img class="picture__user-img" src="${item.picture}" alt="user">
                </div>
                <div class="info__user">
                    <div class="title__user style__text">${item.title}</div>
                    <div class="firstName__user style__text">${item.firstName}</div>
                    <div class="lastName__user style__text">${item.lastName}</div>
                </div>
            </li>`
        )
    } 

// Receiving an array from the server, passing it to the DOM
async function getUserInfo(container) {
    const url = 'https://dummyapi.io/data/v1/user'
    const config = {
    method: "GET",
    headers: {
        'app-id': '6154537832884b1a024b2f3c',
        'Content-Type': 'application/json',
        }
    }
    const response = await fetch(url, config)
    const users = await response.json()
    users.data.forEach(ele => {
        container.insertAdjacentHTML('beforeend', createUserCard(ele))
    })
}

const userList = document.getElementById("user_list");

getUserInfo(userList)