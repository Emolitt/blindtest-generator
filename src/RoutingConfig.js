import React, {Component} from 'react';
import {Route, HashRouter} from 'react-router-dom';
import Checkout from './Configuration/Checkout';
import BlindtestGenerator from "./Session/BlindtestGenerator";
import HomePage from "./Home/HomePage";
import ContributorsPage from "./Home/ContributorsPage";
import AssetsPage from "./Home/AssetsPage";
import SuggestPage from "./Home/SuggestPage";
import AdminSuggestionPage from "./Home/AdminSuggestionPage";

class RoutingConfig extends Component {

    render() {
        return (
            <HashRouter basename='/'>
                <div>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/checkout" component={Checkout}/>
                    <Route exact path="/contributors" component={ContributorsPage}/>
                    <Route exact path="/assets" component={AssetsPage}/>
                    <Route exact path="/assets/suggest" component={SuggestPage}/>
                    <Route exact path="/blindtest" component={BlindtestGenerator}/>
                    <Route exact path="/admin/suggestions" component={AdminSuggestionPage}/>
                </div>
            </HashRouter>
        );
    }
}

export default RoutingConfig;