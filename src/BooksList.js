import React, { Component } from 'react'
import BookMoveOption from './MoveOption';
import ReactHover from 'react-hover';

const optionsCursorTrueWithMargin = {
    followCursor: true,
    shiftX: 10,
    shiftY: 10
}


class BookList extends Component {

    constructor(props) {
        super(props);

        this.displayBooks = this.displayBooks.bind(this)
    }
    onSelection(e, bookId) {
        this.props.onShelfUpdate(bookId, e.target.value)
    }

   displayBooks(category, type) {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{category}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            type.map(book => (
                                <li key={book.id}>
                                    <ReactHover
                                        options={optionsCursorTrueWithMargin}>
                                        <ReactHover.Trigger>
                                            <div className="book">
                                                <div className="book-top">
                                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.previewLink})` }}></div>
                                                    <div className="book-shelf-changer">
                                                        <BookMoveOption booksMode={book.shelf} bookId={book.id} onChange={(event, bookId) => {
                                                            this.onSelection(event, bookId)
                                                        }} ></BookMoveOption>
                                                    </div>
                                                </div>
                                                <div className="book-title">{book.title}</div>
                                                <div className="book-authors">{book.authors}</div>
                                            </div>
                                        </ReactHover.Trigger>
                                        <ReactHover.Hover>
                                        </ReactHover.Hover>
                                    </ReactHover>
                                </li>
                            ))
                        }
                    </ol>
                </div>
            </div>
        )
    }
    render() {
        const { books } = this.props;
        let CurrentlyReadingBooks = books.filter((book) => (book.shelf === "currentlyReading"));
        let WantToReadBooks = books.filter((book) => (book.shelf === "wantToRead"));
        let ReadBooks = books.filter((book) => (book.shelf === "read"));

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    {
                        this.displayBooks('Currently Reading', CurrentlyReadingBooks)
                    }
                    {
                        this.displayBooks('Want To Read', WantToReadBooks)
                    }
                    {
                        this.displayBooks('Read', ReadBooks)
                    }
                </div>
            </div>
        )
    }
}


export default BookList;