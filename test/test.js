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
    closeButton,
    closeButtonContainer,
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
    sum = 0,
    removeButton,
    removeButtonContainer,
    bookId = []

    let books = [
    {
        "author": "Douglas Crockford",
        "imageLink": "../Covers/dCrockford.jpeg",
        "title": "JavaScript: The Good Parts: The Good Parts",
        "price": 30,
        "description": "With JavaScript: The Good Parts, you'll discover a beautiful, elegant, lightweight and highly expressive language that lets you create effective code, whether you're managing object libraries or just trying to get Ajax to run fast. If you develop sites or applications for the Web, this book is an absolute must"
    },
    {
        "author": "David Herman",
        "imageLink": "../Covers/dHerman.jpeg",
        "title": "Effective JavaScript: 68 Specific Ways to Harness the Power of JavaScript",
        "price": 22,
        "description": "Effective JavaScript is organized around 68 proven approaches for writing better JavaScript, backed by concrete examples. You’ll learn how to choose the right programming style for each project, manage unanticipated problems, and work more successfully with every facet of JavaScript programming from data structures to concurrency"
    },
    {
        "author": "David Flanagan",
        "imageLink": "../Covers/dFlanagan.jpeg",
        "title": "JavaScript: The Definitive Guide",
        "price": 40,
        "description": "This Fifth Edition is completely revised and expanded to cover JavaScript as it is used in today's Web 2.0 applications. This book is both an example-driven programmer's guide and a keep-on-your-desk reference, with new chapters that explain everything you need to know to get the most out of JavaScript"
    },
    {
        "author": " Eric Elliott",
        "imageLink": "../Covers/eElliott.jpeg",
        "title": "Programming JavaScript Applications",
        "price": 19,
        "description": "Take advantage of JavaScript’s power to build robust web-scale or enterprise applications that are easy to extend and maintain. By applying the design patterns outlined in this practical book, experienced JavaScript developers will learn how to write flexible and resilient code that’s easier—yes, easier—to work with as your code base grows.",
        "img": "Covers/eElliott.jpeg"
    },
    {
        "author": "Addy Osmani",
        "imageLink": "../Covers/aOsmani.jpeg",
        "title": "Learning JavaScript Design Patterns",
        "price": 32,
        "description": "With Learning JavaScript Design Patterns, you’ll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you.",
        "img": "Covers/aOsmani.jpeg"
    },
    {
        "author": "Boris Cherny",
        "imageLink": "../Covers/bCherny.jpeg",
        "title": "Programming TypeScript",
        "price": 28,
        "description": "Any programmer working with a dynamically typed language will tell you how hard it is to scale to more lines of code and more engineers. That’s why Facebook, Google, and Microsoft invented gradual static type layers for their dynamically typed JavaScript and Python code. This practical book shows you how one such type layer, TypeScript, is unique among them: it makes programming fun with its powerful static type system.",
        "img": "Covers/bCherny.jpeg"
    },
    {
        "author": "Alex Banks, Eve Porcello",
        "imageLink": "../Covers/aBanks.jpeg",
        "title": "Learning React, 2nd Edition",
        "price": 25,
        "description": "If you want to learn how to build efficient React applications, this is your book. Ideal for web developers and software engineers who understand how JavaScript, CSS, and HTML work in the browser, this updated edition provides best practices and patterns for writing modern React code. No prior knowledge of React or functional JavaScript is necessary.",
        "img": "Covers/aBanks.jpeg"
    },
    {
        "author": "Bradley Meck Alex Young and Mike Cantelon",
        "imageLink": "../Covers/bMeck.jpeg",
        "title": "Node.js in Action",
        "price": 38,
        "description": "Node.js in Action, Second Edition is a thoroughly revised book based on the best-selling first edition. It starts at square one and guides you through all the features, techniques, and concepts you'll need to build production-quality Node applications.",
        "img": "Covers/bMeck.jpeg"
    },
    {
        "author": "Kyle Simpson",
        "imageLink": "../Covers/kSimpson.jpeg",
        "title": "You Don't Know JS Yet: Get Started",
        "price": 26,
        "description": "It seems like there's never been as much widespread desire before for a better way to deeply learn the fundamentals of JavaScript. But with a million blogs, books, and videos out there, just where do you START? Look no further!",
        "img": "Covers/kSimpson.jpeg"
    },
    {
        "author": "John Resig and Bear Bibeault",
        "imageLink": "../Covers/jResig.jpeg",
        "title": "Secrets of the JavaScript Ninja",
        "price": 33,
        "description": "Secrets of the Javascript Ninja takes you on a journey towards mastering modern JavaScript development in three phases: design, construction, and maintenance. Written for JavaScript developers with intermediate-level skills, this book will give you the knowledge you need to create a cross-browser JavaScript library from the ground up.",
        "img": "Covers/jReisg.jpeg"
    }
]

function init(){
    createHtmlVer()
    createBooks()
    createPopUp()
    initButtons()
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

    overlay = document.createElement('section')
    overlay.classList.add('overlay')

    cart.append(totalPriceCart)
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
    price.textContent = String(books[i].price)

    data.append(title, author, price)

    removeButton = document.createElement('button')
    removeButton.classList.add('remove-button')
    removeButton.textContent = 'Remove'

    //how update information?????
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

        closeButton = document.createElement('button')
        closeButton.classList.add('close-button')
        closeButton.textContent = 'Close'

        xButton = document.createElement('button')
        xButton.classList.add('x-button')
        xButton.textContent = 'X'

        popUp.append(xButton, description, closeButton)
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
        closeButtonContainer.item(i).addEventListener("click", hidePopUp(i))
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

function initRemoveButton(){
    for (let i = 0; i < removeButtonContainer.length; i++){
        removeButtonContainer.item(i).addEventListener("click", removeBook(bookId[i]))
    }
}

function removeBook(i){
    return function(){
        cartItems.item(i).remove()
        sum = sum - books[i].price
        totalPriceCart.textContent = 'Total price: ' + String(sum) + '$'
        cartItems = document.querySelectorAll('.cart-item')
        bookId.splice(i, 1)
    }
}

function showPopUp(i){
    return function(){
        popUpContainer[i].classList.add('show-popup')
        overlay.classList.add('show-overlay')
    }
}

function hidePopUp(i){
    return function(){
        popUpContainer[i].classList.remove('show-popup')
    }
}

window.onload = init