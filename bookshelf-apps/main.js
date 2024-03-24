document.addEventListener('DOMContentLoaded', function(){
    const bookSubmit = document.getElementById('bookSubmit');
    bookSubmit.addEventListener('click', function(event) {
        event.preventDefault();
        addBook();
    });
    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

function addBook() {
    const inputBookTitle =  document.getElementById('inputBookTitle').value;
    const inputBookAuthor = document.getElementById('inputBookAuthor').value;
    const inputBookYear = document.getElementById('inputBookYear').value;
    const inputBookIsComplete = document.getElementById('inputBookIsComplete').checked;

    const generateID = generateId();
    const bookObject = generateBookObject(generateID, inputBookTitle, inputBookAuthor, inputBookYear, inputBookIsComplete);
    books.push(bookObject);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function generateId(){
    return +new Date();
}

function generateBookObject(id, title, author, year, isCompleted){
    return {
        id,
        title,
        author,
        year,
        isCompleted
    }
}

const books = [];
const RENDER_EVENT = 'render-book';
const SAVED_EVENT = 'saved-book';
const STORAGE_KEY = 'BOOKSHELF_APPS';

function saveData() {
    if (isStorageExist()) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}

function isStorageExist() {
    return typeof(Storage) !== 'undefined';
}

document.addEventListener(SAVED_EVENT, function () {
    console.log(localStorage.getItem(STORAGE_KEY));
});

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    if (serializedData !== null) {
        const data = JSON.parse(serializedData);
        data.forEach(book => books.push(book));
        document.dispatchEvent(new Event(RENDER_EVENT));
    }
}

document.addEventListener(RENDER_EVENT, function () {
    const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
    const completeBookshelfList = document.getElementById('completeBookshelfList');

    incompleteBookshelfList.innerHTML = '';
    completeBookshelfList.innerHTML = '';

    books.forEach(book => {
        const bookItem = createBookItem(book);
        if (book.isCompleted) {
            completeBookshelfList.appendChild(bookItem);
        } else {
            incompleteBookshelfList.appendChild(bookItem);
        }
    });
});

function createBookItem(book) {
    const article = document.createElement('article');
    article.classList.add('book_item');

    article.innerHTML = `
        <h3>${book.title}</h3>
        <p>Penulis: ${book.author}</p>
        <p>Tahun: ${book.year}</p>
        <div class="action">
            <button class="toggle-read">${book.isCompleted ? 'Belum selesai dibaca' : 'Selesai dibaca'}</button>
            <button class="delete-book">Hapus buku</button>
        </div>
    `;

    const toggleReadButton = article.querySelector('.toggle-read');
    const deleteButton = article.querySelector('.delete-book');

    toggleReadButton.addEventListener('click', function() {
        book.isCompleted = !book.isCompleted;
        saveData();
        document.dispatchEvent(new Event(RENDER_EVENT));
    });

    deleteButton.addEventListener('click', function() {
        const index = books.indexOf(book);
        if (index !== -1) {
            books.splice(index, 1);
            saveData();
            document.dispatchEvent(new Event(RENDER_EVENT));
        }
    });

    return article;
}
