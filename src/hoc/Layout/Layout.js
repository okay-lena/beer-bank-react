import React, {Component} from 'react'
// import classes from './Layout.module.css'

class Layout extends Component {
    render() {
        return (
            // root div
            <div>
                 {/*for content and pages*/}
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout
