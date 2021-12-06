import {Button} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";


export default function CustomButton(props) {
    return <Button
        variant="contained"
        style={{backgroundColor : '#0FDC06'}}
        onClick={props.onClick}
    >
        {props.children}
    </Button>
}

CustomButton.prototype = {
    onClick: PropTypes.func,
    children: PropTypes.element.isRequired
}