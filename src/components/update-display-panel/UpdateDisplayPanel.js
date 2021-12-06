import React, {useState} from "react";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";
import './UpdateDisplayPanel.css'

export default function UpdateDisplayPanel(props) {
    const [key, setKey] = useState(1);

    const scrolling = useSpring({
        from: { transform: "translate(300%,0)" },
        to: { transform: "translate(-300%,0)" },
        config: { duration: props.message.length * 150 },
        reset: true,
        //reverse: key % 2 == 0,
        onRest: () => {
            setKey(key + 1);
        }
    });

    return (
        <div className="scroller-container">
            <animated.div style={scrolling}>{props.message}</animated.div>
        </div>
    );
}

UpdateDisplayPanel.propTypes = {
    message: PropTypes.string
};