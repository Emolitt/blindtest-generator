import React, {useState} from "react";
import {CheckBox} from "../../../components"
import './ThemeGetter.scss'
import {localStorageHelper} from '../../../utils/localStorageHelper';

import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import styled from "@mui/material/styles/styled";

import videoGameThemeImg from '../../../resources/themes/video-games.png';
import musicsThemeImg from '../../../resources/themes/songs.jpg';
import moviesThemeImg from '../../../resources/themes/movies.jpg';
import seriesThemeImg from '../../../resources/themes/series.jpg';
import tvShowThemeImg from '../../../resources/themes/tv-shows.jpg';
import animesThemeImg from '../../../resources/themes/animes.jpg';

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#000000"),
    backgroundColor: "transparent",
    fontSize: "18px",
    fontWeight: "500",
    '&:hover': {
        backgroundColor: "#FF6D00"
    },
}));

export function ThemeGetter() {
    const savedThemes = localStorageHelper.getThemes();
    const [activeThemes, setActiveThemes] = useState(savedThemes);

    const onToggleAllClick = function () {
        const toggle = Object.keys(activeThemes).filter(key => {
            return !activeThemes[key]
        }).length > 0;

        const theme = {
            games: toggle,
            songs: toggle,
            movies: toggle,
            series: toggle,
            tvShows: toggle,
            animes: toggle
        };

        setActiveThemes(theme);
        localStorageHelper.setThemes(theme);
    }

    const onThemeClick = function (id, value) {
        const theme = JSON.parse(JSON.stringify(activeThemes));

        theme[id] = value;
        setActiveThemes(theme);
        localStorageHelper.setThemes(theme);
    }

    return <div className="theme-container">
        <div className="title">
            <h1>Theme Selection</h1>
        </div>
        <ColorButton variant="text" className="theme-all-toggle" onClick={onToggleAllClick}>Toggle All</ColorButton>
        <Grid container spacing={1} className="theme-grid-container">
            <Grid container spacing={3} className="row-centered">
                <Grid item xs={3} className="item-centered">
                    <CheckBox id="games" title="Video Games" backgroundImg={videoGameThemeImg} width={200} height={200} active={activeThemes.games} onClick={onThemeClick}/>
                </Grid>
                <Grid item xs={3} className="item-centered">
                    <CheckBox id="songs" title="Popular Songs" backgroundImg={musicsThemeImg} width={200} height={200} active={activeThemes.songs} onClick={onThemeClick}/>
                </Grid>
                <Grid item xs={3} className="item-centered">
                    <CheckBox id="movies" title="Movies" backgroundImg={moviesThemeImg} width={200} height={200} active={activeThemes.movies} onClick={onThemeClick}/>
                </Grid>
            </Grid>
            <Grid container spacing={3} className="row-centered">
                <Grid item xs={3} className="item-centered">
                    <CheckBox id="series" title="Series" backgroundImg={seriesThemeImg} width={200} height={200} active={activeThemes.series} onClick={onThemeClick}/>
                </Grid>
                <Grid item xs={3} className="item-centered">
                    <CheckBox id="tvShows" title="TV Shows" backgroundImg={tvShowThemeImg} width={200} height={200} active={activeThemes.tvShows} onClick={onThemeClick}/>
                </Grid>
                <Grid item xs={3} className="item-centered">
                    <CheckBox id="animes" title="Animes" backgroundImg={animesThemeImg} width={200} height={200} active={activeThemes.animes} onClick={onThemeClick}/>
                </Grid>
            </Grid>
        </Grid>

    </div>
}