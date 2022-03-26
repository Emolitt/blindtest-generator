import React from "react";
import Switch from "@mui/material/Switch";
import PropTypes from "prop-types";
import "./CustomSwitch.scss"

export default function CustomSwitch(props) {
    const {checked, onChange} = props;

    return (
        <Switch className="custom-switch"
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