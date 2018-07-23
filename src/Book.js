import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Book extends Component {
  state = {
    shelf :"none"
  }

  updateShelf = (event) => {
     this.setState({shelf :event.target.value})
     this.props.onUpdateShelf(this.props.book, event.target.value)
  }

  render(){
    const {book} = this.props
    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{
              width: 128,
              height: 193,
              backgroundImage: book.imageLinks ? `url(${book.imageLinks.thumbnail})` : ''
            }}></div>
          <div className="book-shelf-changer">

            <select onChange={this.updateShelf} value={book.shelf ? book.shelf : this.state.shelf}>
              <option value="move" disabled="disabled">Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    )

  }

}

export default Book;
