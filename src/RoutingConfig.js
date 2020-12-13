import React, {Component} from 'react';
import Route from 'react-router-dom/Route';
import Checkout from './Configuration/Checkout';
import BlindtestGenerator from "./Session/BlindtestGenerator";
import HashRouter from "react-router-dom/HashRouter";

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