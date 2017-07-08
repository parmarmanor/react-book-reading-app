import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

import BookSearch from './BookSearch';
import BookList from './BooksList';
import { Route } from 'react-router-dom';
import AddBook from './AddBook';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      searchedBooks: []
    }
    this.shelfUpdate = this.shelfUpdate.bind(this)
    this.searchBook = this.searchBook.bind(this)
  }

  getAllBooks() {
    BooksAPI.getAll().then((books) => {
      for (var i = 0; i < books.length; i++) {
        books[i].previewLink += "&img=1&zoom=1&printsec=frontcover"
      }
      this.setState({ books })
    })
  }

  componentDidMount() {
    this.getAllBooks()
  }

  shelfUpdate(bookId, eventUpdate) {
    BooksAPI.update(bookId, eventUpdate).then(() => {
      this.getAllBooks()
    })
  }

  searchBook(query) {
    BooksAPI.search(query, 20).then((books) => {
      this.setState({ searchedBooks: books })
    })
  }

  render() {
    return (
      <div>
        <Route exact path="/" render={() => (
          <BookList
            books={this.state.books}
            onShelfUpdate={this.shelfUpdate}
          />
        )} />
        <Route exact path="/BookSearch" render={(history) => (
          <BookSearch
            books={this.state.books}
            searchedBooks={this.state.searchedBooks}
            onShelfUpdate={this.shelfUpdate}
            searchBook={this.searchBook}
            
          />
        )} />
        <AddBook></AddBook>
      </div>
    )
  }
}

export default BooksApp
