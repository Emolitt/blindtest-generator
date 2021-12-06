import React from "react";
import {
    Button,
    Typography,
} from "@mui/material";
import {Helmet} from "react-helmet";
import {Copyright} from "../components";
import {useNavigate} from "react-router-dom";

const containerController = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'white'
}

const buttonStyle = (customColor) => {
    return {
        backgroundColor : customColor,
        marginTop: '1%',
        marginLeft: '1%',
        width: '10%',
        height: '40px'
    }
}

export default function ContributorsPage() {
    const navigate = useNavigate();

    const navigateToMenu = () => {
        navigate('/')
    }

    return <div style={{ overflow: 'hidden' }}>
        <Helmet bodyAttributes={{style: 'background-color : #282D35'}}/>
        <Button variant="contained" style={buttonStyle('#4c54dd')} onClick={navigateToMenu}>
            Menu
        </Button>
        <div style={containerController}>
            <Typography color='inherit'>Work In Progress..</Typography>
        </div>
        <Copyright />
    </div>
}