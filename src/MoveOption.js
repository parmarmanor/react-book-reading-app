import React, { Component } from 'react';

class BookMoveOption extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select: "Reading",
            BooksReadingTypeMap: {
                'Read': 'read',
                'Reading': 'currentlyReading',
                'Want To Read': 'wantToRead',
                'None/Remove From Library': 'none'
            }
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            select: event.target.value
        });
        if (this.props.onChange) {
            this.props.onChange(event, this.props.bookId)
        }
    }

    render() {
        return (
            <select name={this.props.name} value={this.props.booksMode} onChange={this.handleChange}>
                <option value="none" disabled>Move to...</option>
                {
                    Object.keys(this.state.BooksReadingTypeMap).map(item =>
                    <option key={item} value={this.state.BooksReadingTypeMap[item]}>{item}</option>
                )}

            </select>
        )
    }
}

export default BookMoveOption