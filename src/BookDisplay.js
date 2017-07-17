import React, { Component } from 'react';
import ReactHover from 'react-hover';
import BookMoveOption from './MoveOption';

const optionsCursorTrueWithMargin = {
    followCursor: true,
    shiftX: 10,
    shiftY: 10
}

export default class BookDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            category: []
        }
        this.onSelection = this.onSelection.bind(this)
        this.checkShelfFromMyBooks = this.checkShelfFromMyBooks.bind(this)
    }

    shouldComponentUpdate() {
        //console.log('BookDisplay shouldComponentUpdate')
        return true
    }

    componentWillUnmount() {
        // console.log('BookDisplay componentWillUnmount')
    }

    onSelection(e, bookId) {
        this.props.onShelfUpdate(bookId, e.target.value)
    }

    checkShelfFromMyBooks(searchedBookId) {
        for (var i = 0; i < this.props.myBooks.length; i++) {
            if (this.props.myBooks[i].id === searchedBookId) {
                return this.props.myBooks[i].shelf
            }
        }

        return 'none'
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
                                                        <BookMoveOption booksMode={this.checkShelfFromMyBooks(book.id)} bookId={book.id} onChange={(event, bookId) => {
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

    componentWillReceiveProps(nextProps) {
        this.setState({ category: nextProps.category })
        this.setState({ items: nextProps.item })
    }

    render() {
        return (
            <div className="list-books-content">
                <div>
                    {
                        this.displayBooks(this.state.category, this.state.items)
                    }
                </div>
            </div>
        )
    }
}