window.onload = onLoad;

const d = document;
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// * init components for add book page
function onLoad() {
  // initialize Tagify on the above input node reference
  new Tagify($("input[name=tags]"));
  const form = $("#formBook");
  form.addEventListener("submit", addBook);
}

// * add a book from the form
function addBook(event) {
  event.preventDefault();

  const name = event.target.bookName.value;
  const author = event.target.bookAuthor.value;
  const image = event.target.bookImage.value;
  const tags = [];

  JSON.parse(event.target.bookTags.value).flatMap((data) =>
    tags.push(data.value)
  );

  const book = {
    name,
    author,
    image,
    tags,
  };

  addBookJson(book);
  alert("Book added!");
  globalThis.location.href = "/pages/Main/main.html";
  
}

// * add a book to the local storage
function addBookJson(newBook) {
  const currentBooks = localStorage.getItem("books");
  if (!currentBooks) localStorage.setItem("books", JSON.stringify([newBook]));
  else {
    const books = JSON.parse(currentBooks);
    books.push(newBook);
    localStorage.setItem("books", JSON.stringify(books));
  }
}

