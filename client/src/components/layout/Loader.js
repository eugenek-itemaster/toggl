import React, {Component} from 'react';

class Loader extends Component {
    render() {
        return (
            <div className="card-loading">
                <div className="d-flex justify-content-center m-5">
                    <div className="spinner-border" role="status"></div>
                </div>
            </div>
        );
    }
}

export default Loader;