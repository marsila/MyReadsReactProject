import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'


class BooksSearch extends Component {
  state = {
    query :''
  }


  changeBookShelf = (book, shelf) => {
    this.props.onUpdateBookShelf(book, shelf)
  }
  updateQuery = (query) => {
    this.setState({query})
    this.props.onSearchBooks(query)
  }

  render() {
    const {books} = this.props
    const {query} = this.state
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query} 
              onChange={(event)=> this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              books.map((book) => (
               <li key={book.id}>
                 <Book book={book}
                   onUpdateShelf ={(book, shelf) => {
                     this.changeBookShelf(book, shelf)
                   }}
                 />
              </li>))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default BooksSearch
