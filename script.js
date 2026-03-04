// inicial data
const c = el=> document.querySelector(el)
const cs = el=> document.querySelectorAll(el)

// events
// functions

pizzaJson.map((item, index)=>{
    let pizzaItem = c('.models .pizza-item').cloneNode(true)
    
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${(item.price.toFixed(2))}`
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        
        e.preventDefault()
        c('.pizzaWindowArea').style.opacity = 0
        c('.pizzaWindowArea').style.display = 'flex'
        setTimeout(() => {
            c('.pizzaWindowArea').style.opacity = 1
        }, 200);
        

        c('.pizzaWindowArea .pizzaWindowBody .pizzaBig img').src = item.img
        c('.pizzaWindowArea .pizzaWindowBody .pizzaInfo h1').innerHTML = item.name
        c('.pizzaWindowArea .pizzaWindowBody .pizzaInfo .pizzaInfo--desc').innerHTML = item.description

        cs(".pizzaInfo--size").forEach((sizeEl)=>{
            sizeEl.addEventListener('click', (e)=>{
                cs(".pizzaInfo--size").forEach((a)=>{
                    a.classList.remove('selected')
                })
                e.target.classList.add('selected')
            })
        })
        


    })

    c('.pizza-area').append(pizzaItem)
})