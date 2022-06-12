'use strict';
const filter = document.querySelector('.filters');
const filters = [];

dataSource.books.forEach(e=>{
  renderBooks(e);
});
initAcitons();
renderBooks(dataSource.books);
function renderBooks(dataSource){
  const booksTemplate = Handlebars.compile(document.querySelector('#template-book').innerHTML);
  const liBooksHandle = document.querySelector('.books-list');
  const generatedHTML = booksTemplate(dataSource);  
  console.log(liBooksHandle);
  const booksElement =  utils.createDOMFromHTML(generatedHTML);
    
  liBooksHandle.appendChild(booksElement);
}


const favoriteBooks = [];
function initAcitons(){
  const liBooksHandle = document.querySelector('.books-list');
  liBooksHandle.addEventListener('dblclick',event=>{
    if(event.target.offsetParent.classList.contains('book__image')){

      event.target.offsetParent.classList.toggle('favorite');
      const dataID = event.target.offsetParent.getAttribute('data-id');
      if(favoriteBooks.includes(dataID)){
        console.log('true');
        console.log(event.target.offsetParent);
        favoriteBooks.splice(favoriteBooks.indexOf(dataID),1);
      }else{
        favoriteBooks.push(dataID);
        console.log('falase');

      }
    }
    console.log(favoriteBooks);
  });
  filter.addEventListener('click',event=>{
    // console.log(event.target.name);
    if(event.target.name == 'filter'){
      console.log('filter');
      if(filters.includes(event.target.value)){
        filters.splice(filters.indexOf(event.target.value));
      }else{ 
        filters.push(event.target.value);
      }
    }
    console.log(filters);
  });
}
