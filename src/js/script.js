/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  'use strict';
  
  class BookList{
    constructor(element){
      const thisBookList = this;
      thisBookList.id = element.id;
      console.log(thisBookList.id);

      thisBookList.getElements();
      thisBookList.renderBooks(element);
      thisBookList.initAcitons(element);
    }
    
    getElements(){
      const thisBookList = this;
      thisBookList.dom = {};
      thisBookList.dom.wrapper = document.querySelector('.books-list');
      thisBookList.dom.filter = document.querySelector('.filters');
      
    }
    
    renderBooks(dataSource){
      const thisBookList = this;
      dataSource.ratingBgc = thisBookList.determineRatingBgc(dataSource.rating);
      dataSource.ratingWidth = dataSource.rating*10;
      const booksTemplate = Handlebars.compile(document.querySelector('#template-book').innerHTML);
      const generatedHTML = booksTemplate(dataSource);  

      console.log(dataSource);
      const booksElement =  utils.createDOMFromHTML(generatedHTML);
      
      thisBookList.dom.wrapper.appendChild(booksElement);
    }
    initAcitons(element){
      const thisBookList = this;
      thisBookList.favoriteBooks = [];
      thisBookList.dom.wrapper.addEventListener('dblclick',event=>{
        if(event.target.offsetParent.classList.contains('book__image')){
  
          event.target.offsetParent.classList.toggle('favorite');
          const dataID = event.target.offsetParent.getAttribute('data-id');
          if(thisBookList.favoriteBooks.includes(dataID)){
            console.log('true');
            console.log(event.target.offsetParent);
            thisBookList.favoriteBooks.splice(thisBookList.favoriteBooks.indexOf(dataID),1);
          }else{
            thisBookList.favoriteBooks.push(dataID);
            console.log('falase');
  
          }
        }
        console.log(thisBookList.favoriteBooks);
      });

      thisBookList.filters = [];
      thisBookList.dom.filter.addEventListener('click',event=>{
        if(event.target.name == 'filter'){
          if(thisBookList.filters.includes(event.target.value)){
            thisBookList.filters.splice(thisBookList.filters.indexOf(event.target.value));
          }else{ 
            thisBookList.filters.push(event.target.value);
          }
        }
        thisBookList.filterBooks(element);
        console.log(thisBookList.filters);
      });
    }

    filterBooks(book){
      const thisBookList = this;
      console.log(book.details);
      document.querySelector(`[data-id='${book.id}']`).classList.remove('hidden');
      if(thisBookList.filters.includes('adults') && book.details.adults){
        document.querySelector(`[data-id='${book.id}']`).classList.add('hidden');
      }
      if(thisBookList.filters.includes('nonFiction') && book.details.nonFiction){
        document.querySelector(`[data-id='${book.id}']`).classList.add('hidden');
      }
      
    }
    determineRatingBgc(rating){
      console.log(rating);
      if(rating<6)return `linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)`;
      if(rating > 6 && rating<= 8) return `linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)`;
      if(rating > 8 && rating <= 9) return `linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)`;
      if(rating > 9) return `linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)`;
    }
  }


  const app = {
    initMenu: function(){
      console.log('thisApp.data2: ',dataSource);
      for(let bookData of dataSource.books){
        new BookList(bookData);
      }
    },
    init: function(){
      console.log('thisApp.data: ',dataSource);
      this.initMenu(dataSource);
    }
  };
  app.init();
}