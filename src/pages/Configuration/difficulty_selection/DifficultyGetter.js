import React, {useState} from "react";
import {CheckBox} from "../../../components"
import './DifficultyGetter.scss'
import {localStorageHelper} from '../../../utils/localStorageHelper';

import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import styled from "@mui/material/styles/styled";

import easyDifficultyImg from '../../../resources/difficulties/easy.jpg';
import mediumDifficultyImg from '../../../resources/difficulties/medium.jpg';
import hardDifficultyImg from '../../../resources/difficulties/hard.jpg';
import PropTypes from "prop-types";

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#000000"),
    backgroundColor: "transparent",
    fontSize: "18px",
    fontWeight: "500",
    '&:hover': {
        backgroundColor: "#FF6D00"
    },
}));

export function DifficultyGetter() {
    const savedDifficulties = localStorageHelper.getDifficulties();
    const [activeDifficulties, setActiveDifficulties] = useState(savedDifficulties);

    const onToggleAllClick = function () {
        const toggle = Object.keys(activeDifficulties).filter(key => {
            return !activeDifficulties[key]
        }).length > 0;

        const difficulties = {
            easy: toggle,
            medium: toggle,
            hard: toggle
        };

        setActiveDifficulties(difficulties);
        localStorageHelper.setDifficulties(difficulties);
    }

    const onThemeClick = function (id, value) {
        const difficulties = JSON.parse(JSON.stringify(activeDifficulties));

        difficulties[id] = value;
        setActiveDifficulties(difficulties);
        localStorageHelper.setDifficulties(difficulties);
    }

    return <div className="theme-container">
        <div className="title">
            <h1>Difficulty Selection</h1>
        </div>
        <ColorButton variant="text" className="difficulties-all-toggle" onClick={onToggleAllClick}>Toggle All</ColorButton>
        <Grid container spacing={3} className="theme-grid-container row-centered">
            <Grid item xs={4} className="item-centered">
                <CheckBox id="easy" title="Easy" backgroundImg={easyDifficultyImg} width={200} height={200} active={activeDifficulties.easy} onClick={onThemeClick}/>
            </Grid>
            <Grid item xs={4} className="item-centered">
                <CheckBox id="medium" title="Medium" backgroundImg={mediumDifficultyImg} width={200} height={200} active={activeDifficulties.medium} onClick={onThemeClick}/>
            </Grid>
            <Grid item xs={4} className="item-centered">
                <CheckBox id="hard" title="Hard" backgroundImg={hardDifficultyImg} width={200} height={200} active={activeDifficulties.hard} onClick={onThemeClick}/>
            </Grid>
        </Grid>
    </div>
}