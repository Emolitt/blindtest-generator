import React, {useEffect} from 'react';

import {
    CssBaseline
} from "@mui/material";
import {Helmet} from "react-helmet";
import Copyright from "../../components/copyright/Copyright";
import {CustomAppBar, CustomCheckout} from "../../components";
import {ThemeGetter} from "./theme-selection/ThemeGetter";
import {PlaylistCustomizer} from "./playlist-customizer/PlaylistCustomizer";
import {DifficultyGetter} from "./difficulty_selection/DifficultyGetter";
import {SummaryPage} from "./summary/Summary";
import {useNavigate} from "react-router-dom";
import {localStorageHelper} from "../../utils/localStorageHelper";

const stepsLabel = ['Select theme', 'Customize Playlist', 'Select Difficulty','Validate'];
const stepsComponents = [<ThemeGetter />, <PlaylistCustomizer />,  <DifficultyGetter />, <SummaryPage />];

export default function GeneratorPage() {
    useEffect(() => {
        localStorageHelper.resetSessionId();
    }, []);

    return <div style={{ overflow: 'hidden' }}>
            <Helmet bodyAttributes={{style: 'background-color : #282D35'}}/>
            <React.Fragment>
                <CssBaseline />
                <CustomAppBar />
                <CustomCheckout stepLabels={stepsLabel} stepComponents={stepsComponents}/>
                <Copyright />
            </React.Fragment>
        </div>
}