import React from 'react'
import {useLocation} from 'react-router-dom'
import '../css/global.css'
import {Link} from 'react-router-dom'
import { FiBookmark, FiCheckCircle } from 'react-icons/fi'
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import userImage from '../assets/user.png'
import userImage2 from '../assets/user2.png'
import userImage3 from '../assets/user3.png'
import userImage4 from '../assets/user4.png'
import {RiChat3Line} from 'react-icons/ri'
import { CgInbox } from 'react-icons/cg'


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

export const ProjectCard = ({priority}) => {
    return (
        <div className='projects-card'>
            <p className="t445 title">Project title here</p>
            <div className="horizontal" style={{marginTop: 20}}>
                <div className="horizontal" style={{justifyContent: 'flex-start'}}>
                    <div className="project-priority" style={{backgroundColor: priority === 'low' ? '#04C6022a' : priority === 'medium' ? '#F6B5003a' : '#E53A002a'}}>
                        <p className="t6" style={{fontFamily:'wh-bold', letterSpacing: 1, color: priority === 'low' ? '#04C602' : priority === 'medium' ? '#F6B500' : '#E53A00'}}>HIGH</p>
                    </div>
                    <p className="t5 sub"style={{marginLeft: 10}}>Due in 4 days</p>
                </div>
                <div className="horizontal" style={{justifyContent: 'flex-end'}}>
                    <FiCheckCircle size={18} className="sub"/>
                    <p className="t5 title"style={{marginLeft: 10}}>2/8</p>
                </div>
            </div>
            <div className="progress-bar-outer">
                <div className="progress-bar-inner" style={{width:'75%'}}></div>
            </div>
            <div className="horizontal" style={{marginTop: 7}}>
                <p className="t5 sub" style={{marginLeft: 3}}>Progress</p>
                <p className="t445 title">75%</p>
            </div>
            <div className="horizontal" style={{marginTop: 20}}>
                <div className="students-box" style={{marginBottom:0, paddingBottom:0, marginTop:0}}>
					<div className="students-box-circle" style={{marginLeft: 0, background: '#09a407'}}><img src={userImage}/></div>
					<div className="students-box-circle" style={{marginLeft: 17,  background: '#0F98D9', transform: 'scale(1.02)'}}><img src={userImage3}/></div>
					<div className="students-box-circle" style={{marginLeft: 34,  background: '#545454', transform: 'scale(1.05)'}}><img src={userImage4}/></div>
                    <p className="t55 title" style={{marginLeft: 70, letterSpacing:0.3, marginTop: 8}}>3 people</p>
                </div>
                <div className="horizontal" style={{justifyContent: 'flex-end', marginTop: 8}}>
                    <RiChat3Line size={16} className="sub"/>
                    <p className="t5 title" style={{marginLeft: 5, marginRight: 10}}>18</p>
                    <FiBookmark size={16} className="sub"/>
                    <p className="t5 title" style={{marginLeft: 5}}>5</p>
                </div>
            </div>
        </div>
    )
}

export const ProjectCardSmall = ({}) => {
    return (
        <div className='projects-card' style={{height: 225}}>

        </div>
    )
}

export const ProjectCardSmallEmpty = ({title, description}) => {
    return (
        <div className='projects-card-empty' style={{height: 200}}>
            <CgInbox size={50} className="vdg" style={{marginTop: 5}}/>
            <p className="t4 themeColor">{title}</p>
            <p className="t5 sub">{description}</p>
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
            <div className="backgroundbg" style={{width: 70, height: 25, borderRadius: 5, position: 'absolute', top: 10, right: 5, padding:0}}>
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

export function getRandomColor(fadeColor) {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    if(fadeColor)
        return color.concat('5a')
    return color;
}