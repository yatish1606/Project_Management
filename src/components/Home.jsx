import React from 'react'
import {BsThreeDots, BsThreeDotsVertical} from 'react-icons/bs'
import { RiBubbleChartLine} from 'react-icons/ri'
import { AppButton, GetCurrentPath, IconButton, ProjectCard, UpcomingTaskCard} from './Common'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'
import {ProgressProvider, ProjectCardSmall} from './Common'
import randomUser from '../assets/user.png'
import { Scrollbars } from 'react-custom-scrollbars'
import Lottie from 'react-lottie';
import * as animationData from '../assets/computer.json'

import '../css/global.css'
import '../css/home.css'
import { FiChevronDown, FiChevronRight, FiEdit3, FiPlus, FiShare2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const StatsCard = ({count, n1, n2}) => {
    return (
        <div style={{display: 'flex', flexDirection:'row', alignItems: 'center', marginRight:40}}>
            <p className="t0 themeColor">{count}</p>
            <div style={{display: 'flex', flexDirection: 'column', marginLeft: 10}}>
                <p className="t445 title" style={{fontSize: 15}}>{n1}</p>
                <p className="t445 title" style={{fontSize: 15, marginTop: 3}}>{n2}</p>
            </div>
        </div>
    )
}

const Home = () => {
    console.log(GetCurrentPath())
    return (
        <div className={GetCurrentPath() === '/dashboard' ? "main-container isHome" : 'main-container'} style={{display: 'flex', flexDirection: 'row', }}>
            
            <div className="home-left">
                <Scrollbars 
                    style={{width : window.innerWidth * 0.75 - 110, height: window.innerHeight}}
                    autoHide
                    autoHideDuration={1000}
                    autoHideTimeout={800}
                    renderThumbVertical={({ style, ...props }) =>
                    <div {...props} className="backgroundPrimary" style={{ ...style, opacity: 0.4 ,borderRadius: 10 , width: 8, paddingRight: 20, marginRight: 20}}/>
                    }
                    
                >
                <p className="t2 title" style={{marginTop: 10}}>Dashboard</p>
                <Link to="/project/new">
                    <AppButton 
                        style={{position: 'absolute', top: 10, right: 40}} 
                        title="New Project" 
                        hasIcon 
                        icon={<FiPlus 
                        size={18}/>}
                    />
                </Link>


                <div className="dashboard-info">
                    <Lottie
                        width={260}
                        height={130}
                        options={{
                            animationData: animationData.default,
                            loop: true,
                            autoplay: true,
                            rendererSettings: {
                                preserveAspectRatio: 'xMidYMid slice'
                            }
                        }}
                        style={{position: 'absolute', bottom:0, left: 40}}
                        speed={0.5}
                    />
                    <div style={{display: 'flex', flexDirection: 'column', marginLeft: 330}}>
                        <p className="t45 sub" style={{marginTop: 15}}>Hey John Doe, you have</p>
                        <p className="t4 title" style={{marginTop: 5, display: 'flex', flexDirection: 'row', alignItems: 'center', fontFamily:'wh-bold', fontSize: 16}}>
                            <StatsCard count={15} n1="ongoing" n2="projects"/>
                            <div className="dot"></div>
                            <StatsCard count={5} n1="upcoming" n2="tasks"/>
                            <div className="dot"></div>
                            <StatsCard count={1} n1="pending" n2="invitations"/>
                        </p>
                        
                        <IconButton icon={<FiChevronRight size={24}/>} style={{position: 'absolute', top: 35, right: 20}}/>
                    </div>
                </div>

                

                <div className="horizontal" style={{width:window.innerWidth * 0.75 - 130, marginTop: 40, alignItems: 'flex-start', boxSizing:'border-box'}}>
                    <div className="projects-container-item">
                        <div className="projects-container-item-header">
                            <p className="t445 title">Ongoing projects</p>
                            <p className="t5 themeColor clickable">add new</p>
                        </div>
                        <ProjectCard/>
                        <ProjectCard/>
                        <ProjectCard/>
                    </div>
                    <div className="projects-container-item">
                        <div className="projects-container-item-header">
                            <p className="t445 title">Completed projects</p>
                        </div>
                        <ProjectCardSmall/>
                    </div>
                    <div className="projects-container-item">
                        <div className="projects-container-item-header">
                            <p className="t445 title">Archived projects</p>
                        </div>
                        <ProjectCardSmall/>
                    </div>
                </div>

                <div className='stats-box'>
                    <div className="stats-box-inner">
                        <div className="horizontal">
                            <p className="t4">Stats</p>
                            <div className="horizontal stats-drop">
                                <p className="t45 title">all days</p>
                                <FiChevronDown size={20} className="title"/>
                            </div>
                        </div>
                    </div>
                </div>

                </Scrollbars>
            </div>


            <div className="home-right">       
                <Scrollbars 
                    style={{width : window.innerWidth * 0.25 - 5, height: window.innerHeight}}
                    autoHide
                    autoHideDuration={1000}
                    autoHideTimeout={800}
                    renderThumbVertical={({ style, ...props }) =>
                    <div {...props} className="backgroundPrimary" style={{ ...style, opacity: 0.4 ,borderRadius: 10 , width: 8, paddingRight: 20, marginRight: 20}}/>
                    }
                    
                >
                <div className="horizontal" style={{padding: '25px 25px 20px 25px', height: 50, alignItems: 'flex-start'}}>
                    <div>
                        <p className="t4 title">My Profile</p>
                        <p className="t6 sub" style={{marginTop: 6, fontFamily: 'wh-sbold'}}><span style={{fontSize: 13,}} className="themeColor">75%   </span>profile completed</p>
                    </div>                            
                    <IconButton icon={<BsThreeDots size={25} color="#878787"/>}/>
                </div> 

                <div className="home-profile-box">
                    <div style={{width: 150, height: 150, borderRadius: 150, overflow:'hidden'}}>
                        <ProgressProvider valueStart={0} valueEnd={75}>
                                {value => 
                                    <CircularProgressbarWithChildren 
                                        value={value} 
                                        circleRatio={1} 
                                        styles={buildStyles({
                                            pathTransitionDuration: 1.5,
                                            textColor: "#151515",
                                            pathColor: "green",
                                            trailColor: "transparent",     
                                        })}
                                        className="themeColor"
                                        strokeWidth={3}
                                        
                                    >
                                        <div style={{width: 110, height: 110, borderRadius: 150, overflow:'hidden', backgroundColor: '#eee'}}>
                                            {/* <img src={randomUser} style={{width:'100%', height:'100%'}}/> */}
                                        </div>
                                    </CircularProgressbarWithChildren>
                                        
                                }
                        </ProgressProvider>
                    </div>
                    <div style={{width: 7, height: 7, borderRadius: 10, backgroundColor: 'darkorange', position: 'absolute', top: 130, left: 90}}></div>
                    <div style={{width: 11, height: 11, borderRadius: 10, backgroundColor: 'green', position: 'absolute', top: 160, left: 60}}></div>
                    <div style={{width: 8, height: 8, borderRadius: 10, backgroundColor: 'lightblue', position: 'absolute', top: 210, left: 85}}></div>
                    <div style={{width: 8, height: 8, borderRadius: 10, backgroundColor: 'violet', position: 'absolute', top: 140, right: 85}}></div>
                    <div style={{width: 12, height: 12, borderRadius: 10, backgroundColor: 'orangered', position: 'absolute', top: 170, right: 75}}></div>
                    <div style={{width: 7, height: 7, borderRadius: 10, backgroundColor: 'greenyellow', position: 'absolute', top: 220, right: 95}}></div>
                </div>   
                
                <p className="t3 text-center title">John Doe</p> 
                <p className="t5 text-center sub" style={{marginTop: 10}}>Senior Design Manager</p>   
                
                <div className="horizontal" style={{justifyContent: 'center', marginTop: 15, padding: '0 25px'}}>
                    {/* <div className="profile-option">
						<FiShare2 size={15}/>
						<p className="title t6" style={{fontFamily:'wh-bold',  marginLeft: 10}}>Share</p>
					</div> */}
                    <div className="profile-option">
						<FiEdit3 size={15}/>
						<p className="title t6" style={{fontFamily:'wh-bold',  marginLeft: 10}}>Edit profile</p>
					</div>
                    {/* <div className="profile-option">
						<RiBubbleChartLine size={15}/>
						<p className="title t6" style={{fontFamily:'wh-bold', marginLeft: 10}}>Account</p>
					</div> */}
                </div> 

                <div className="horizontal" style={{margin: '10px 25px', marginTop: 25}}>
                    <p className="t445 title">Upcoming tasks</p>
                    <p className="t5 themeColor clickable">View all</p>
                </div> 

                <UpcomingTaskCard/>
                <UpcomingTaskCard/>
                

                <div className="horizontal" style={{margin: '10px 25px', marginTop: 20}}>
                    <p className="t445 title">Invitations</p>
                    <p className="t5 themeColor clickable">View all</p>
                </div> 

                <UpcomingTaskCard/>
                <UpcomingTaskCard/> 

                <div style={{width: 1, height: 500}}>

                </div>
            </Scrollbars>
            </div>
        </div>
    )
}

export default Home