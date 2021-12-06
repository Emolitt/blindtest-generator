import React from 'react';
import {Route, Routes, BrowserRouter, useNavigate} from 'react-router-dom';
import GeneratorPage from './pages/Configuration/GeneratorPage';
import BlindtestGenerator from "./pages/Session/BlindtestGenerator";
import HomePage from "./pages/HomePage";
import ContributorsPage from "./pages/ContributorsPage";
import AssetsPage from "./pages/Assets/AssetsPage";
import {StoreConsumerHook} from "./store/store";

function WrapBlindtest() {
    const {assetManager} = StoreConsumerHook();
    const navigate = useNavigate();
    return <BlindtestGenerator assetManager={assetManager} navigate={navigate}/>
}

export default function RoutingConfig() {
     return <BrowserRouter basename='/'>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/generate" element={<GeneratorPage/>}/>
                <Route path="/contributors" element={<ContributorsPage/>}/>
                <Route path="/assets" element={<AssetsPage/>}/>
                <Route path="/blindtest" element={<WrapBlindtest/>}/>
            </Routes>
        </BrowserRouter>
}