import React from "react";
import Switch from "@mui/material/Switch";
import PropTypes from "prop-types";
import {styled} from "@mui/material/styles";
import {lightGreen} from "@mui/material/colors";
import {alpha} from "@mui/material";

const GreenSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: lightGreen[600],
        '&:hover': {
            backgroundColor: alpha(lightGreen[600], theme.palette.action.hoverOpacity),
        },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: lightGreen[600],
    },
}));

export default function CustomSwitch(props) {
    const {checked, onChange} = props;

    return (
        <GreenSwitch
            checked={checked}
            onChange={onChange}
            size={"medium"}
        />
    )
}

CustomSwitch.prototype = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func
}