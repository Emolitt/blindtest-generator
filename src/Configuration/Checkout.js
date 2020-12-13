import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import ThemeSelectorForm from './ThemeSelectorForm';
import Review from './Review';
import clsx from "clsx";
import Check from "@material-ui/icons/Check";
import PropTypes from "prop-types";
import BlindtestCustomizerForm from "./BlindtestCustomizerForm";
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
    StepConnector
} from "@material-ui/core";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center" style={{
            backgroundColor: '#282D35',
            color: 'white'
        }}>
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Emolitt
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
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
            borderColor: '#784af4',
        },
    },
    completed: {
        '& $line': {
            borderColor: '#784af4',
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
        color: '#e8176b',
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
    completed: {
        color: '#e8176b',
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
    /*
    TODO ajouter une visuel d'aide des touches
    Arrow Up: Volume Up (Max 100)
    Arrow Down: Volume Down (Min 0)
    Space: Pause/Play
    Escape: Go back to Menu
    F11: Toggle Fullscreen
    */

    constructor(props) {
        super(props);

        this.state = {
            activeStep: 0
        }

        this.setActiveStep = this.setActiveStep.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.startBlindtest = this.startBlindtest.bind(this);

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
        this.props.history.push('/blindtest');
    }

    setActiveStep(step) {
        this.setState({
            activeStep: step
        })
    }

    handleNext() {
        this.setActiveStep(this.state.activeStep + 1);
    };

    handleBack() {
        this.setActiveStep(this.state.activeStep - 1);
    };

    render() {
        return (
            <div style={{ overflow: 'hidden' }}>
                <React.Fragment>
                    <CssBaseline />
                    <AppBar position="absolute" color="default">
                        <Toolbar>
                            <Typography variant="h6" color="inherit" noWrap>
                                Blindtest Generator
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Box>
                        <Typography component="h1" variant="h4" align="center">
                            Configure
                        </Typography>
                        <Stepper alternativeLabel activeStep={this.state.activeStep} connector={<QontoConnector />}>
                            {steps.map((label) => (
                                <Step key={label}>
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
                    <Box>
                        {this.state.activeStep !== 0 && (
                            <Button onClick={this.handleBack}>
                                Back
                            </Button>
                        )}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.state.activeStep === steps.length - 1 ? this.startBlindtest : this.handleNext}
                        >
                            {this.state.activeStep === steps.length - 1 ? 'Start' : 'Next'}
                        </Button>
                    </Box>
                    <Copyright />
                </React.Fragment>
            </div>
        );
    }
}