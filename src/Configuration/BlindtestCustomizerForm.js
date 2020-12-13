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

    updateGuessTime(event) {
        const actualGuessTime = this.state.guessTime
        const newGuessTime = parseInt(event.target.innerText)

        if (actualGuessTime !== newGuessTime) {
            this.setState({
                guessTime: newGuessTime
            })
            window.localStorage.setItem('guess_time', this.valuetext(newGuessTime));
        }
    }

    updateWaitTime(event) {
        const actualWaitTime = this.state.waitTime
        const newWaitTime = parseInt(event.target.innerText)


        if (actualWaitTime !== newWaitTime) {
            this.setState({
                waitTime: newWaitTime
            })
            window.localStorage.setItem('wait_time', this.valuetext(newWaitTime));
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
                <Typography variant="h6" gutterBottom align='center'>
                    Customize Blindtest
                </Typography>
                <Box align='center'>
                    <FormControl component="fieldset">
                        <FormGroup>
                            <FormLabel component="legend" gutterBottom>
                                Size of Playlist
                            </FormLabel>
                            <TextField
                                type="number"
                                inputProps={{min: 0, style: { textAlign: 'center' }}}
                                color="secondary"
                                value={this.state.playlistSize}
                                onChange={this.updatePlaylistSize}
                                name="numberformat"
                                id="formatted-numberformat-input"
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel component="legend" gutterBottom style={{ marginBottom: '40px' }}>
                                Guess Time
                            </FormLabel>
                            <Slider
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
                            <FormLabel component="legend" gutterBottom style={{ marginBottom: '40px' }}>
                                Time before next Guess
                            </FormLabel>
                            <Slider
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
                            <FormLabel component="legend">Allow multiple selection per Licence</FormLabel>
                            <Box align='center'>
                                <Switch checked={this.state.allowSameLicence} onChange={this.handleSwitchChange} name="allow-same_licence" />
                            </Box>
                        </FormGroup>
                    </FormControl>
                </Box>
            </React.Fragment>
        );
    }
}