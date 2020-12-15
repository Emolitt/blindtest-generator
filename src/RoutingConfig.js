import React, {Component} from 'react';
import {Route, HashRouter} from 'react-router-dom';
import Checkout from './Configuration/Checkout';
import BlindtestGenerator from "./Session/BlindtestGenerator";

class RoutingConfig extends Component {

    render() {
        return (
            <HashRouter basename='/'>
                <div>
                    <Route exact path="/" component={Checkout}/>
                    <Route exact path="/blindtest" component={BlindtestGenerator}/>
                </div>
            </HashRouter>
        );
    }
}

export default RoutingConfig;