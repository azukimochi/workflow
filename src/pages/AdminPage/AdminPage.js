import React, { Component } from "react"
import "./AdminPage.css"
import Typing from 'react-typing-animation';

class AdminPage extends Component {

    handleClick = event => {
        event.preventDefault()
        this.props.history.push("/workflow")
    }
    render() {
        return (
            <div id="adminContainer" className="body">

                <div className="row">
                    <div className="col-xl-6 offset-xl-6">
                        <Typing>
                            <header>Welcome, Admin!</header>
                        </Typing>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xl-6 offset-xl-6">
                        <div
                            id="toWorkflowBtn"
                            className="ui orange vertical animated button"
                            tabIndex="0"
                            onClick={this.handleClick}>
                            <div className="visible content">
                                Setup Workflow
                            </div>
                            <div className="hidden content">
                                <i className="calendar alternate outline icon"></i>
                                Let's get working!
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default AdminPage