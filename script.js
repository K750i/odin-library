'use strict';

let index = 2;
let myLibrary = [
  {
    id: 0,
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    rating: '5',
    pages: '366',
    read: true,
  },
  {
    id: 1,
    title: '1984',
    author: 'George Orwell',
    rating: '0',
    pages: '368',
    read: false,
  },
];

const booksList = document.querySelector('.books-list');
const addBookButton = document.querySelector('button.add-book');
const confirmButton = document.querySelector('.confirm');
const cancelButton = document.querySelector('.cancel');
const addBookForm = document.querySelector('.add-book-form');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const ratingInput = document.querySelector('#rating');
const readCheckbox = document.querySelector('#read');
const deleteBtnText = '-';

const displayBooks = function (list) {
  const books = list.reduce((fragment, curBook) => {
    const tr = document.createElement('tr');
    const button = document.createElement('button');

    button.dataset.id = curBook.id;
    button.setAttribute('type', 'button');
    tr.appendChild(document.createElement('td')).textContent = curBook.title;
    tr.appendChild(document.createElement('td')).textContent = curBook.author;
    tr.appendChild(document.createElement('td')).textContent = curBook.rating;
    tr.appendChild(document.createElement('td')).textContent = curBook.pages;
    tr.appendChild(document.createElement('td')).textContent = curBook.read ? 'Read' : 'Not Read';
    tr.appendChild(document.createElement('td')).appendChild(button).textContent = deleteBtnText;
    fragment.appendChild(tr);

    return fragment;
  }, document.createDocumentFragment());

  booksList.appendChild(books);
};

const showForm = function () {
  addBookForm.classList.add('show-form');
};

const hideForm = function (e) {
  if (!addBookForm.classList.contains('show-form')) return;

  const formRect = addBookForm.getBoundingClientRect();
  const inFormRectX = e.clientX > formRect.x && e.clientX < (formRect.x + formRect.width);
  const inFormRectY = e.clientY > formRect.y && e.clientY < (formRect.y + formRect.height);

  if (!(inFormRectX && inFormRectY)) {
    addBookForm.classList.remove('show-form');
    resetForm();
  }
}

const confirmAdd = function () {
  myLibrary.push(new Book(
    index++,
    titleInput.value,
    authorInput.value,
    ratingInput.value,
    pagesInput.value,
    readCheckbox.checked,
  ));
  displayBooks(myLibrary.slice(-1));
  addBookForm.classList.remove('show-form');
  resetForm();
}

const cancelAdd = function () {
  addBookForm.classList.remove('show-form');
  resetForm();
}

const resetForm = function () {
  titleInput.value = '';
  authorInput.value = '';
  ratingInput.value = '';
  pagesInput.value = '';
  readCheckbox.checked = false;
}

const deleteBook = function (e) {
  if (e.target.textContent !== deleteBtnText) return;

  const id = myLibrary.findIndex(book => book.id === parseInt(e.target.dataset.id, 10));
  const deleteTarget = e.target.closest('tr');
  booksList.removeChild(deleteTarget);
  myLibrary.splice(id, 1);
}

function Book(id, title, author, rating, pages, read) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.rating = rating;
  this.pages = pages;
  this.read = read;
}

window.addEventListener('load', displayBooks(myLibrary));
document.addEventListener('click', hideForm);
booksList.addEventListener('click', deleteBook);
addBookButton.addEventListener('click', showForm);
confirmButton.addEventListener('click', confirmAdd);
cancelButton.addEventListener('click', cancelAdd);
