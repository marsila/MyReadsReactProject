import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksList from './BooksList'
import {Route} from 'react-router-dom'
import BooksSearch from './BooksSearch'

class BooksApp extends Component {

  state = {
    books: [],
    showingBooks:[]
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

   searchBooks(query){
     let showingBooks = []
     if(query){
       BooksAPI.search(query).then(res => {
         if (res.length) {

           showingBooks = res.map(book => {
             const index = this.state.books.findIndex(b => b.id === book.id)
             if( index >= 0 ) {
               //if the book is already on a shelf
               return this.state.books[index]
             } else {
               return book
               }
           })
         }
           this.setState({showingBooks})
       })
     } else {
       this.setState({showingBooks})
     }
   }

  updateBookShelf(selectedBook,shelf){
    let updatedBooks
    const index = this.state.books.findIndex(b => b.id === selectedBook.id)
    BooksAPI.update(selectedBook, shelf).then(res => {
      if(res){
        if(index > 0){
          // the book is already on the shelf and we want to change the shelf
          updatedBooks = this.state.books.map(book => {
            if (book.id === selectedBook.id) {
              return {...selectedBook, shelf}
            } else {
              return book
            }
          })
        } else {
          // add a new book to the shelf
          updatedBooks = [...this.state.books, {...selectedBook, shelf}]
          console.log(`do nothing yet`);
        }
        this.setState({books: updatedBooks})
      }
    })
  }
  render() {
    return (<div className="app">
      <Route exact path="/" render={() => (
          <BooksList
            books={this.state.books}
            onUpdateBookShelf={(book, shelf) =>{
              this.updateBookShelf(book, shelf)
            }}
          />
        )}
      />
      <Route path="/search" render={() => (
          <BooksSearch books={this.state.showingBooks}
            onSearchBooks ={(query) => {
              this.searchBooks(query)
            }}
            onUpdateBookShelf={(book, shelf) =>{
              this.updateBookShelf(book, shelf)
          }}
        />
      )}/>
    </div>)
  }
}

export default BooksApp
