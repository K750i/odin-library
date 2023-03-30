let myLibrary = [
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    rating: 5,
    pages: 366,
    read: true,
  },
  {
    title: '1984',
    author: 'George Orwell',
    rating: 0,
    pages: 368,
    read: false,
  },
];

const booksList = document.querySelector('.books-list');

const addBookToLibrary = function () {
  // do stuff here
};

const showAllBooks = function () {
  const books = myLibrary.reduce((fragment, curBook) => {
    const tr = document.createElement('tr');
    tr.appendChild(document.createElement('td')).textContent = curBook.title;
    tr.appendChild(document.createElement('td')).textContent = curBook.author;
    tr.appendChild(document.createElement('td')).textContent = curBook.rating;
    tr.appendChild(document.createElement('td')).textContent = curBook.pages;
    tr.appendChild(document.createElement('td')).textContent = curBook.read;
    fragment.appendChild(tr);
    return fragment;
  }, document.createDocumentFragment());

  booksList.appendChild(books);
};

function Book() {
  // the constructor...
}

window.addEventListener('load', showAllBooks);