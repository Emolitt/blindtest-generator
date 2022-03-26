import React from "react";
import {
    Button
} from "@mui/material";
import {Helmet} from "react-helmet";
import {Copyright, UpdateDisplayPanel} from "../components";
import {useNavigate} from "react-router-dom";

const containerController = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}

const buttonStyle = (customColor) => {
    return {backgroundColor : customColor,
        marginTop: '8%',
        width: '40%',
        height: '50px'
    }
}

export default function HomePage () {
    const navigate = useNavigate();

    const navigateToCheckout = () => {
        navigate('/generate');
    }

    const navigateToAssets = () => {
        navigate('/assets');
    }

    const navigateToContributors = () => {
        navigate('/contributors');
    }

    return <div style={{ overflow: 'hidden' }}>
        <Helmet bodyAttributes={{style: 'background-color : #282D35'}}/>
        <div style={containerController}>
            <UpdateDisplayPanel message={'Update: Drink mode added, you can now increase the challenge with random drink distribution ! (Alcohol abuse is dangerous for your health)'}/>
            <Button variant="contained" style={buttonStyle('#0FDC06')} onClick={navigateToCheckout}>
                Generate Blindtest
            </Button>
            <Button variant="contained" style={buttonStyle('#4c54dd')} onClick={navigateToAssets}>
                See Assets Library
            </Button>
            <Button variant="contained" style={buttonStyle('#b53ad6')} onClick={navigateToContributors}>
                See contributors
            </Button>
        </div>
        <Copyright />
    </div>
}