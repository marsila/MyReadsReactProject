import React, {Component} from 'react'
import Book from './Book'

function Shelf(props) {

  const changeBookShelf = (book, shelf) => {
    props.onChangeBookShelf(book, shelf)
  }

  return(

    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.filter((book) => (book.shelf === props.shelfName))
            .map((book) => (
              <li key={book.id}>
               <Book book={book}
                 onUpdateShelf ={(book, shelf) => {
                   changeBookShelf(book, shelf)
                 }}
               />
             </li>))}
        </ol>
      </div>
    </div>



  )
}
export default Shelf
