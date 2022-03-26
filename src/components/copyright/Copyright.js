import {Link, Typography} from "@mui/material";
import React from "react";

export default function Copyright() {
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
                {'v4.9.1 - Copyright © '}
                <Link color="inherit" href="https://github.com/Emolitt/blindtest-generator" target='_blank'>
                    Emolitt
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </div>
    );
}
