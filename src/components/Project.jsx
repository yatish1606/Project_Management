import React, { useEffect, useState, useRef, createRef } from 'react'
import { createPortal } from 'react-dom'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import {FiX, FiPlus, FiDelete, FiEdit3, FiTrash2} from 'react-icons/fi'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Link } from 'react-router-dom'
import SwipeableViews from 'react-swipeable-views'
import { withStyles } from '@material-ui/core/styles'
import { Scrollbars } from 'react-custom-scrollbars'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

import userImage from '../assets/user.png'
import userImage3 from '../assets/user3.png'
import userImage4 from '../assets/user4.png'

import '../css/global.css'
import '../css/project.css'
import { AppButton, IconButton } from './Common'
import {ProgressProvider} from './Common'
import { BsChatSquareDots, BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs'
import { IoMdCheckmarkCircleOutline, IoMdOptions } from 'react-icons/io'
import { RiDragMoveLine } from 'react-icons/ri'

function randomHSL(){
    return `hsla(${~~(360 * Math.random())},90%,80%,0.8)`
}

function isElement(element) {
    return element instanceof Element || element instanceof HTMLDocument;  
}

const useDraggableInPortal = () => {
    const self = useRef({}).current

    useEffect(() => {
        const div = document.createElement('div')
        div.style.position = 'absolute'
        div.style.pointerEvents = 'none'
        div.style.top = '0'
        div.style.width = '100%'
        div.style.height = '100%'
        self.elt = div
        document.body.appendChild(div)
        return () => {
            document.body.removeChild(div)
        };
    }, [self]);

    return (render) => (provided, ...args) => {
        const element = render(provided, ...args)
        if (provided.draggableProps.style.position === 'fixed') {
            return createPortal(element, self.elt)
        }
        return element
    }
}




export const AntTabs = withStyles({
	root: {
        height: 40,
        position: 'absolute',
        bottom:0
	},
	indicator: {
	    backgroundColor: '#008EF6',
	    height: 4,
	    borderRadius: 10,
	    marginTop: 0
	},
	overrides: {
		MuiTab: {
		  wrapper: {
			flexDirection:'row',
		  },
		},
	  },
})(Tabs);

export const AntTab = withStyles(() => ({
	wrapper: {
		flexDirection: 'row',
	  },
	root: {
	    textTransform: 'none',
	    color: '#878787',
	    minWidth: 72,
	    fontWeight: 500,
	    marginRight: 15,
	    fontSize:14,
	    paddingRight: 20,
	    paddingLeft: 20,
	    boxShadow: 'none',
	    letterSpacing : 1.3,
	    height: 50,
	    opacity: 1,
	  fontFamily: [
		'wh-sbold'
	  ].join(','),
	    '&:hover': {
		  opacity: 1,
		  fontWeight: 500,
		  fontSize:14,
	  },
	    '&$selected': {
		  color: '#008EF6',
		  fontWeight: 500,
		  fontSize:14,
	  },
	    '&:focus': {
		  color: '#008EF6',
	  },
	},
	selected: {},
}))((props) => <Tab disableRipple {...props} />);


const Project = () => {

    const [openDiscussionPanel, setOpenDiscussionPanel] = useState(false)
    const [index, setIndex] = React.useState(0)
    const renderDraggable = useDraggableInPortal()
    // const [simpleTasks, setSimpleTasks] = useState(Array.apply(null, Array(15)))

    const [simpleTasks, setSimpleTasks] = useState([
        {
            id:0,
        },
        {
            id:1,
        },
        {
            id:2,
        },
        {
            id:3,
        },
        {
            id:4,
        },
        {
            id:5,
        },
        {
            id:6,
        },
        {
            id:7,
        },
        {
            id:8,
        },
    ])

    

	const handleChange = (event,value) => setIndex(value)
    const handleChangeIndex = index => setIndex(index)
    
    const reorder = (list, startIndex, endIndex) => {
        
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
      
        return result;
    }

    const getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: "none",
        padding: 0,
        top: 'auto !important',
        left: 'auto !important',
        ...draggableStyle
    })

    const getListStyle = isDraggingOver => ({width: '100%'})

    const onDragEnd = result => {
       
        if (!result.destination) {
          return;
        }
    
        const items = reorder(
          simpleTasks,
          result.source.index,
          result.destination.index
        )
       
        setSimpleTasks(items)
        
    }

    
    const RenderSimpleTasks = () => {

        const [isHovering, setIsHovering] = useState(Array.apply(false, Array(simpleTasks.length)))
        const refs = useRef([])
        return simpleTasks.slice(0,3).map((task, index) => {

            const getPortal = element => {
                if(isElement(element)) {
                    createPortal('hi', refs.current[index])
                }
            }
            return (

                
                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                {renderDraggable((provided, snapshot) => (
                    <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                    )}
                    >
                        <div 
                            className="tasks-div-simple-item" 
                            onMouseOver={() => {
                                let arr = [...isHovering]
                                arr[index] = true
                                setIsHovering(arr)
                            }}
                            onMouseLeave={() => {
                                let arr = [...isHovering]
                                arr[index] = false
                                setIsHovering(arr)
                            }}
                            ref={r => refs.current[index] = r}
                        >
                            
                            <div className="tasks-div-simple-item-label" style={{backgroundColor:randomHSL()}}><RiDragMoveLine size={20} className="lg"/></div>
                        
                            <div className="tasks-div-simple-item-people">
                                <div className="students-box" style={{marginBottom:0, paddingBottom:0, marginTop:0, width:'auto'}}>
                                    <div className="students-box-circle" style={{marginLeft: 0, background: '#09a407'}}><img src={userImage}/></div>
                                    <div className="students-box-circle" style={{marginLeft: 17,  background: '#0F98D9', transform: 'scale(1.02)'}}><img src={userImage3}/></div>
                                    <div className="students-box-circle" style={{marginLeft: 34,  background: '#545454', transform: 'scale(1.05)'}}><img src={userImage4}/></div>
                                    <div className="students-box-circle" style={{marginLeft: 51, transform: 'scale(1.05)'}}>3</div>
                                </div>
                            </div>
    


                            <div className="tasks-div-simple-item-title">
                                <RenderPriority small/>
                                <p className="t45 title" style={{fontSize: 15, marginTop: 5, letterSpacing: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', textOverflow:'ellipsis'}}>Complete website UI <div className="dot"></div><span className="t6 sub" style={{textOverflow:'ellipsis'}}>created 13/1 by John Doe</span></p>
                            </div>
                            
                            <div className="tasks-div-simple-item-due">
                                Due 26th Jan
                            </div>
                            
                            <div className="tasks-div-simple-item-mark" style={{display : isHovering[index] ? 'flex' : 'none'}}>
                                <FiEdit3 size={17} title="edit"/>
                            </div>
                            <div className="tasks-div-simple-item-mark" style={{display : isHovering[index] ? 'flex' : 'none'}}>
                                <FiTrash2 size={17} title="delete"/>
                            </div>
                            <div className="tasks-div-simple-item-mark">
                                <IoMdCheckmarkCircleOutline size={19} title="mark for review"/>
                            </div>
                            <div className="tasks-div-simple-item-mark">
                                <BsThreeDotsVertical size={19} title=""/>
                            </div>
                            
                           {getPortal()}
                        </div>
                    </div>
                ))}
                </Draggable>
            )
        })
    }

    const RenderPriority = ({priority, small}) => {
        return (
            <div className={small ? "project-priority-small" : "project-priority"} style={{backgroundColor: '#04C6022a'}}>
                <p className="t6" style={{fontFamily:'wh-sbold', letterSpacing: 1.8, color:  '#04C602', fontSize: small ? 9 : 11}}>LOW</p>
            </div>
        )
    }
    


    return (
        <React.Fragment>
            <div className="main-container">
                
                <div className="project-top-block">
                    <p className="t5 sub" style={{marginTop:10, fontFamily:'wh-med'}}>
                        Projects  >  Project Management
                    </p>
                    <div className="project-top-block-main">
                        <div className="horizontal">
                            <div className="project-pie">
                                <ProgressProvider valueStart={0} valueEnd={80}>
                                {value => 
                                    <CircularProgressbarWithChildren 
                                        value={value} 
                                        circleRatio={0.7} 
                                        styles={buildStyles({
                                            rotation: 0.5 + (1 - 70 / 100) / 2,
                                            pathTransitionDuration: 1.5,
                                            textColor: "#151515",
                                            pathColor: "#008EF6",
                                            trailColor: "#ababab2a",
                                            
                                        })}
                                        strokeWidth={6}
                                    >
                                        
                                        <p className="t3 title">{value}%</p>
                                        <p className="t6 sub" style={{marginBottom:10}}>progress</p>
                                        
                                    </CircularProgressbarWithChildren>
                                        
                                }
                                </ProgressProvider>
                            </div>
                            <div className="project-title-block">
                                <p className="t2 title">Project Management</p>
                                <div className="horizontal" style={{marginTop: 10, justifyContent: 'flex-start'}}>
                                    <RenderPriority/>
                                    <p className="t5 sub"style={{marginLeft: 10}}>Due in 4 days</p>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            
                            <div className="horizontal" style={{marginBottom: 20, justifyContent: 'flex-end'}}>
                                <div className="students-box" style={{marginBottom:0, paddingBottom:0, marginTop:0, width:'auto'}}>
                                    <div className="students-box-circle" style={{marginLeft: 0, background: '#09a407'}}><img src={userImage}/></div>
                                    <div className="students-box-circle" style={{marginLeft: 17,  background: '#0F98D9', transform: 'scale(1.02)'}}><img src={userImage3}/></div>
                                    <div className="students-box-circle" style={{marginLeft: 34,  background: '#545454', transform: 'scale(1.05)'}}><img src={userImage4}/></div>
                                    <p className="t55 title" style={{marginLeft: 70, letterSpacing:0.3, marginTop: 8}}>3 members</p>
                                </div>
                                <AppButton
                                    title="Invite more"
                                    style={{height: 25, marginLeft: 10}}
                                />
                            </div>

                            <div className="horizontal" style={{justifyContent:'flex-end'}}>
                                <div className="project-discussion-button" onClick={() => setOpenDiscussionPanel(!openDiscussionPanel)}>
                                    <BsChatSquareDots size={17} className="sub" style={{marginRight: 10}}/>
                                    <p className="t5 sub">Project Discussion</p>
                                </div>
                                <div className="project-discussion-button" onClick={() => setOpenDiscussionPanel(!openDiscussionPanel)}>
                                    <BsThreeDots size={17} className="sub" style={{marginRight: 10}}/>
                                    <p className="t5 sub">More Options</p>
                                </div>

                            </div>
                        </div>

                    </div>
                    <AntTabs value={index} fullWidth onChange={handleChange} variant="scrollable">
                        <AntTab label={<div> TASKS   </div>} />
                        <AntTab label={<div> ISSUES   </div>} />
                        <AntTab label={<div> MORE   </div>} />
                    </AntTabs>
                </div>
                <div className="project-main">
                    <Scrollbars 
                        style={{width : '100%', height: window.innerHeight}}
                        autoHide
                        autoHideDuration={1000}
                        autoHideTimeout={800}
                        renderThumbVertical={({ style, ...props }) =>
                        <div {...props} className="backgroundPrimary" style={{ ...style, opacity: 0.4 ,borderRadius: 10 , width: 8, paddingRight: 20, marginRight: 20}}/>
                        }
                        
                    >
                    <div className="project-main-content">
                        
                        <SwipeableViews index={index} onChangeIndex={handleChangeIndex} style={{overflow:'hidden'}}>
                            
                            <div className="project-main-content-inner">
                                
                                <div className="tasks-div-simple">
                                    
                                    <div className="horizontal" style={{justifyContent: 'space-between', width:'100%', margin:'0 0 15px 0'}}>
                                        <p className="t45 title horizontal" style={{fontSize: 17, letterSpacing: 1,}}>Ongoing tasks <span className="dot"></span><span className="t6 sub" style={{paddingTop: 4}}>4 tasks</span></p>
                                        <div className="horizontal">
                                            <AppButton  
                                                title="New Task" 
                                                style={{height: 30}}
                                                hasIcon 
                                                icon={<FiPlus 
                                                size={18}/>}
                                            />
                                            <AppButton  
                                            title="" 
                                            style={{height: 30, backgroundColor:'transparent', marginLeft: 10, marginRight: 0}}
                                            hasIcon 
                                            icon={<IoMdOptions 
                                            size={18} className="sub"/>}
                                            />
                                          
                                        </div>
                                    </div>

                                    <div style={{}}>

                                    </div>
                                    
                                    <DragDropContext onDragEnd={onDragEnd} style={{overflow:'hidden'}}>
                                        
                                        <Droppable droppableId="droppable" style={{overflow:'hidden'}}>
                                        
                                        {(provided, snapshot) => (
                                            
                                            <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            style={getListStyle(snapshot.isDraggingOver)}
                                            >

                                            <RenderSimpleTasks/>
                                            
                                            {provided.placeholder}
                                            </div>
                                        )}
                                        </Droppable>
                                    
                                    </DragDropContext>
                                    <p 
                                        className="t5 themeColor"
                                        style={{textAlign: 'right', width:'100%', paddingRight: 10, boxSizing:'border-box', cursor:'pointer'}}
                                    >
                                        + {simpleTasks.length - 3} tasks. View all
                                    </p>
                                </div>

                                <div className="horizontal" style={{justifyContent: 'space-between', width:'100%', margin:'0 0 15px 0'}}>
                                        <p className="t45 title" style={{fontSize: 17, letterSpacing: 1}}>Completed tasks</p>
                                        
                                </div>
                            
                            </div>
                            
                            
                            <div className="project-main-content-inner">
fgdfg
                            </div>
                            
                            
                            <div className="project-main-content-inner">
dghgh
                            </div>
                        
                        
                        </SwipeableViews>
                    </div>               
                    
                    </Scrollbars>
                    
                    {/* Discussion panel */}
                    
                    <div className={openDiscussionPanel ? "project-discussion-block" : "project-discussion-block isClosed"}>
                        <div className="horizontal borderColormg" style={{padding: '10px 15px', borderBottom: '2px solid', borderTop: '2px solid', height: 50}}>
                            <div style={{display: openDiscussionPanel ? 'block' : 'none'}}>
                                <p className="t4 title">Project Discussion</p>
                                <p className="t6 themeColor" style={{marginTop: 5}}>Abigail Spencer, John Doe and 3 more</p>
                            </div>
                            <IconButton icon={<FiX size={20} className="sub"/>} onClick={() => setOpenDiscussionPanel(false)} style={{display: openDiscussionPanel ? 'flex' : 'none'}}/>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </React.Fragment>
    )
}

export default Project


