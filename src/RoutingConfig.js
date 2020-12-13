import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';

import Checkout from './Configuration/Checkout';
import BlindtestGenerator from "./Session/BlindtestGenerator";

class RoutingConfig extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Checkout}/>
                    <Route exact path="/blindtest" component={BlindtestGenerator}/>
                </div>
            </Router>
        );
    }
}

export default RoutingConfig;