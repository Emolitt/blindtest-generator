import React from 'react';
import {
    Typography,
    Grid
} from "@material-ui/core"

const ThemeList = {
    games: "Video Games",
    animes: "Animes",
    films: "Movies",
    musics: "Musics",
    all: "All Genre"
}

function getTheme() {
    const key = window.localStorage.getItem('theme')
    const allowSameLicence = (window.localStorage.getItem('allow_same_licence') === 'true')

    const result = `${ThemeList[key]} (${allowSameLicence ? 'Multiple selection per Licence' : 'One selection per Licence'})`
    return result;
}

function getFormattedDifficulty() {
    const difficulty = JSON.parse(window.localStorage.getItem('difficulty'))

    if (difficulty.easy && !difficulty.medium && !difficulty.hard) {
        return 'Easy mode, for beginners'
    } else if (!difficulty.easy && difficulty.medium && !difficulty.hard) {
        return 'Normal mode, for some good surprises !'
    } else if (!difficulty.easy && !difficulty.medium && difficulty.hard) {
        return 'Hard mode, for tryharders !'
    } else if (difficulty.easy && difficulty.medium && !difficulty.hard) {
        return 'Easy and Medium mode, for more content without difficulty !'
    } else if (difficulty.easy && !difficulty.medium && difficulty.hard) {
        return 'Easy and Hard mode, because why not ?'
    } else if (!difficulty.easy && difficulty.medium && difficulty.hard) {
        return 'Medium and Hard mode, best combo for training !'
    } else if (difficulty.easy && difficulty.medium && difficulty.hard) {
        return 'All in one ! Harder Better Faster !'
    } else {
        window.localStorage.setItem('difficulty', JSON.stringify({
            easy: true,
            medium: true,
            hard: false,
        }));
        return 'Easy and Medium mode, for more content without difficulty !'
    }
}

function getFormattedPlaylistSize() {
    const playlistSize = window.localStorage.getItem('playlist_size');

    return `${playlistSize} elements in this playlist`;
}

function getFormattedGuessTime() {
    const guessTime = window.localStorage.getItem('guess_time');
    const waitTime = window.localStorage.getItem('wait_time');

    return `${guessTime} sec to guess then ${waitTime} before next guess`;
}

export default function Review() {

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom align='center' style={{ color: 'white' }}>
                Configuration summary
            </Typography>
            <Typography variant="h6" gutterBottom align='center'>
                <Grid container spacing={5} style={{ marginTop: '5%' }}>
                    <React.Fragment key="Theme">
                        <Grid item xs={6}>
                            <Typography gutterBottom style={{ color: 'white' }}>Theme</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography gutterBottom style={{ color: 'white' }}>{getTheme()}</Typography>
                        </Grid>
                    </React.Fragment>
                    <React.Fragment key="Difficulty">
                        <Grid item xs={6}>
                            <Typography gutterBottom style={{ color: 'white' }}>Difficulty</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography gutterBottom style={{ color: 'white' }}>{getFormattedDifficulty()}</Typography>
                        </Grid>
                    </React.Fragment>
                    <React.Fragment key="Size of Playlist">
                        <Grid item xs={6}>
                            <Typography gutterBottom style={{ color: 'white' }}>Size of Playlist</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography gutterBottom style={{ color: 'white' }}>{getFormattedPlaylistSize()}</Typography>
                        </Grid>
                    </React.Fragment>
                    <React.Fragment key="Guess Time">
                        <Grid item xs={6}>
                            <Typography gutterBottom style={{ color: 'white' }}>Guess/Answer Time</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography gutterBottom style={{ color: 'white' }}>{getFormattedGuessTime()}</Typography>
                        </Grid>
                    </React.Fragment>
                </Grid>
            </Typography>
        </React.Fragment>
    );
}