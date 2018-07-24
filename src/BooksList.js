import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'
import Shelf from './Shelf'

function BooksList(props) {

  const changeBookShelf = (book, shelf) => {
    props.onUpdateBookShelf(book, shelf)
  }

    return (<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf books={props.books}
                  shelfName ='currentlyReading'
                  shelfTitle='Currently Reading'
                  onChangeBookShelf = {(book, shelf) => {
                    changeBookShelf(book, shelf)
                  }}
                />
                <Shelf books={props.books}
                  shelfName ='wantToRead'
                  shelfTitle= 'Want to Read'
                  onChangeBookShelf = {(book, shelf) => {
                    changeBookShelf(book, shelf)
                  }}
                />
                <Shelf books={props.books}
                  shelfName ='read'
                  shelfTitle= 'Read'
                  onChangeBookShelf = {(book, shelf) => {
                    changeBookShelf(book, shelf)
                  }}
                />
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>)
}

export default BooksList;
