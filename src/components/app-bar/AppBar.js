import React from "react";
import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import CommandHelperPopup from "../command-helper-popup/CommandHelperPopup";
import './AppBar.css'
import {useNavigate} from "react-router-dom";

export default function CustomAppBar(props) {
    const navigate = useNavigate();

    const navigateToMenu = () => {
        navigate('/');
    }

    return <AppBar position="absolute" style={{backgroundColor : '#282D35', flex: 1}}>
        <Toolbar>
            <Button onClick={navigateToMenu} className={'main-menu-btn'}>
                <Typography variant="h6" color="inherit" noWrap style={{color: "white"}}>
                    Blindtest Generator
                </Typography>
            </Button>
            <CommandHelperPopup/>
        </Toolbar>
    </AppBar>
}