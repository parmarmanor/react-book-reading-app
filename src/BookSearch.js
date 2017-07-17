import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookDisplay from './BookDisplay';

class BookSearch extends Component {
    state = {
        query: '',
        searchedBooks: [],
        wantToRender: false
    }

    updateQuery = (query) => {
        if (query) {
            this.props.searchBook(query)
        } else {
            this.setState({ searchedBooks: [] })
        }
        this.setState({ query: query.trim() })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.searchedBooks.error) {
            this.setState({ searchedBooks: [] })
        } else {
            for (var i = 0; i < nextProps.searchedBooks.length; i++) {
                nextProps.searchedBooks[i].previewLink += "&img=1&zoom=1&printsec=frontcover"
            }
            this.setState({ searchedBooks: nextProps.searchedBooks })
            this.setState({ wantToRender: true })
        }
    }

    clearQuery = (query) => {
        this.setState({ query: '' })
        this.setState({ searchedBooks: [] })
        this.setState({ wantToRender: false })
    }

    onSelection(e, bookId) {
        this.props.onShelfUpdate(bookId, e.target.value)
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search-book" to="/" > Close</Link>
                    <input
                        type='text'
                        placeholder='Search Books'
                        value={this.state.query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                </div>
                <div className="search-books-results">
                    {(
                        <div className='showing-searched-books'>
                            <span> Searched {this.state.searchedBooks.length} Books </span>
                            <button onClick={this.clearQuery}> Clear All </button>
                        </div>
                    )}
                    <ol className="books-grid">
                        <BookDisplay item={this.state.searchedBooks} myBooks={this.props.books} category={['']} onShelfUpdate={this.props.onShelfUpdate}></BookDisplay>
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookSearch;