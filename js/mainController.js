window.onload = showBooks;

const d = document;
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// * Generate a list of books
function showBooks() {
  const allBooks = getBooks();
  const grid = $("#gridBooks");
  allBooks.forEach((book) => {
    grid.innerHTML += `
          <div class="col card p-0" style="max-width: 16rem; min-width: 14rem;" >
            <a href="#" class="pe-auto">
                <img src="${
                  book.image
                }" class="card-img-top zoom" alt="Cover book ...">
            </a>
            <div class="card-body">
              <h4 class="card-title text-capitalize text-dark">${book.name}</h4>
              <h5 class="card-title text-black-50">${book.author}</h5>
              <span class="card-group row row-cols-auto p-1 g-2 justify-content-between">
                ${book.tags.map(
                  (tag) => `<p class="col mb-0 badge bg-primary">${tag}</>`
                ).join("")}  
              </span>
            </div>
          </div>
    `;
  })
}

// * return a list of books from the local storage
function getBooks() {
  return JSON.parse(localStorage.getItem("books"));
}
