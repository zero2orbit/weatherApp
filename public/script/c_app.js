console.log('client side js')



const weatherForm = document.querySelector('form')
const search  = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    messageOne.textContent = 'Loading....'
    messageTwo.textContent =''
    e.preventDefault()
    const location = search.value
    if (location.length == 0) {
        return console.log('Enter Location')
    }

    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
       if (data.error) {
        messageOne.textContent = data.error
       }else{
        console.log(data)
        messageOne.textContent = data.Address
        messageTwo.textContent = data.Forcast
       
       }
    })
})


})