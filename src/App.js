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
    selectedBook.shelf = shelf
    BooksAPI.update(selectedBook, shelf).then(() => {
      updatedBooks = [...this.state.books.filter(b => b.id !== selectedBook.id), {...selectedBook}]
      this.setState({books: updatedBooks})
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
