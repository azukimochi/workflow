import React, { Component } from "react"

class AdminPage extends Component {

    handleClick = event => {
        event.preventDefault()
        this.props.history.push("/workflow")
    }
    render() {
        return (
            <div className="container">
            <div>Admin Page</div>
            <button onClick={this.handleClick}>Set up Workflow</button>
            </div>
        )
    }
}
export default AdminPage