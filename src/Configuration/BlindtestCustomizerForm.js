import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    TextField,
    FormControl,
    Slider,
    Box,
    FormLabel,
    Switch,
    FormGroup
} from "@material-ui/core"
import withStyles from "@material-ui/core/styles/withStyles";
import {MersenneTwister19937} from "random-js";

const GreenSwitch = withStyles({
    switchBase: {
        color: '#0CB804',
        '&$checked': {
            color: '#0CB804',
        },
        '&$checked + $track': {
            backgroundColor: '#48DF40',
        },
    },
    checked: {},
    track: {},
})(Switch);

const CustomSlider = withStyles({
    root: {
        color: "#137E0E"
    },
    track: {
        height: 3,
        borderRadius: 2,
    },
    thumb: {
        height: 15,
        width: 15,
        backgroundColor: "#0CB804",
        border: "2px solid currentColor",
        "&:focus, &:hover, &$active": {
            boxShadow: "#137E0E 0 2px 3px 1px",
        },
        color: "#0CB804",
    },
    active: {}
})(Slider);

export default class BlindtestCustomizerForm extends React.Component {

    constructor(props) {
        super(props);
        const playlistSize = parseInt(window.localStorage.getItem('playlist_size'))
        const guessTime = parseInt(window.localStorage.getItem('guess_time'))
        const waitTime = parseInt(window.localStorage.getItem('wait_time'))
        const allowSameLicence = (window.localStorage.getItem('allow_same_licence') === 'true')

        this.defaultplaylistSize = playlistSize ? playlistSize : 100
        this.defaultGuessTime = guessTime ? guessTime : 13
        this.defaultWaitTime = waitTime ? waitTime : 5

        this.state = {
            opened: false,
            playlistSize: this.defaultplaylistSize,
            guessTime: this.defaultGuessTime,
            waitTime: this.defaultWaitTime,
            allowSameLicence: allowSameLicence,
            seed: MersenneTwister19937.autoSeed().next(),
            classes:  makeStyles((theme) => ({
                formControl: {
                    margin: theme.spacing(1),
                    minWidth: 120,
                }
            }))
        }

        this.updatePlaylistSize = this.updatePlaylistSize.bind(this);
        this.updateGuessTime = this.updateGuessTime.bind(this);
        this.updateWaitTime = this.updateWaitTime.bind(this);
        this.handleSwitchChange = this.handleSwitchChange.bind(this);
        this.updateSeed = this.updateSeed.bind(this);
    }

    valuetext(value) {
        return `${value}`;
    }

    updatePlaylistSize(event) {
        const newPlaylistSize = parseInt(event.target.value)

        if (!newPlaylistSize) {
            window.localStorage.setItem('playlist_size', '0');
        }
        this.setState({
            playlistSize: newPlaylistSize
        })
        window.localStorage.setItem('playlist_size', !newPlaylistSize ? '0' : newPlaylistSize.toString())
    }

    updateSeed(event) {
        const newSeed = parseInt(event.target.value)

        if (!newSeed) {
            window.localStorage.setItem('seed', '0')
        }
        this.setState({
            seed: newSeed
        })
        window.localStorage.setItem('seed', !newSeed ? '0' : newSeed)
    }

    updateGuessTime(event) {
        const actualGuessTime = this.state.guessTime
        const newGuessTime = parseInt(event.target.innerText)

        if (newGuessTime && actualGuessTime !== newGuessTime) {
            this.setState({
                guessTime: newGuessTime
            })
            window.localStorage.setItem('guess_time', newGuessTime.toString());
        }
    }

    updateWaitTime(event) {
        const actualWaitTime = this.state.waitTime
        const newWaitTime = parseInt(event.target.innerText)


        if (newWaitTime && actualWaitTime !== newWaitTime) {
            this.setState({
                waitTime: newWaitTime
            })
            window.localStorage.setItem('wait_time', newWaitTime.toString());
        }
    }

    handleSwitchChange(event) {
        window.localStorage.setItem('allow_same_licence', event.target.checked.toString())
        this.setState({
            allowSameLicence: event.target.checked
        })
    }

    render() {
        return (
            <React.Fragment>
                <Typography variant="h6" align='center' style={{ color: 'white' }}>
                    Customize Blindtest
                </Typography>
                <Box align='center'>
                    <FormControl component="fieldset" style={{ marginTop: '5%' }}>
                        <FormGroup>
                            <FormLabel component="legend" style={{ color: '#DCDDDC' }}>
                                Size of Playlist
                            </FormLabel>
                            <TextField
                                type="number"
                                inputProps={{min: 0, style: { textAlign: 'center', color: 'white' }}}
                                value={this.state.playlistSize}
                                onChange={this.updatePlaylistSize}
                                name="numberformat"
                                id="formatted-numberformat-input"

                            />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel component="legend" style={{ marginBottom: '40px', marginTop: '40px', color: '#DCDDDC' }}>
                                Guess Time
                            </FormLabel>
                            <CustomSlider
                                defaultValue={this.defaultGuessTime}
                                onChange={this.updateGuessTime}
                                getAriaValueText={this.valuetext}
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="on"
                                step={1}
                                marks
                                min={5}
                                max={20}
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel component="legend" style={{ marginBottom: '40px', marginTop: '40px', color: '#DCDDDC' }}>
                                Time before next Guess
                            </FormLabel>
                            <CustomSlider
                                defaultValue={this.defaultWaitTime}
                                onChange={this.updateWaitTime}
                                getAriaValueText={this.valuetext}
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="on"
                                step={1}
                                marks
                                min={1}
                                max={10}
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel component="legend" style={{ marginTop: '40px', color: '#DCDDDC' }}>Allow multiple selection per Licence</FormLabel>
                            <Box align='center'>
                                <GreenSwitch checked={this.state.allowSameLicence} onChange={this.handleSwitchChange} name="allow-same_licence"/>
                            </Box>
                        </FormGroup>
                        <FormGroup>
                            <Typography align='center' style={{ marginTop: '40px', color: '#DCDDDC' }}>
                                Seed
                            </Typography>
                            <TextField
                                type="number"
                                inputProps={{style: { textAlign: 'center', color: 'white' }}}
                                value={this.state.seed}
                                onChange={this.updateSeed}
                                name="seed"
                                id="formatted-seed-input"

                            />
                        </FormGroup>
                    </FormControl>
                </Box>
            </React.Fragment>
        );
    }
}