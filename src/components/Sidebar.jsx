import React, { useState } from 'react'
import { BsChat, BsFillChatDotsFill } from 'react-icons/bs'
import { FiCalendar, FiSettings } from 'react-icons/fi'
import { RiDashboard2Fill, RiDashboardLine } from 'react-icons/ri'
import {SiGraphql} from 'react-icons/si'
import randomUser from '../assets/user.png'

import '../css/sidebar.css'
import { GetCurrentPath, IconButton, MenuItem } from './Common'


const menuOptions = [
	{
		title:'Dashboard',
		icon:<RiDashboardLine size={24}/>,
		path:'/dashboard'
	},
	{
		title:'Calendar',
		icon:<FiCalendar size={24}/>,
		path:'/calendar'
	},
	{
		title:'Chats',
		icon:<BsChat size={24}/>,
		path:'/chats'
	},
	{
		title:'Settings',
		icon:<FiSettings size={24}/>,
		path:'/settings'
	},
]

const Sidebar = () => {

	const [isHovering, setIsHovering] = useState(false)
    return (
        <React.Fragment>
            <div className="sidebar-container" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <div className="app-logo-div">
					<div style={{display:'flex', alignItems: 'center', justifyContent: 'center'}}>
						<SiGraphql size={30}/>
					</div>
					<p className="title t3" style={{marginLeft: 30}}>AppName</p>
				</div>
				<div>
					{menuOptions.map(option => {
						return <MenuItem title={option.title} path={option.path} icon={option.icon} isHovering={isHovering} isActive={GetCurrentPath() === option.path}/>
					})}
				</div>
            </div>
            <div className={GetCurrentPath() === '/dashboard' ? "navbar-container isHome" : 'navbar-container'} style={{display: 'none'}}>
                
				<div style={{margin:'auto 10px'}}>
                    <IconButton icon={<FiSettings size={21}/>} />
				</div>

				<div className="my-profile-box">
					<div className="changeColorBG" style={{width: 40, height: 40, borderRadius: 25, backgroundColor: '#eee', display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexDirection: "row", cursor: "pointer"}}>
						<img className="changeColorBG" src={randomUser} style={{width: 35, height: 35, marginLeft: 0, marginTop: 5}}/>
					</div>
					<div style={{display: "flex", flexDirection: "column", alignItems: "flex-end"}}>
						<h6 style={{fontSize: 15, fontFamily: 'wh-bold', fontWeight: 600, margin:0, padding: 0, marginTop: 5}}>
						Name Surname</h6>
						<p style={{fontSize: 13, color: '#878787', fontFamily: 'wh-sbold', fontWeight: 500, margin:0, padding: 0}}>
	                    Designation
                        </p>
						
					</div>
				</div>
            </div>
        </React.Fragment>
    )
}

export default Sidebar