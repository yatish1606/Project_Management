import React from 'react'
import {useLocation} from 'react-router-dom'
import '../css/global.css'
import {Link} from 'react-router-dom'


export const IconButton = ({icon, onClick, style}) => {
    return (
        <div className="iconbutton" onClick={onClick} style={style}>
            {icon}
        </div>
    )
}

export const AppButton = ({title, hasIcon, icon, onClick, primary, secondary, style, disabled}) => {
    return (
        <div className={secondary ? "button secondary" : 'button'} style={style} onClick={disabled ? null : onClick}>
            {hasIcon ? <div className="lg" style={{height:'100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>{icon}</div> : null}
            <p className={secondary ? "t45 lg secondary-color" : 't45 lg'} style={{marginLeft: hasIcon ? 7 : 0, letterSpacing: 0.8, fontFamily:'wh-sbold'}}>{title}</p>
        </div>
    )
}

export const MenuItem = ({title, icon, path, isHovering, isActive}) => {
    return (
        <Link to={path}>
        <div className={isActive ? "hover lgBG" : 'hover'}
            style={{width: isHovering ? 260 : 60, height: 60, margin:'10px 0', display: 'flex', borderRadius: isHovering ? 5 : 30, alignItems: 'center', flexDirection: 'row', paddingLeft: 18, overflow: 'hidden'}}
        >
            <div className={isActive ? "themeColor" : 'title'} style={{display:'flex', alignItems: 'center', justifyContent: 'center'}}>
                {icon}
            </div>
            
            <p className={isActive ? 't4 themeColor' : "t4 title"} style={{marginLeft: 40, textDecoration:'none'}}>{title}</p>
        </div>
        </Link>
    )
}

export const ProjectCard = ({}) => {
    return (
        <div className='projects-card'>

        </div>
    )
}

export const ProjectCardSmall = ({}) => {
    return (
        <div className='projects-card' style={{height: 225}}>

        </div>
    )
}

export const GetCurrentPath = () => useLocation().pathname

export const ProgressProvider = ({ valueStart, valueEnd, children }) => {
    const [value, setValue] = React.useState(valueStart)
    React.useEffect(() => {
      setValue(valueEnd)
    }, [valueEnd])
  
    return children(value)
}

export const UpcomingTaskCard = () => {
    return (
        <div className="" style={{width: window.innerWidth * 0.25 - 50, margin:'10px 25px 5px 25px', borderRadius: 5, padding: '10px 0px 15px 0', position:'relative', borderBottom: '1px solid #eee', cursor:'pointer'}}>
            <p className="t45 title" style={{marginTop: 0}}>Plan Management Meeting</p>
            <p className="t6 title" style={{marginTop: 5}}>Comex Application</p>
            <div style={{width: 70, height: 25, borderRadius: 5, position: 'absolute', top: 10, right: 5, backgroundColor: 'white', padding:0}}>
                <div className="dangerBG" style={{width: 60, height: 21, padding:'2px 5px', borderRadius: 5,display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#E048002a'}}>
                    <p className="t55 danger">Due 23/4</p>
                </div>
            </div>
        </div>
    )
}

export const CustomInput = ({placeholder, onChange, onFocus, onBlur, size, type, value}) => {
    return (
        <div style={{width:'100%', height:40, display: 'flex', flexDirection: 'row'}}>
            <input
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            />
        </div>
    )
}