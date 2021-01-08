import React from 'react'
import '../css/global.css'

export const IconButton = ({icon, onClick, style}) => {
    return (
        <div className="iconbutton" onClick={onClick} style={style}>
            {icon}
        </div>
    )
}