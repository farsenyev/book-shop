let mainContainer,
    bookContainer

function init(){
    createHtmlVer()
    createBooks()
}

function createHtmlVer(){
    mainContainer = document.createElement('section')
    mainContainer.classList.add('')

    bookContainer = document.createElement('section')
    bookContainer.classList.add('')


}

function createBooks(){
    for (let i = 0; i < books.length; i++){
        let book = document.createElement('section')
        book.classList.add('book-item')

        let bookImg = document.createElement('img')
        bookImg.setAttribute('src', books[i].imageLink)

        let bookName = document.createElement('p')
        bookName.classList.add('')
        bookName.textContent = books[i].title

        

        book.append(bookImg)
        book.append(bookName)

        bookContainer.append(book)
    }
}

window.onload = init