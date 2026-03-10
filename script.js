// inicial data

let modalQT = 1
const c = el => document.querySelector(el)
const cs = el => document.querySelectorAll(el)
let modalKey = 0


// events
// functions

pizzaJson.map((item, index) => {
    let pizzaItem = c('.models .pizza-item').cloneNode(true)

    pizzaItem.setAttribute('data-key', index)
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${(item.price.toFixed(2))}`
    pizzaItem.querySelector('.pizza-item--img img').src = item.img


    // windowAREA
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault()

        // transition
        c('.pizzaWindowArea').style.opacity = 0
        c('.pizzaWindowArea').style.display = 'flex'
        setTimeout(() => {
            c('.pizzaWindowArea').style.opacity = 1
        }, 200);

        // data
        let key = e.target.closest('.pizza-item').getAttribute('data-key')
        modalKey = key
        modalQT = 1
        c('.pizzaBig img').src = pizzaJson[key].img
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name
        c('.pizzaInfo .pizzaInfo--desc').innerHTML = pizzaJson[key].description
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${(pizzaJson[key].price.toFixed(2))}`
        cs('.pizzaInfo--size').forEach((size, sizeIndex) => {
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
        })



        c('.pizzaInfo--qt').innerHTML = modalQT
    })

    c('.pizza-area').append(pizzaItem)

})


// modal events
cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal)
})

function closeModal() {
    c('.pizzaWindowArea').style.opacity = '0'
    setTimeout(() => {
        c('.pizzaWindowArea').style.display = 'none'
    }, 100)
}

c('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQT++
    c('.pizzaInfo--qt').innerHTML = modalQT
})
c('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if (modalQT > 1) {
        modalQT--
        c('.pizzaInfo--qt').innerHTML = modalQT
    }
})
// select option
cs('.pizzaInfo--size').forEach((e) => {
    e.addEventListener('click', (a) => {
        // remover
        c('.pizzaInfo--size.selected').classList.remove('selected')
        // adicionar
        a.currentTarget.classList.add('selected')

    })
})

// cart
let cart = []
c('.pizzaInfo--addButton').addEventListener('click', () => {
    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'))

    let identifier = pizzaJson[modalKey].id + '@' + size

    let key = cart.findIndex(item => item.identifier == identifier)
    if (key > -1) {
        cart[key].qt += modalQT
    } else {
        cart.push({
            id: pizzaJson[modalKey].id,
            identifier,
            size,
            qt: modalQT
        })
    }
    updateCart()
    closeModal()
})

c('.menu-openner').addEventListener('click', () => {
    if (cart.length > 0) {
        c('aside').style.left = '0'
    }
})
c('.menu-closer').addEventListener('click', () => {
    c('aside').style.left = '100vw'
})
function updateCart() {
    if (cart.length > 0) {
        c('aside').classList.add('show')
        c('.cart').innerHTML = ''

        let subtotal = 0
        let desconto = 0
        let total = 0

        for (let i in cart) {
            let cartIndex = Number(i)
            let pizzaItem = pizzaJson.find(item => item.id == cart[cartIndex].id)

            subtotal += pizzaItem.price * cart[cartIndex].qt
            let cartItem = c('.models .cart--item').cloneNode(true)

            let pizzaSizeName
            switch (cart[cartIndex].size) {
                case 0:
                    pizzaSizeName = 'P'
                    break
                case 1:
                    pizzaSizeName = 'M'
                    break
                case 2:
                    pizzaSizeName = 'G'
                    break
            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`

            cartItem.querySelector('img').src = pizzaItem.img
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[cartIndex].qt

            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[cartIndex].qt++
                updateCart()
            })

            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if (cart[cartIndex].qt <= 1) {
                    cart.splice(cartIndex, 1)
                    updateCart()
                    return
                }

                cart[cartIndex].qt--
                updateCart()
            })

            c('.cart').append(cartItem)
        }

        desconto = subtotal * 0.1
        total = subtotal - desconto

        c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`
        c('.menu-openner span').innerHTML = cart.length

    } else {
        c('aside').classList.remove('show')
        c('aside').style.left = '100vw'
        c('.menu-openner span').innerHTML = 0
    }
}



