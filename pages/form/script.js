let formContainer,
    col1,
    fname,
    sname,
    date,
    flat,
    col2,
    street,
    house,
    payCash,
    payCard,
    gifts = [],
    submitButton,
    errorMessage,
    order,
    totalPriceCart,
    sum = 0,
    validation = [false, false, false, false, false, false]


const now = new Date()
const minDate = String(now.getFullYear()) + '-0' +  String(now.getMonth() + 1) + '-0' + String(now.getDate() + 1) + 'T00:00'


function init(){
    createHtmlLayout()
    getLocalData()
    fillCart()
}

function createHtmlLayout(){
    formContainer = document.createElement('section')
    formContainer.classList.add('form-container')

    col1 = document.createElement('section')
    col1.classList.add('col')
    col2 = document.createElement('section')
    col2.classList.add('col')

    labelFName  = document.createElement('label')
    labelFName.setAttribute('for', 'first-name')
    labelFName.textContent = 'First name'
    fname = document.createElement('input')
    fname.setAttribute('type', 'text')
    fname.setAttribute('id', 'first-name')
    fname.setAttribute('name', 'firstname')
    fname.setAttribute('placeholder', 'Jonh')
    fname.onblur = nameValid
    labelSName  = document.createElement('label')
    labelSName.setAttribute('for', 'second-name')
    labelSName.textContent = 'Second name'
    sname = document.createElement('input')
    sname.setAttribute('type', 'text')
    sname.setAttribute('id', 'second-name')
    sname.setAttribute('name', 'secondname')
    sname.setAttribute('placeholder', 'Smith')
    sname.onblur = surNameValid
    labelFlat = document.createElement('label')
    labelFlat.setAttribute('for', 'flat-number')
    labelFlat.textContent = 'Flat number'
    flat = document.createElement('input')
    flat.setAttribute('type', 'text')
    flat.setAttribute('id', 'flat-number')
    flat.setAttribute('name', 'flatnumber')
    flat.setAttribute('placeholder', 'XXX-X')
    flat.onblur = flatValid
    labelDate = document.createElement('label')
    labelDate.setAttribute('for', 'date')
    labelDate.textContent = 'Select date'
    date = document.createElement('input')
    date.setAttribute('type', 'datetime-local')
    date.setAttribute('id', 'date')
    date.onblur = dateValid
    date.min = minDate
    labelStreet = document.createElement('label')
    labelStreet.setAttribute('for', 'street')
    labelStreet.textContent = 'Street'
    street = document.createElement('input')
    street.setAttribute('type', 'text')
    street.setAttribute('id', 'street')
    street.setAttribute('name', 'street')
    street.setAttribute('placeholder', 'Wiverna st.')
    street.onblur = streetValid
    labelHouse = document.createElement('label')
    labelHouse.setAttribute('for', 'house-number')
    labelHouse.textContent = 'House number'
    house = document.createElement('input')
    house.setAttribute('type', 'text')
    house.setAttribute('id', 'house-number')
    house.setAttribute('name', 'house-number')
    house.setAttribute('placeholder', '13')
    house.onblur = houseValid

    labelCash = document.createElement('label')
    labelCash.classList.add('payment')
    payCash = document.createElement('input')
    payCash.setAttribute('type', 'radio')
    payCash.setAttribute('id', 'cash')
    payCash.setAttribute('value', 'cash')
    payCash.setAttribute('name', 'pay')
    payCash.checked = true
    labelCashText = document.createElement('label')
    labelCashText.setAttribute('for', 'cash')
    labelCashText.textContent = 'Cash'
    labelCash.append(payCash, labelCashText)
    labelCard = document.createElement('label')
    labelCard.classList.add('payment')
    payCard = document.createElement('input')
    payCard.setAttribute('type', 'radio')
    payCard.setAttribute('id', 'card')
    payCard.setAttribute('value', 'card')
    payCard.setAttribute('name', 'pay')
    labelCardText = document.createElement('label')
    labelCardText.setAttribute('for', 'card')
    labelCardText.textContent = 'Card'
    labelCard.append(payCard, labelCardText)

    selectGift1 = document.createElement('select')
    option1 = document.createElement('option')
    option1.setAttribute('value', 'pack')
    option1.textContent = 'Pack as gift'
    option2 = document.createElement('option')
    option2.setAttribute('value', 'postcard')
    option2.textContent = 'Add postcard'
    option3 = document.createElement('option')
    option3.setAttribute('value', 'discount')
    option3.textContent = 'Provide 2% discount to the next time'
    option4 = document.createElement('option')
    option4.setAttribute('value', 'pen')
    option4.textContent = 'Branded pen or pencil'
    selectGift1.append(option1, option2, option3, option4)
    selectGift2 = selectGift1.cloneNode(true)

    col1.append(labelFName, fname, labelSName, sname, labelDate, date, labelCash, selectGift2)
    col2.append(labelStreet, street, labelHouse, house, labelFlat, flat, labelCard, selectGift1)
    submitButton = document.createElement('button')
    submitButton.setAttribute('type', 'submit')
    submitButton.classList.add('complete-button')
    submitButton.textContent = 'Complete'
    submitButton.disabled = true
    submitButton.onclick = showOrder

    errorMessage = document.createElement('h3')
    errorMessage.classList.add('error-hide')

    formContainer.append(col1, col2, errorMessage, submitButton)
    document.body.append(formContainer)


    cart = document.createElement('section')
    cart.classList.add('cart')

    totalPriceCart = document.createElement('p')
    totalPriceCart.classList.add('total-price')

    cart.append(totalPriceCart)

    document.body.prepend(cart)

}

function getLocalData(){
    order = localStorage.getItem('cart').split(',').map(Number)
    order.forEach(elem => sum += books[elem].price)
    totalPriceCart.textContent = 'Total price: ' + String(sum) + '$'
}

function createCartItem(i){
    item = document.createElement('section')
    item.classList.add('cart-item')

    img = document.createElement('img')
    img.classList.add('book-img')
    img.setAttribute('src', books[i].imageLink)

    data = document.createElement('section')
    data.classList.add('cart-data')

    title = document.createElement('p')
    title.classList.add('cart-title')
    title.textContent = String(books[i].title)

    author = document.createElement('p')
    author.classList.add('author')
    author.textContent = String(books[i].author)

    price = document.createElement('p')
    price.classList.add('cart-price')
    price.textContent = "Price: " + String(books[i].price)

    data.append( title, author, price)

    removeButton = document.createElement('button')
    removeButton.classList.add('remove-button')
    removeButton.textContent = 'Remove'

    totalPriceCart.textContent = 'Total price: ' + String(sum) + '$'

    item.append(img, data, removeButton)
    cart.prepend(item)

    cartItems = document.querySelectorAll('.cart-item')

    removeButtonContainer = document.querySelectorAll('.remove-button')

    initRemoveButton()
}

function fillCart(){
    for (let i = 0; i < order.length; i++){
        createCartItem(i)
    }
}

function initRemoveButton(){
    for (let i = 0; i < removeButtonContainer.length; i++){
        removeButtonContainer.item(i).onclick = removeBook(i)
    }
}

function removeBook(i){
    return function(){
        cartItems.item(i).remove()
        sum = sum - books[order[i]].price
        totalPriceCart.textContent = 'Total price: ' + String(sum) + '$'
        order.splice(i, 1)
        cartItems = document.querySelectorAll('.cart-item')
        removeButtonContainer = document.querySelectorAll('.remove-button')
        initRemoveButton()
    }
}

//form              validation
//fname              length > 5; only str; no spaces
//sname              length > 6; only str; no spaces
//date               next day and >
//street             length > 6; str + num
//house              positive num
//flat               positive numbers + dash ('-')
//payment            only 1 chose
//gifts              2 chose items

function nameValid(){
    let regexp = /^[a-z]{4,}$/gi
    if (!regexp.test(fname.value)){
        if (!fname.classList.contains('invalid')){
            fname.classList.add('invalid')
            errorMessage.classList.add('error-show')
            errorMessage.textContent = 'Please write correct firstname'
        }
        validation[0] = false
    }else{
        fname.classList.remove('invalid')
        errorMessage.classList.remove('error-show')
        errorMessage.textContent = ''
        validation[0] = true
    }
    unlockCompleteButton()
}
function surNameValid(){
    let regexp = /^[a-z]{5,}$/gi
    if (!regexp.test(sname.value)){
        if (!sname.classList.contains('invalid')){
            sname.classList.add('invalid')
            errorMessage.classList.add('error-show')
            errorMessage.textContent = 'Please write correct surname'
        }
        validation[1] = false
    }else{
        sname.classList.remove('invalid')
        errorMessage.classList.remove('error-show')
        errorMessage.textContent = ''
        validation[1] = true
    }
    unlockCompleteButton()
}
function dateValid(){
    let a = date.value.split('T')
    let dateArr = a[0].split('-')
    let b = minDate.split('T')
    let minDateArr  = b[0].split('-')
    let val = []
    for (let i = 0; i < dateArr; i++){
        val[i] = dateArr[i] >= minDateArr[i];
    }
    if (val.includes(false)){

        if (!date.classList.contains('invalid')){
            date.classList.add('invalid')
            errorMessage.classList.add('error-show')
            errorMessage.textContent = 'Please write correct surname'
        }
        validation[2] = false
    }else{
        date.classList.remove('invalid')
        errorMessage.classList.remove('error-show')
        errorMessage.textContent = ''
        validation[2] = true
    }
    unlockCompleteButton()

}
function streetValid(){
    let regexp = /^([a-z]*\s*[a-z]*){5,}$/gi
    if (!regexp.test(street.value) || street.value.length < 5){
        if (!street.classList.contains('invalid')){
            street.classList.add('invalid')
            errorMessage.classList.add('error-show')
            errorMessage.textContent = 'Please write correct street'
        }
        validation[3] = false
    }else{
        street.classList.remove('invalid')
        errorMessage.classList.remove('error-show')
        errorMessage.textContent = ''
        validation[3] = true
    }
    unlockCompleteButton()
}
function houseValid(){
    if (Number(house.value) < 0 || isNaN(Number(house.value))){
        if (!house.classList.contains('invalid')){
            house.classList.add('invalid')
            errorMessage.classList.add('error-show')
            errorMessage.textContent = 'Please write correct house number'
        }
        validation[4] = false
    }else{
        house.classList.remove('invalid')
        errorMessage.classList.remove('error-show')
        errorMessage.textContent = ''
        validation[4] = true
    }
    unlockCompleteButton()
}
function flatValid(){
    let regexp = /^[0-9]+-*[0-9]*$/gi
    if (!regexp.test(flat.value)){
        if (!flat.classList.contains('invalid')){
            flat.classList.add('invalid')
            errorMessage.classList.add('error-show')
            errorMessage.textContent = 'Please write correct flat number'
        }
        validation[5] = false
    }else{
        flat.classList.remove('invalid')
        errorMessage.classList.remove('error-show')
        errorMessage.textContent = ''
        validation[5] = true
    }
    unlockCompleteButton()
}

function unlockCompleteButton(){
    if (!validation.includes(false)){
        submitButton.disabled = false
    }
}

function showOrder(){
    alert('The order created! \nThe delivery address ' + street.value + ' house ' + house.value + ' flat ' + flat.value + '. Customer ' + fname.value + ' ' + sname.value)
}

window.onload = init