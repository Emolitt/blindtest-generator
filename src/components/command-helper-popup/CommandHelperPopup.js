import React, {useState} from "react";
import {IconButton, List, ListItem, Menu, Typography} from "@mui/material";
import HelpIcon from '@mui/icons-material/Help';
import './CommandHelperPopup.css'


export default function CommandHelper() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openedHelp, setOpenedHelp] = useState(false);

    const handleMenu = (event) => {
        const anchor = event.currentTarget;

        setAnchorEl(anchor);
        setOpenedHelp(Boolean(anchor));
    }

    const handleClose = () => {
        setAnchorEl(null);
        setOpenedHelp(false);
    }

    return <div className={'helper-icon'}>
        <IconButton
            edge="end"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
        >
            <HelpIcon />
        </IconButton>
        <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={openedHelp}
            onClose={handleClose}
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
}