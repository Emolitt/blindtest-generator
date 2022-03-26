import React, {useState} from "react";
import './PlaylistCustomizer.scss'
import {localStorageHelper} from '../../../utils/localStorageHelper';

import styled from "@emotion/styled";

import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import Input from "@mui/material/Input";
import {CustomSwitch} from "../../../components";

const StyledInput = styled(Input)`
  width: 100px;
`;

const marks = [
    {
        value: 0,
        label: 'Music Start',
    },
    {
        value: 5,
        label: '5 Sec',
    },
    {
        value: 10,
        label: '10 Sec',
    },
    {
        value: 15,
        label: '15 Sec',
    },
    {
        value: 20,
        label: '20 Sec',
    },
    {
        value: 25,
        label: 'End',
    },
];

const minValue = 0;
const maxValue = 25;
const leftOffset = 5;
const minDistance = 5;
const maxDistance = 100;
const maxPlaylistSize = 1000;

export function PlaylistCustomizer() {
    const savedPlaylistSize = localStorageHelper.getPlaylistSize();
    const savedTimeline = localStorageHelper.getTimeline();
    savedTimeline[1] += savedTimeline[0];
    const savedAllowMultipleLicence = localStorageHelper.getAllowMultipleLicence();
    const [playlistSize, setPlaylistSize] = useState(savedPlaylistSize);
    const [timeline, setTimeline] = useState(savedTimeline);
    const [multipleLicence, setMultipleLicence] = useState(savedAllowMultipleLicence);

    const handleMultipleLicenceChange = (event) => {
        setMultipleLicence(event.target.checked);
        localStorageHelper.setAllowMultipleLicence(event.target.checked);
    };

    const handlePlaylistSizeSliderChange = (event, newValue) => {
        setPlaylistSize(newValue);
        localStorageHelper.setPlaylistSize(newValue === '' ? 0 : newValue);
    };
    const handlePlaylistSizeInputChange = (event) => {
        setPlaylistSize(event.target.value === '' ? '' : Number(event.target.value));
        localStorageHelper.setPlaylistSize(event.target.value === '' ? 0 : Number(event.target.value));
    };

    const handleBlur = () => {
        if (playlistSize < 0) {
            setPlaylistSize(0);
            localStorageHelper.setPlaylistSize(0);
        } else if (playlistSize > maxPlaylistSize) {
            setPlaylistSize(maxPlaylistSize);
            localStorageHelper.setPlaylistSize(maxPlaylistSize);
        }
    };

    const handleTimelineChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], maxDistance - minDistance);
                if (clamped + minDistance <= maxValue) {
                    setTimeline([clamped, clamped + minDistance]);
                    localStorageHelper.setTimeline([clamped, minDistance]);
                }
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                if (clamped - minDistance >= minValue + leftOffset) {
                    setTimeline([clamped - minDistance, clamped]);
                    localStorageHelper.setTimeline([clamped - minDistance, clamped - (clamped - minDistance)]);
                }
            }
        } else {
            if (newValue[activeThumb] >= minValue + leftOffset) {
                setTimeline(newValue);
                localStorageHelper.setTimeline([newValue[0], newValue[1] - newValue[0]]);
            }
        }
    };

    return <div className="playlist-customizer-container">
        <div className="title">
            <h1>Playlist Customization</h1>
        </div>
        <div>
            <h3>Playlist size</h3>
            <div className="playlist-size">
                <Slider
                    value={typeof playlistSize === 'number' ? playlistSize : 0}
                    onChange={handlePlaylistSizeSliderChange}
                />
                <StyledInput
                    value={playlistSize}
                    size="small"
                    onChange={handlePlaylistSizeInputChange}
                    onBlur={handleBlur}
                    inputProps={{
                        step: 5,
                        min: 0,
                        max: maxPlaylistSize,
                        type: 'number'
                    }}
                />
            </div>
            <h3>Time Selection</h3>
            <div className="time-selection">
                <h4>{`${timeline[0] - minValue} sec to guess, then ${timeline[1] - timeline[0]} sec to enjoy the results`}</h4>
                <Slider
                    step={1}
                    min={minValue}
                    max={maxValue}
                    marks={marks}
                    value={timeline}
                    onChange={handleTimelineChange}
                    valueLabelDisplay="off"
                    track={false}
                    disableSwap
                    className="timeline"
                />
            </div>
            <h3>Allow Multiple Selection per Licence </h3>
            <div className="multiple-licence-selection">
                <CustomSwitch
                    checked={multipleLicence}
                    onChange={handleMultipleLicenceChange}
                />
            </div>
        </div>

    </div>
}