import React, {Component} from 'react';
import {Link} from "react-router-dom";

class NotFound extends Component {
    render() {
        return (
            <div className="text-center" style={{marginTop: '50px'}}>
                <div style={{fontSize: '72px'}}>404</div>
                <h3>Page not found</h3>
                <Link to={'/'}>Go to dashboard</Link>
            </div>
        );
    }
}

export default NotFound;