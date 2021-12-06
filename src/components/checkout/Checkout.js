import {Box, Button, Step, StepLabel, Stepper} from "@mui/material";
import React, {useState} from "react";
import PropTypes from "prop-types";
import {StepIcon} from "../index";
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import './Checkout.scss';
import {localStorageHelper} from "../../utils/localStorageHelper";

//Progress Bar
const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        borderColor: '#0FDC06',
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#0FDC06'
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#0FDC06',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));

export default function Checkout(props) {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);

    const getStepContent = () => {
        if (step >= props.stepComponents.length) {
            throw new Error('Unknown step');
        }
        return props.stepComponents[step];
    }

    const startBlindtest = () => {
        localStorageHelper.setRandomSessionId();
        navigate('/blindtest');
    }

    const handleNext = () => {
        setStep(actualStep => actualStep + 1);
    };

    const handleBack = () => {
        setStep(actualStep => actualStep - 1);
    };

    return <div>
        <Box>
            <Stepper alternativeLabel activeStep={step} connector={<QontoConnector />} style={{marginTop: '100px'}}>
                {props.stepLabels.map((label) => (
                    <Step key={label}>
                        <StepLabel className="stepper" StepIconComponent={StepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
        <Box>
            <div className="step-container">
                {getStepContent()}
            </div>
        </Box>
        <div style={{
            position: 'fixed',
            bottom: '77px',
            right: '20px'
        }}>
            {step !== 0 && (
                <Button onClick={handleBack} style={{color : '#0FDC06'}}>
                    Back
                </Button>
            )}
            <Button
                variant="contained"
                style={{backgroundColor : '#0FDC06'}}
                onClick={step === props.stepComponents.length - 1 ? startBlindtest : handleNext}
            >
                {step === props.stepComponents.length - 1 ? 'Start' : 'Next'}
            </Button>
        </div>
    </div>
}

Checkout.propTypes = {
    stepLabels: PropTypes.array,
    stepComponents: PropTypes.array
}