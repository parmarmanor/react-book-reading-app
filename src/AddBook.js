import React, { Component } from 'react'
import { Link } from 'react-router-dom';


class AddBook extends Component {
    render() {
        return (
            <div className="open-search">
                <Link
                    to="/BookSearch"
                    className="add-contact">Add Contact</Link>
            </div>
        )
    }
}

export default AddBook