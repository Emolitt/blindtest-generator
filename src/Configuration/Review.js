import React from 'react';
import {
    Typography,
    Grid
} from "@material-ui/core"

const ThemeList = {
    games: "Video Games",
    animes: "Animes",
    film: "Movies"
}

function getTheme() {
    const key = window.localStorage.getItem('theme')
    const allowSameLicence = (window.localStorage.getItem('allow_same_licence') === 'true')

    const result = `${ThemeList[key]} (${allowSameLicence ? 'Multiple selection per Licence' : 'One selection per Licence'})`
    return result;
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
            <Typography variant="h6" gutterBottom align='center'>
                Configuration summary
            </Typography>
            <Typography variant="h6" gutterBottom align='center'>
                <Grid container>
                    <React.Fragment key="Theme">
                        <Grid item xs={6}>
                            <Typography gutterBottom>Theme</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography gutterBottom>{getTheme()}</Typography>
                        </Grid>
                    </React.Fragment>
                    <React.Fragment key="Size of Playlist">
                        <Grid item xs={6}>
                            <Typography gutterBottom>Size of Playlist</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography gutterBottom>{getFormattedPlaylistSize()}</Typography>
                        </Grid>
                    </React.Fragment>
                    <React.Fragment key="Guess Time">
                        <Grid item xs={6}>
                            <Typography gutterBottom>Guess/Answer Time</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography gutterBottom>{getFormattedGuessTime()}</Typography>
                        </Grid>
                    </React.Fragment>
                </Grid>
            </Typography>
        </React.Fragment>
    );
}