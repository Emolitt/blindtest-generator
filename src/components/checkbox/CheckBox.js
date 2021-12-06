import React from 'react';
import './CheckBox.scss'

export default function CheckBox({id, title, backgroundImg, width, height, active, onClick}) {

    return <div className={`checkbox-container ${active ? 'active' : ''}`} style={{
        backgroundImage: "url(" + backgroundImg + ")",
        width: `${width | 150}px`,
        height: `${height | 150}px`
    }}
                onClick={() => onClick(id, !active)}
    >
        <span>{title}</span>
    </div>
}