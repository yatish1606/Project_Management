import React , {useEffect} from "react"
import '../css/home.css'
import { FiChevronDown, FiCodesandbox } from 'react-icons/fi'
import float1 from '../assets/float1.svg'
import float2 from '../assets/float2.svg'
import float3 from '../assets/float3.svg'
import float4 from '../assets/float4.svg'
import float5 from '../assets/float5.svg'
import s1 from '../assets/s1.svg'
import s3 from '../assets/s3.svg'
import s4 from '../assets/s4.svg'
import { BsFillGrid1X2Fill, BsKanbanFill, BsNewspaper, BsPeopleFill } from 'react-icons/bs'
import CurvedArrow from "react-curved-arrow"
import { Link } from "react-router-dom"

const Home = () => {
    
    const goToWhy = () => {
       window.scroll({
           top:window.innerHeight,
           left:0,
           behavior:'smooth'
       })
    }

    useEffect(() => {
        
        var steps = document.querySelectorAll('.step-div')
        
        if(steps.length === 4) {
            var i = 0;
            let duration = i === 0 ? 1300 : 500
            setInterval(function () {
                steps.forEach(step => step.classList.remove('splash'))
                steps[i].classList.add('splash')
                i++
                if(i == steps.length) i = 0
            }, duration)
        }

    }, [])

    return (
            <div className="home-container">
                
                <div className="home-container-upper">
                    
                    <div className="header">
                        <div className='header-left'>
                            <div className="app-logo">
                                <FiCodesandbox size={35} className="themeColor"/>
                                <p className="t3 lg" style={{marginLeft: 15, letterSpacing: 1, paddingBottom: 8}}>pro<span style={{color:'#ED4B01', fontFamily:'gs-bold', margin:'auto 3px', fontSize: 29, marginTop: -5}}>:</span><span className="themeColor">manage</span></p>
                            </div>
                        </div>
                        <div className='header-right'>
                            <Link to="/dashboard">
                            <div className="login-button">
                                <p className="t445 title" style={{letterSpacing: 0.6}}>Login</p>
                            </div>
                            </Link>
                        </div>
                    </div>
                    
                    <div className="home-main">
                        <p className="t00 lg" style={{width:'80%'}}>Efficiently manage your projects and people</p>
                        <p className="t4 dg" style={{marginTop: 30, fontFamily:'wh-sbold', letterSpacing: 0.9}}>With pro:manage, manage your daily projects with ease</p>
                    
                        <div className="horizontal" style={{justifyContent: "flex-start", marginTop: 30}}>
                            <div className="get-started-button">
                                <p className="t4 title" style={{letterSpacing: 0.2}}>Get started</p>
                            </div>
                            <div className="learn-more-button">
                                <p className="t445" onClick={goToWhy}>Learn more</p>
                            </div>
                        </div>
                    </div>

                    <div className='down-arrow' onClick={goToWhy}><FiChevronDown size={26} className="themeColor"/></div>
 
                </div>

                <div className="floating-div">
                    <div className='float1'>
                        <img src={float1}/>
                    </div>
                    <div className='float2'>
                        <img src={float2}/>
                    </div>
                    <div className='float3'>
                        <img src={float3}/>
                    </div>
                    <div className='float4'>
                        <img src={float4} style={{marginTop: 11}}/>
                    </div>
                    <div className='float5'>
                        <img src={float5}/>
                    </div>
                </div>

                
                <div className="home-container-lower">

                    <p className="t2 lg text-center">How does <span className="t2 lg" style={{marginLeft: 0, letterSpacing: 1, paddingBottom: 8,}}>pro<span style={{color:'#ED4B01', fontFamily:'gs-bold', margin:'auto 3px', fontSize: 29, marginTop: -5}}>:</span><span className="themeColor">manage</span></span>work ?</p>
                    
                    
                    <div className="horizontal" style={{padding:'10px 15%', boxSizing:'border-box', marginTop: 100, alignItems: 'flex-start'}}>
                            <div className="step-div">
                                <div className="step-div-image2 f1">
                                    <BsNewspaper size={40}/>
                                </div>
                                <p className="t4 sub text-center" style={{color:'inherit', marginTop: 15, fontSize: 17}}>Create projects</p>
                            </div>
                            <div className="step-div">
                                <div className="step-div-image2 f2">
                                    <BsPeopleFill size={40}/>
                                </div>
                                <p className="t4 sub text-center" style={{color:'inherit', marginTop: 15, fontSize: 17}}>Invite and add people</p>
                            </div>
                            <div className="step-div">
                                <div className="step-div-image2 f3">
                                    <BsFillGrid1X2Fill size={35}/>
                                </div>
                                <p className="t4 sub text-center" style={{color:'inherit', marginTop: 15, fontSize: 17}}>Manage workflows</p>
                            </div>
                            <div className="step-div">
                                <div className="step-div-image2 f4">
                                    <BsKanbanFill size={37}/>
                                </div>
                                <p className="t4 sub text-center" style={{color:'inherit', marginTop: 15, fontSize: 17}}>Assign tasks</p>
                            </div>
                            
                            <CurvedArrow
                                fromSelector=".f1"
                                toSelector=".f2"
                                middleY={30}
                                toOffsetX={-60}
                                fromOffsetX={60}
                                width={2}
                                color="#313131"
                                className="arrow"
                            />

                            <CurvedArrow
                                fromSelector=".f2"
                                toSelector=".f3"
                                middleY={-30}
                                toOffsetX={-60}
                                fromOffsetX={60}
                                width={2}
                                color="#313131"
                                className="arrow"
                            />

                            <CurvedArrow
                                fromSelector=".f3"
                                toSelector=".f4"
                                middleY={30}
                                toOffsetX={-60}
                                fromOffsetX={60}
                                width={2}
                                color="#313131"
                                className="arrow"
                            />
                        </div>
                </div>


                <div className="copilot">
                    
                
                    <img src={s1} id="s1" style={{width:'50%', borderRadius: 20, left: -60, position:'absolute'}}/>
                    <p className="t1" style={{color:'#eee',left: '50%', position:'absolute', width:'40%', top: 50, fontSize: 35}}>Easily create projects from templates</p>
                    <p className="t1 themeColor" style={{left: '50%', position:'absolute', width:'40%', top: 150, fontSize: 30}}>it's that easy!</p>
                
                    <img src={float4} id="s2" style={{width:'30%', borderRadius: 20, right: -60, position:'absolute', top: 450}}/>
                    <p className="t1" style={{color:'#eee',right: '30%', position:'absolute', width:'40%', top: 570, fontSize: 35, textAlign:'right'}}>Set up project timelines</p>
                    <p className="t1 themeColor" style={{right: '30%', position:'absolute', width:'40%', top: 630, fontSize: 30, textAlign:'right'}}>set due dates and milestones</p>
                
                    <img src={s3} id="s3" style={{width:'20%', borderRadius: 20, left: -30, position:'absolute', top: 580}}/>
                    <p className="t1" style={{color:'#eee',left: '20%', position:'absolute', width:'40%', top: 900, fontSize: 35}}>Add project members</p>
                    <p className="t1 themeColor" style={{left: '20%', position:'absolute', width:'40%', top: 960, fontSize: 30}}>invite people to contribute</p>
                
                    <img src={s4} id="s4" style={{width:'80%', borderRadius: 20, right: -60, position:'absolute', top: 1200}}/>
                    <p className="t1" style={{color:'#eee',right: '80%', position:'absolute', width:'20%', top: 1250, fontSize: 35, textAlign:'right'}}>Create and manage tasks</p>
                    <p className="t1 themeColor" style={{right: '80%', position:'absolute', width:'20%', top: 1350, fontSize: 30, textAlign:'right'}}>assign people onto tasks</p>
                
                    <img src={float5} id="s5" style={{width:'40%', borderRadius: 20, left: -30, position:'absolute', top: 1550}}/>
                    <p className="t1" style={{color:'#eee',left: '40%', position:'absolute', width:'40%', top: 1700, fontSize: 35}}>Get project statistics</p>
                    <p className="t1 themeColor" style={{left: '40%', position:'absolute', width:'40%', top: 1760, fontSize: 30}}>bar graphs, line charts, you name it</p>
                
                </div>

                <p className="t4 text-center" style={{marginTop: 50, color:'#eee', marginBottom: 0}}>Designed and developed by Yatish Kelkar</p>
                <p className="t5 text-center" style={{marginTop: 20, color:'#878787', marginBottom: 100}}>
                    <a href="mailto:yatish1606@gmail.com" style={{color:'#878787'}}>
                    yatish1606@gmail.com
                    </a>
                </p>


            </div>
        
    )
}

export default Home