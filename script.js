'use strict';

const myLibrary = [
  {
    id: 0,
    title: 'The Hobbit: Illustrated Edition',
    author: 'J.R.R. Tolkien',
    ISBN: '0544174224',
    pages: '366',
    read: true,
  },
  {
    id: 1,
    title: '1984',
    author: 'George Orwell',
    ISBN: '9780451524935',
    pages: '368',
    read: false,
  },
  {
    id: 2,
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    ISBN: '0596517742',
    pages: '176',
    read: true,
  },
];

let index = myLibrary.length;
const booksList = document.querySelector('.books-list');
const addBookButton = document.querySelector('button.add-book');
const confirmButton = document.querySelector('.confirm');
const cancelButton = document.querySelector('.cancel');
const addBookWindow = document.querySelector('.add-book-form');
const addBookForm = document.querySelector('#addbook');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const isbnInput = document.querySelector('#isbn');
const readCheckbox = document.querySelector('#read');

const toggleReadClass = function (elt, readStatus) {
  if (readStatus) {
    elt.textContent = 'Read';
    elt.classList.add('read');
  } else {
    elt.textContent = 'Not Read';
    elt.classList.remove('read');
  }
}

const displayBooks = function (list) {
  const books = list.reduce((fragment, { id, title, author, ISBN, pages, read }) => {
    const readButton = document.createElement('button');
    readButton.dataset.id = id;
    readButton.setAttribute('type', 'button');
    toggleReadClass(readButton, read);

    const delButton = document.createElement('button');
    const img = document.createElement('img');
    delButton.dataset.id = id;
    delButton.setAttribute('type', 'button');
    img.src = './images/x-circle.svg';

    const tr = document.createElement('tr');
    tr.appendChild(document.createElement('td')).textContent = title;
    tr.appendChild(document.createElement('td')).textContent = author;
    tr.appendChild(document.createElement('td')).textContent = ISBN;
    tr.appendChild(document.createElement('td')).textContent = pages;
    tr.appendChild(document.createElement('td')).appendChild(readButton).textContent = read ? 'Read' : 'Not Read';
    tr.appendChild(document.createElement('td')).appendChild(delButton).appendChild(img);
    fragment.appendChild(tr);

    return fragment;
  }, document.createDocumentFragment());

  booksList.appendChild(books);
};

const setButtonStyle = function (variable, value) {
  addBookButton.style.setProperty(variable, value);
};

const showForm = function () {
  setButtonStyle('--color', 'var(--normal)');
  setButtonStyle('--bgcolor', 'var(--accent3)');
  addBookWindow.classList.add('show-form');
  titleInput.focus();
};

const revert = function () {
  setButtonStyle('--color', 'var(--accent3)');
  setButtonStyle('--bgcolor', 'transparent');
  addBookWindow.classList.remove('show-form');
  resetForm();
}

const hideForm = function (e) {
  if (e.currentTarget === addBookButton
    || e.currentTarget === addBookWindow) {
    e.stopPropagation();
    return;
  }

  revert();
}

const removeEmptyRow = function () {
  const target = document.querySelector('table').rows[1];

  document.querySelector('tbody').removeChild(target);
}

const confirmAdd = function (e) {
  e.preventDefault();

  if (titleInput.value.trim() === '') {
    titleInput.previousElementSibling.setAttribute('data-error', 'Please enter a book title');
    titleInput.focus();
    return;
  }

  if (myLibrary.length === 0) removeEmptyRow();

  myLibrary.push(new Book(
    index++,
    titleInput.value,
    authorInput.value,
    isbnInput.value,
    pagesInput.value,
    readCheckbox.checked,
  ));

  displayBooks(myLibrary.slice(-1));

  revert();
}

const resetForm = function () {
  titleInput.value = '';
  authorInput.value = '';
  isbnInput.value = '';
  pagesInput.value = '';
  readCheckbox.checked = false;
  titleInput.previousElementSibling.setAttribute('data-error', '');
}

const setRead = function (e) {
  if (e.target.textContent !== 'Read' && e.target.textContent !== 'Not Read') return;

  const targetBook = myLibrary.find(book => book.id === parseInt(e.target.dataset.id, 10));
  targetBook.read = !targetBook.read;
  toggleReadClass(e.target, targetBook.read);
}

const createEmptyRow = function () {
  const numOfColumns = document.querySelector('table').rows[0].cells.length;
  const td = document.createElement('td');

  td.setAttribute('colspan', numOfColumns);
  td.classList.add('emptyrow');

  booksList.appendChild(document.createElement('tr'))
    .appendChild(td)
    .appendChild(document.createTextNode('It\'s a little empty here...please add some books'));
}

const deleteBook = function (e) {
  if (!e.target.matches('img[src*="x-circle"]')) return;

  const id = myLibrary.findIndex(
    book => book.id === parseInt(e.target.parentElement.dataset.id, 10)
  );
  const deleteTarget = e.target.closest('tr');
  booksList.removeChild(deleteTarget);
  myLibrary.splice(id, 1);

  if (myLibrary.length === 0) createEmptyRow();
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
document.addEventListener('keydown', e => { if (e.key === 'Escape') revert(); });
booksList.addEventListener('click', setRead);
booksList.addEventListener('click', deleteBook);
addBookButton.addEventListener('click', showForm);
addBookButton.addEventListener('click', hideForm);
addBookWindow.addEventListener('click', hideForm);
// confirmButton.addEventListener('submit', confirmAdd);
addBookForm.addEventListener('submit', confirmAdd)
cancelButton.addEventListener('click', revert);
titleInput.addEventListener('input', () => titleInput.previousElementSibling.setAttribute('data-error', ''));
