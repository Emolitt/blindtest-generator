import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import ThemeSelectorForm from './ThemeSelectorForm';
import Review from './Review';
import clsx from "clsx";
import Check from "@material-ui/icons/Check";
import PropTypes from "prop-types";
import BlindtestCustomizerForm from "./BlindtestCustomizerForm";
import HelpIcon from "@material-ui/icons/Help"
import { v4 } from 'uuid';

import {
    CssBaseline,
    AppBar,
    Toolbar,
    Stepper,
    Step,
    StepLabel,
    Button,
    Link,
    Typography,
    Box,
    StepConnector,
    List,
    ListItem,
    Menu,
    IconButton
} from "@material-ui/core";
import {Helmet} from "react-helmet";

function Copyright() {
    return (
        <div style={{
            position: 'fixed',
            bottom: '10px',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <Typography variant="body2" color="textSecondary" align="center" style={{
                backgroundColor: '#282D35',
                color: 'white'
            }}>
                {'Copyright © '}
                <Link color="inherit" href="https://github.com/Emolitt/blindtest-generator">
                    Emolitt
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </div>
    );
}

//Progress Bar
const QontoConnector = withStyles({
    alternativeLabel: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    active: {
        '& $line': {
            borderColor: '#0FDC06',
        },
    },
    completed: {
        '& $line': {
            borderColor: '#0FDC06',
        },
    },
    line: {
        borderColor: '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
    root: {
        color: '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
    },
    active: {
        color: '#0FDC06',
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
    completed: {
        color: '#0FDC06',
        zIndex: 1,
        fontSize: 18,
    },
});


function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
            })}
        >
            {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
        </div>
    );
}

QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
};

const steps = ['Select theme', 'Select Parameters', 'Validate'];

export default class Checkout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeStep: 0,
            anchorEl: null,
            openedHelp: false
        }

        this.setActiveStep = this.setActiveStep.bind(this);
        this.setAnchorEl = this.setAnchorEl.bind(this);
        this.handleMenu = this.handleMenu.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.startBlindtest = this.startBlindtest.bind(this);

        window.localStorage.setItem('session_id', '');

    }

    getStepContent() {
        const step = this.state.activeStep
        switch (step) {
            case 0:
                return <ThemeSelectorForm />;
            case 1:
                return <BlindtestCustomizerForm />;
            case 2:
                return <Review />;
            default:
                throw new Error('Unknown step');
        }
    }

    startBlindtest() {
        window.localStorage.setItem('session_id', v4());
        this.props.history.push('/blindtest');
    }

    setActiveStep(step) {
        this.setState({
            activeStep: step
        })
    }

    setAnchorEl(anchor) {
        this.setState({
            anchorEl: anchor,
            openedHelp: Boolean(anchor)
        })
    }

    handleNext() {
        this.setActiveStep(this.state.activeStep + 1);
    };

    handleBack() {
        this.setActiveStep(this.state.activeStep - 1);
    };

    handleMenu(event) {
        this.setAnchorEl(event.currentTarget);
    };

    handleClose() {
        this.setAnchorEl(null);
    };

    render() {
        return (
            <div style={{ overflow: 'hidden' }}>
                <Helmet bodyAttributes={{style: 'background-color : #282D35'}}/>
                <React.Fragment>
                    <CssBaseline />
                    <AppBar position="absolute" style={{backgroundColor : '#282D35', flex: 1}}>
                        <Toolbar>
                            <Typography variant="h6" color="inherit" noWrap>
                                Blindtest Generator
                            </Typography>
                            <div style={{ marginLeft: 'auto' }}>
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <HelpIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={this.state.anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={this.state.openedHelp}
                                    onClose={this.handleClose}
                                >
                                    <Typography variant="h6" align="center">
                                        Input List
                                    </Typography>
                                    <div>
                                        <List>
                                            <ListItem>
                                                <strong>Arrow Up</strong>: Volume Up (Max 100)
                                            </ListItem>
                                            <ListItem>
                                                <strong>Arrow Down</strong>: Volume Down (Min 0)
                                            </ListItem>
                                            <ListItem>
                                                <strong>Arrow Left</strong>: Restart Current Element
                                            </ListItem>
                                            <ListItem>
                                                <strong>Arrow Right</strong>: Skip Element
                                            </ListItem>
                                            <ListItem>
                                                <strong>Space</strong>: Toggle Pause/Play
                                            </ListItem>
                                            <ListItem>
                                                <strong>Escape</strong>: Go Back to Menu
                                            </ListItem>
                                            <ListItem>
                                                <strong>F11</strong>: Toggle Fullscreen
                                            </ListItem>
                                        </List>
                                    </div>
                                </Menu>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <Box>
                        <Typography component="h1" variant="h4" align="center">
                            Configure
                        </Typography>
                        <Stepper style={{backgroundColor : '#282D35'}} alternativeLabel activeStep={this.state.activeStep} connector={<QontoConnector />}>
                            {steps.map((label) => (
                                <Step key={label} >
                                    <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                    <Box>
                        <React.Fragment>
                            {this.getStepContent()}
                        </React.Fragment>
                    </Box>
                    <div style={{
                        position: 'fixed',
                        bottom: '77px',
                        right: '20px'
                    }}>
                        {this.state.activeStep !== 0 && (
                            <Button onClick={this.handleBack} style={{color : '#0FDC06'}}>
                                Back
                            </Button>
                        )}
                        <Button
                            variant="contained"
                            style={{backgroundColor : '#0FDC06'}}
                            onClick={this.state.activeStep === steps.length - 1 ? this.startBlindtest : this.handleNext}
                        >
                            {this.state.activeStep === steps.length - 1 ? 'Start' : 'Next'}
                        </Button>
                    </div>
                    <Copyright />
                </React.Fragment>
            </div>
        );
    }
}