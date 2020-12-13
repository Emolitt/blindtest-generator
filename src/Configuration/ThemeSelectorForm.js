import React from 'react';
import Typography from '@material-ui/core/Typography';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default class ThemeSelectorForm extends React.Component {

    constructor(props) {
        super(props);

        const theme = window.localStorage.getItem('theme')

        this.defaultTheme = theme ? theme : 'games'

        this.state = {
            opened: false,
            theme: this.defaultTheme,
            classes:  makeStyles((theme) => ({
                button: {
                    display: 'block',
                    marginTop: theme.spacing(2),
                },
                formControl: {
                    margin: theme.spacing(1),
                    minWidth: 120,
                },
            }))
        }

        this.setOpen = this.setOpen.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        window.localStorage.setItem('theme', event.target.value);
        this.setState({
            theme: event.target.value
        })
    };

    setOpen(state) {
        this.setState({
            opened: state
        })
    }

    handleClose() {
        this.setOpen(false);
    }

    handleOpen() {
        this.setOpen(true);
    }

    render() {
        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom align='center'>
                    Select Theme
                </Typography>
                <Box align='center'>
                    <FormControl className={this.state.classes.formControl} fullWidth>
                        <InputLabel id="demo-controlled-open-select-label">Theme</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={this.state.open}
                            onClose={this.handleClose}
                            onOpen={this.handleOpen}
                            value={this.state.theme}
                            onChange={this.handleChange}
                            defaultValue={this.defaultTheme}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value='games'>Video Games</MenuItem>
                            <MenuItem value='animes'>Anime</MenuItem>
                            <MenuItem value='film'>Films</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </React.Fragment>
        );
    }
}