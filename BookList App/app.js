// Book class: Represents a book

class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

}

// UI Class: Handles IU tasks
class UI {
    static displayBooks() {
        const StoredBooks = [
            {
                title: 'Book one',
                author: 'Juan Carlos Pelotudo',
                isbn: '3434434'
            },
            {
                title: 'Book two',
                author: 'Susana Horia',
                isbn: '45545'
            }
        ];
        const books = StoredBooks;

        books.forEach((book) => UI.addBookToList(book))
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
    
          list.appendChild(row);
        

    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    static deleteBook(el) {
        // if the clicked element contains the class delete, then gets erased
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove()

        }
    }
}

// Store class: Handles storage

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks); 

// Event: Add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {

   // Prevent actual submit
   e.preventDefault();

   // Get form values
   const title = document.querySelector('#title').value;
   const author = document.querySelector('#author').value;
   const isbn = document.querySelector('#isbn').value;

   // Validate
   if (title == '' || author == '' || isbn == ''){
       alert('Please fill in al fields');
   } else {

   //Instantiate book
   const book = new Book(title, author, isbn); 

   // Add Book to UI
   UI.addBookToList(book);
   
   // Clear Fields
   UI.clearFields();

   }

})


// Event: Remove a book
document.querySelector('#book-list').addEventListener('click', (e) => {
   UI.deleteBook(e.target)

});