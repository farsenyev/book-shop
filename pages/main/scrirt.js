let mainContainer,
    bookContainer,
    book,
    bookArray,
    bookName,
    bookImg,
    addButton,
    addButtonContainer,
    moreButton,
    moreButtonContainer,
    description,
    xButton,
    xButtonContainer,
    popUp,
    popUpContainer = [],
    overlay,
    cart,
    totalPriceCart,
    cartCounter = 0,
    cartFill = [],
    cartItems,
    submitButton,
    submitButtonA,
    sum = 0,
    removeButton,
    removeButtonContainer,
    bookId = []

function init(){
    createHtmlVer()
    createBooks()
    createPopUp()
    initButtons()
    initDragNDrop()
    localStorage.clear()
}

function createHtmlVer(){
    mainContainer = document.createElement('section')
    mainContainer.classList.add('main-container')

    bookContainer = document.createElement('section')
    bookContainer.classList.add('book-container')

    cart = document.createElement('section')
    cart.classList.add('cart')

    totalPriceCart = document.createElement('p')
    totalPriceCart.classList.add('total-price')
    totalPriceCart.textContent = 'Total price: ' + String(sum) + '$'

    submitButton = document.createElement('button')
    submitButton.classList.add('submit-button')
    submitButton.textContent = 'Submit'
    submitButton.onclick = submit;

    submitButtonA = document.createElement('a')
    submitButtonA.setAttribute('href', '../../pages/form/index.html')
    submitButtonA.append(submitButton)

    overlay = document.createElement('section')
    overlay.classList.add('overlay')

    cart.append(totalPriceCart, submitButtonA)
    document.body.append(mainContainer, overlay)
    mainContainer.append(bookContainer, cart)
}

function createCartItem(i){
    item = document.createElement('section')
    item.classList.add('cart-item')

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
    price.textContent = "Price: " + String(books[i].price) + "$"

    data.append(title, author, price)

    removeButton = document.createElement('button')
    removeButton.classList.add('remove-button')
    removeButton.textContent = 'Remove'

    totalPriceCart.textContent = 'Total price: ' + String(sum) + '$'

    item.append(data, removeButton)
    cart.prepend(item)

    bookId.unshift(i)
    cartItems = document.querySelectorAll('.cart-item')

    removeButtonContainer = document.querySelectorAll('.remove-button')

    initRemoveButton()
}

function createBooks(){
    for (let i = 0; i < books.length; i++){
        book = document.createElement('section')
        book.classList.add('book-item')
        book.draggable = true

        bookImg = document.createElement('img')
        bookImg.setAttribute('src', books[i].imageLink)
        bookImg.classList.add('books-img')

        bookName = document.createElement('h4')
        bookName.classList.add('book-name')
        bookName.textContent = books[i].title

        addButton = document.createElement('button')
        addButton.classList.add('add-button')
        addButton.textContent = 'Add'

        moreButton = document.createElement('button')
        moreButton.classList.add('more-button')
        moreButton.textContent = 'More'

        book.append(bookImg)
        book.append(bookName)
        book.append(addButton)
        book.append(moreButton)


        bookContainer.append(book)
    }
    bookArray = document.querySelectorAll('.book-item')
    moreButtonContainer = document.querySelectorAll('.more-button')
    addButtonContainer = document.querySelectorAll('.add-button')
}

function createPopUp(){
    for (let i = 0; i < books.length; i++){
        popUp = document.createElement('section')
        popUp.classList.add('popup')

        description = document.createElement('p')
        description.classList.add('descr')
        description.textContent = books[i].description

        xButton = document.createElement('button')
        xButton.classList.add('x-button')
        xButton.textContent = 'X'

        popUp.append(xButton, description)
        mainContainer.append(popUp)

        popUpContainer.push(popUp)
    }
    closeButtonContainer = document.querySelectorAll('.close-button')
    xButtonContainer = document.querySelectorAll('.x-button')
}

function initButtons(){
    for (let i = 0; i < books.length; i++){
        moreButtonContainer.item(i).addEventListener("click", showPopUp(i))
        addButtonContainer.item(i).addEventListener("click", addBook(i))
        xButtonContainer.item(i).addEventListener("click", hidePopUp(i))
    }
}

function addBook(i){
    return function(){
        cartFill.push(bookArray.item(i))
        sum = sum + books[i].price
        cartCounter ++
        createCartItem(i)
    }
}

function submit(){
    localStorage.setItem('cart', bookId)
}

function initRemoveButton(){
    for (let i = 0; i < removeButtonContainer.length; i++){
        removeButtonContainer.item(i).onclick = removeBook(i)
    }
}

function removeBook(i){
    return function(){
        cartItems.item(i).remove()
        sum = sum - books[bookId[i]].price
        totalPriceCart.textContent = 'Total price: ' + String(sum) + '$'
        bookId.splice(i, 1)
        cartItems = document.querySelectorAll('.cart-item')
        removeButtonContainer = document.querySelectorAll('.remove-button')
        initRemoveButton()
    }
}

function showPopUp(i){
    return function(){
        let x = 0
        let y = 0
        let e = window.event
        if (e.pageX || e.pageY){
            x = e.pageX
            y = e.pageY
        }else{
            x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
            y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop
        }
        popUpContainer[i].classList.add('show-popup')
        popUpContainer[i].style.top = y + 'px'
        popUpContainer[i].style.left = x + 'px'
        overlay.classList.add('show-overlay')

    }
}

function mousePosition(event){
    popUp.style.top = event.clientY + 'px'
    popUp.style.left = event.clientX + 'px'
}

function hidePopUp(i){
    return function(){
        popUpContainer[i].classList.remove('show-popup')
    }
}

function initDragNDrop(){
    cart.addEventListener("dragover", (event) => {
        event.preventDefault()
    })
    for (let i = 0; i < bookArray.length; i++){
        bookArray.item(i).addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("item", String(i))
        })
    }
    cart.addEventListener("drop", (event) => {
        let id = Number(event.dataTransfer.getData('item'))
        cartFill.push(bookArray.item(id))
        sum = sum + books[id].price
        cartCounter ++
        createCartItem(id)
    })
}

window.onload = init