import React from "react";

import './Summary.scss'
import Grid from "@mui/material/Grid";
import {CustomButton} from "../../../components";
import {localStorageHelper} from "../../../utils/localStorageHelper";
import {useNavigate} from "react-router-dom";


const FormattedThemes = {
    games: "Video Games",
    songs: "Musics",
    movies: "Movies",
    series: "Series",
    tvShows: 'TV Shows',
    animes: "Animes"
}

const DifficultyBinaryTable = {
    easy: 1,
    medium: 2,
    hard: 4
}

function calculateObjectWeight(obj, binaryTable) {
    return Object.keys(obj).map((key, index) => {
        return obj[key] === true ? binaryTable[key] : 0;
    }).reduce(function(a, b){
        return a + b;
    }, 0);
}

function getThemes() {
    const themes = localStorageHelper.getThemes();
    const allowSameLicence = localStorageHelper.getAllowMultipleLicence();

    return Object.keys(FormattedThemes).filter((key) => {
        return themes[key];
    }).map((key) => FormattedThemes[key]).join(', ') + ` (${allowSameLicence ? 'Multiple' : 'One'} selection per Licence)`;
}

function getFormattedDifficulty() {
    const difficulty = localStorageHelper.getDifficulties();
    const weight = calculateObjectWeight(difficulty, DifficultyBinaryTable);

    switch (weight) {
        case 1:
            return 'Easy mode, for beginners'
        case 2:
            return 'Medium mode, for some good surprises !'
        case 3:
            return 'Easy and Medium mode, for more content without difficulty !'
        case 4:
            return 'Hard mode, for tryharders !'
        case 5:
            return 'Easy and Hard mode, because why not ?'
        case 6:
            return 'Medium and Hard mode, best combo for training !'
        case 7:
            return 'All in one ! Harder Better Faster !'
        default:
            localStorageHelper.setDifficulties(localStorageHelper.defaultDifficulties);
            return 'Easy and Medium mode, for more content without difficulty !'
    }
}

function getFormattedPlaylistSize() {
    const playlistSize = localStorageHelper.getPlaylistSize();

    return `${playlistSize} songs in this playlist`;
}

function getFormattedGuessTime() {
    const timeline = localStorageHelper.getTimeline();

    return `${timeline[0]} sec to guess then ${timeline[1]} before next guess`;
}

export function SummaryPage() {
    return <div className="summary-container">
        <div className="title">
            <h1>Summary</h1>
        </div>
        <Grid container rowSpacing={1} className="row-centered">
            <Grid item xs={6} className="item-flex-end">
                <h2>Themes</h2>
            </Grid>
            <Grid item xs={6} className="item-flex-start">
                {getThemes()}
            </Grid>
            <Grid item xs={6} className="item-flex-end">
                <h2>Size of Playlist</h2>
            </Grid>
            <Grid item xs={6} className="item-flex-start">
                {getFormattedPlaylistSize()}
            </Grid>
            <Grid item xs={6} className="item-flex-end">
                <h2>Difficulty</h2>
            </Grid>
            <Grid item xs={6} className="item-flex-start">
                {getFormattedDifficulty()}
            </Grid>
            <Grid item xs={6} className="item-flex-end">
                <h2>Timeline</h2>
            </Grid>
            <Grid item xs={6} className="item-flex-start">
                {getFormattedGuessTime()}
            </Grid>
        </Grid>
    </div>
}