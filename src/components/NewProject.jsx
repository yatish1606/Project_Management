import React, { useEffect, useState } from 'react'
import {HiOutlineArrowNarrowLeft} from 'react-icons/hi'
import { AppButton, CustomInput, IconButton } from './Common'
import '../css/newproject.css'
import randomUser from '../assets/user.png'
import { RiCheckboxBlankCircleLine } from 'react-icons/ri'
import {IoIosCheckmarkCircle} from 'react-icons/io'
import { FiPlus, FiX, FiEdit3 } from 'react-icons/fi'
import OutsideClickHandler from 'react-outside-click-handler'
import { Scrollbars } from 'react-custom-scrollbars'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {CgCalendarDates} from 'react-icons/cg'
import { BsFillGrid1X2Fill, BsKanbanFill, BsNewspaper, BsPeopleFill } from 'react-icons/bs'
import Arrow, { DIRECTION } from 'react-arrows'
import simple from '../assets/simple.svg'
import timeline from '../assets/timeline.svg'
import agile from '../assets/agile.svg'
import { smallModal } from './modalStyles'
import Modal from 'react-modal'
import gear from '../assets/gear.png'
import axios from 'axios'
import { APIURL } from './api'
import { useUser } from './UserProvider'


const usersData = [
    {
        id:1,
        fname:'John',
        lname:'Doe',
        photo:randomUser,
        designation:'Senior Manager'
    },
    {
        id:2,
        fname:'Jane',
        lname:'Doe',
        photo:randomUser,
        designation:'Designer'
    },
    {
        id:3,
        fname:'Lisa',
        lname:'Donovan',
        photo:randomUser,
        designation:'Junior Engineer'
    },
    {
        id:4,
        fname:'Karen',
        lname:'Proctor',
        photo:randomUser,
        designation:'Human Resources'
    },
    {
        id:5,
        fname:'Alan',
        lname:'McCarthy',
        photo:randomUser,
        designation:'Programmer'
    },
    {
        id:6,
        fname:'Garrett',
        lname:'Walker',
        photo:randomUser,
        designation:'VP'
    },
    {
        id:7,
        fname:'Ray',
        lname:'Mitchell',
        photo:randomUser,
        designation:'Programmer'
    },
    {
        id:8,
        fname:'Elizabeth',
        lname:'Birdsworth',
        photo:randomUser,
        designation:'Human Resources'
    },
]

const UserCard = ({id, fname, lname, photo, designation, addUser, people, cannotEdit, deleteUser}) => {
    let isPresent = false
    
    people.forEach(mem => {
        if(mem.id === id)
            isPresent = true
            return 
    })

    return (
        <div className="horizontal" style={{padding:'5px 0'}}>
            <div className="horizontal" style={{justifyContent: 'flex-start'}}>
                <div className="backgroundmg" style={{width: 30, height:30, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow:'hidden'}}>
                    <img src={photo} width={30} height={30}/>
                </div>
                <div style={{marginLeft: 10}}>
                    <p className="t45 title">{fname.concat(' ').concat(lname)}</p>
                    <p className="t55 sub">{designation}</p>
                </div>
            </div>
            <div style={{width: 30, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {cannotEdit ? 
                <FiX className="hovercolor sub" style={{cursor:'pointer'}} size={20} onClick={deleteUser}/>
                : isPresent ?
                <IoIosCheckmarkCircle className="themeColor" size={24}/> 
                :
                <FiPlus className="hovercolor sub" style={{cursor:'pointer'}} size={20} onClick={() => {
                    addUser()
                    isPresent = true
                }}/>
                }
            </div>
        </div>
    )
}

const NewProject = ({history}) => {

    const {user, setUser} = useUser()

    const [activeIndex, setActiveIndex] = useState(0)
    const [isFocused, setIsFocused] = useState(false)
    const [isSearchDivOpen, setIsSearchDivOpen] = useState(false)
    const [modalIsOpen, setModal] = useState(false)

    const openModal = () => {
        setModal(true)
        setTimeout(() => {
            // window.location.href = '/dashboard'
            // closeModal()
        }, 5000)
    }
    const closeModal = () => setModal(false)

    const [nameOfProject, setNameOfProject] = useState('')
    const [projectMembers, setProjectMembers] = useState([])
    const [projectMemberSearch, setProjectMemberSearch] = useState('')
    const [projectMemberSearchResult, setProjectMemberSearchResult] = useState([])
    const [hasPrivacy, setHasPrivacy] = useState(true)
    const [hasMultipleManagers, setHasMultipleManagers] = useState(false)
    const [templateType, setTemplateType] = useState('simple')
    const [isProjectPrivate, setIsProjectPrivate] = useState(false)
    const [dueDate, setDueDate] = useState(new Date())
    const [invitationMessage, setInvitationMessage] = useState('')
    const [projectPriority , setProjectPriority] = useState('low')
    
    const onChangeProjectName = t => setNameOfProject(t.target.value)
    
    const onChangeProjectMemberSearch = t => {
        
        setIsSearchDivOpen(t.target.value.length)
        
        let names = t.target.value.split(' ')
        
        names.forEach(name => name.charAt(0).toUpperCase())
        setProjectMemberSearch(names.toString())
        
        let arr = usersData.filter(user => user.fname.includes(projectMemberSearch) || user.lname.includes(projectMemberSearch) || projectMemberSearch.includes(user.fname) || projectMemberSearch.includes(user.lname))
        
        setProjectMemberSearchResult(arr)
    }

    const goToSlide = slide => {
        
        let i = slide - 1
        while(i >= 0) {
            if(!canProceed[i]) return 
            i--
        }
        setActiveIndex(slide)
    }

    const handleNextSlide = () => {
        if(activeIndex === 4) {
            openModal()
            createProject()
            return
        }
        setActiveIndex(activeIndex + 1)
    }

    const handlePreviousSlide = () => {
        setActiveIndex(activeIndex - 1)
    }

    const createProject = () => {
        
        let projectObject = {
            nameOfProject,
            projectMembers : [user, ...projectMembers],
            hasPrivacy,
            managers : [],
            templateType,
            isPrivate : isProjectPrivate,
            dueDate : dueDate.getTime(),
            invitationMessage,
            projectPriority
        }

        axios.post(`${APIURL}/projects`, projectObject)
        .then(res => {
            console.log(res.data)
        })
    }


    const canProceed = [
        nameOfProject != '',
        true,
        projectMembers.length != 0 ,
        true,
    ]

    useEffect(() => {

        console.log(user)
        
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

        var arrows = document.querySelectorAll('.arrow')
        
        if(arrows.length === 3) {
            var j = 0;
            setInterval(function () {
                arrows.forEach(step => {
                    let childs = step.children 
                    childs[0].style.stroke = '#d3d3d3'
                })
                arrows[j].style.stroke = '#008EF6'
                j++
                if(j == arrows.length) j = 0
            }, 2000) 
        }
    }, [])
   

    return (
        <div className='main-container'>
            <IconButton
                icon={<HiOutlineArrowNarrowLeft size={30} className="title"/>}
                style={{position: 'absolute', top: 30, left: 120}}
                onClick={() => history.goBack()}
            />
            <p className="t3 title" style={{position: 'absolute', top: 30, left: 190}}>Create New Project</p>


            <div style={{position: 'absolute', bottom: 50, right: 50, zIndex: 200, display: 'flex', flexDirection:'row-reverse', alignItems: 'center'}}>
                <AppButton
                    title= {activeIndex === 4 ? 'Create' : 'Continue'}
                    style={{}}
                    onClick={canProceed[activeIndex] ? handleNextSlide : activeIndex === 4 ? handleNextSlide : null}
                    
                />
                <AppButton
                    title="back"
                    style={{display: activeIndex === 0 ? 'none' :'flex', marginRight: 10}}
                    onClick={handlePreviousSlide}
                    secondary
                    disabled={activeIndex === 0}
                />
            </div>
            
            
            <div className="swiper-container-custom" style={{transition:'0s ease'}}>
                
            {activeIndex === 0 ? 
                    
                    <div className="swiper-slide">
                       
                        <div style={{width:'60%',margin:'40px auto 10px auto'}}>
                            <p className="t1 title text-center" style={{fontFamily:'wh-bold'}}>Effortlessly create a brand new project</p>
                            {/* <p className="t4 themeColor text-center" style={{marginTop:50, fontFamily:'wh-sbold', letterSpacing: 0.2}}>Add people you work with, create and assign tasks to them, monitor performances and project milestones in a jiffy!</p> */}
                            <p className="t4 sub text-center" style={{marginTop:15,fontFamily:'wh-sbold', letterSpacing: 0.2}}>Discuss project information and scale up your project</p>
                        </div>

                        <div className="horizontal" style={{padding:'10px 15%', boxSizing:'border-box', marginTop: 50, alignItems: 'flex-start'}}>
                            <div className="step-div">
                                <div className="step-div-image f1">
                                    <BsNewspaper size={40}/>
                                </div>
                                <p className="t4 sub text-center" style={{color:'inherit', marginTop: 15, fontSize: 17}}>Create projects</p>
                            </div>
                            <div className="step-div">
                                <div className="step-div-image f2">
                                    <BsPeopleFill size={40}/>
                                </div>
                                <p className="t4 sub text-center" style={{color:'inherit', marginTop: 15, fontSize: 17}}>Invite and add people</p>
                            </div>
                            <div className="step-div">
                                <div className="step-div-image f3">
                                    <BsFillGrid1X2Fill size={35}/>
                                </div>
                                <p className="t4 sub text-center" style={{color:'inherit', marginTop: 15, fontSize: 17}}>Manage workflows</p>
                            </div>
                            <div className="step-div">
                                <div className="step-div-image f4">
                                    <BsKanbanFill size={37}/>
                                </div>
                                <p className="t4 sub text-center" style={{color:'inherit', marginTop: 15, fontSize: 17}}>Assign tasks</p>
                            </div>
                            
                            <Arrow
                                className='arrow'
                                head={{
                                    size: 8
                                }}
                                from={{
                                    direction: DIRECTION.RIGHT,
                                    node: () => document.querySelector('.f1'),
                                    translation: [0.5, -2.5],
                                }}
                                to={{
                                    direction: DIRECTION.LEFT,
                                    node: () => document.querySelector('.f2'),
                                    translation: [-0.5, 1.3],
                                }}
                                
                            />

                            <Arrow
                                className='arrow'
                                head={{
                                    size: 8
                                }}
                                from={{
                                    direction: DIRECTION.RIGHT,
                                    node: () => document.querySelector('.f2'),
                                    translation: [0.5, 1.8],
                                }}
                                to={{
                                    direction: DIRECTION.LEFT,
                                    node: () => document.querySelector('.f3'),
                                    translation: [-0.5, -2.5],
                                }}
                                
                            />

                            <Arrow
                                className='arrow'
                                head={{
                                    size: 8
                                }}
                                from={{
                                    direction: DIRECTION.RIGHT,
                                    node: () => document.querySelector('.f3'),
                                    translation: [0.5, 0],
                                }}
                                to={{
                                    direction: DIRECTION.LEFT,
                                    node: () => document.querySelector('.f4'),
                                    translation: [-0.3, -2.5],
                                }}
                                
                            />
                        </div>


                        <div className="t3 title text-center" style={{marginTop: 50}}>
                            Let's start with a name for your project
                        </div>
                        
                        <div style={{width:'50%', height:40, display: 'flex', flexDirection: 'row', justifyContent: 'center', transform: 'translateX(50%)'}}>
                            <input
                                placeholder='Name of project'
                                onChange={onChangeProjectName}
                                value={nameOfProject}
                                style={{marginTop: 40}}
                            />
                        </div>
                    </div>
                    
                    // ========================================================================

            : activeIndex === 1 ? 

                    <div className="swiper-slide">
                        <p className="t4 title text-center" style={{marginTop: 30}}>Select a template for your project</p>
                    
                        <div className="horizontal" style={{marginTop: 30, boxSizing:'border-box', padding:'20px 5%'}}>
                            
                            <div className={templateType === 'simple' ? 'backgroundThemeColor' : ''} style={{height:250, boxSizing:'border-box', width:'27%' ,padding:0, border: '2.5px solid', borderColor : templateType ==='simple' ? '#008EF6' : '#eee', borderRadius: 10, overflow:'hidden', display: 'flex', flexDirection: 'column', cursor:'pointer'}} onClick={() => setTemplateType('simple')}>
                                
                                <div className="backgroundmg" style={{width:'100%', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <img src={simple} style={{objectFit:'cover', width: '100%', height: '100%'}}/>
                                </div>
                                <div className="horizontal" style={{justifyContent: 'flex-start', padding:'11px 20px'}}>
                                    {templateType ==='simple' ? 
                                        <IoIosCheckmarkCircle size={24} className="lg" style={{cursor:'pointer'}}/>
                                        :
                                        <RiCheckboxBlankCircleLine size={24} className="dg" style={{cursor:'pointer'}} onClick={() => setTemplateType('simple')}/>
                                    }
                                    <p className={templateType ==='simple' ? "t45 lg" : 't45 title'} style={{fontFamily:'wh-bold', marginLeft: 10, marginBottom:3}}>simple view</p>
                                </div>
                
                            </div>

                            <div className={templateType === 'agile' ? 'backgroundThemeColor' : ''} style={{height:250, boxSizing:'border-box', width:'27%' ,padding:0, border: '2.5px solid', borderColor : templateType === 'agile' ? '#008EF6' : '#eee', borderRadius: 10, overflow:'hidden', display: 'flex', flexDirection: 'column', cursor:'pointer'}} onClick={() => setTemplateType('agile')}>
                                
                                <div className="backgroundmg" style={{width:'100%', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <img src={agile} style={{objectFit:'cover', width: '100%', height: '100%'}}/>
                                </div>
                                <div className="horizontal" style={{justifyContent: 'flex-start', padding:'11px 20px'}}>
                                    {templateType ==='agile' ? 
                                        <IoIosCheckmarkCircle size={24} className="lg" style={{cursor:'pointer'}}/>
                                        :
                                        <RiCheckboxBlankCircleLine size={24} className="dg" style={{cursor:'pointer'}} onClick={() => setTemplateType('agile')}/>
                                    }
                                    <p className={templateType ==='agile' ? "t45 lg" : 't45 title'} style={{fontFamily:'wh-bold', marginLeft: 10, marginBottom:3}}>agile view</p>
                                </div>
                
                            </div>

                            <div className={templateType === 'timeline' ? 'backgroundThemeColor' : ''} style={{height:250, boxSizing:'border-box', width:'27%' ,padding:0, border: '2.5px solid', borderColor : templateType === 'timeline' ? '#008EF6' : '#eee', borderRadius: 10, overflow:'hidden', display: 'flex', flexDirection: 'column', cursor:'pointer'}} onClick={() => setTemplateType('timeline')}>
                                
                                <div className="backgroundmg" style={{width:'100%', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <img src={timeline} style={{objectFit:'cover', width: '100%', height: '100%'}}/>
                                </div>
                                <div className="horizontal" style={{justifyContent: 'flex-start', padding:'11px 20px', }}>
                                    {templateType ==='timeline' ? 
                                        <IoIosCheckmarkCircle size={24} className="lg" style={{cursor:'pointer'}}/>
                                        :
                                        <RiCheckboxBlankCircleLine size={24} className="dg" style={{cursor:'pointer'}} onClick={() => setTemplateType('timeline')}/>
                                    }
                                    <p className={templateType ==='timeline' ? "t45 lg" : 't45 title'} style={{fontFamily:'wh-bold', marginLeft: 10, marginBottom:3}}>timeline view</p>
                                </div>
                
                            </div>

                        </div>

                        <p className="t3 title text-center" style={{marginTop: 30}}>{templateType} view</p>
                        <p className="t45 sub text-center" style={{marginTop: 20}}>
                            {templateType === 'simple' ? 'The most simple type of project with lesser tasks and duration, and faster speed of work'
                            :templateType === 'agile' ? 'Suitable for projects requiring fast development. Project is broken down into modules'
                            :'A more complicated project involving timelines, multiple tasks running parallely and longer duration'    
                        }
                        </p>

                    </div>

                    // =============================================================================
            : activeIndex === 2 ? 

                    <div className="swiper-slide">
                        <div className="horizontal" style={{alignItems: 'flex-start'}}>
                        
                            <div style={{width:'48%', height:'100%', marginRight: 20}}>
                                <p className="t4 title" style={{marginTop: 30}}>Add people to your project</p>
                                <p className="t5 sub" style={{marginTop: 25}}>Type in the names of the people who shall be involved with the project. These people will be sent an invitation to join the project workspace</p>
                                <p className="t5 sub" style={{marginTop: 5}}>You can always invite more people later.</p>
                                <p className="t5 sub" style={{marginTop: 5}}></p>
                                
                                <OutsideClickHandler onOutsideClick={() => {
                                    
                                    setIsSearchDivOpen(false)
                                }}>
                                <input
                                    placeholder='Search by name...'
                                    onChange={onChangeProjectMemberSearch}
                                    value={projectMemberSearch}
                                    style={{marginTop: 25}}
                                    onFocus={() => {
                                        
                                        setIsFocused(true)
                                        
                                    }}
                                    onBlur={() => {
                                        setProjectMemberSearch('')
                                    }}
                                />
                                
                                
                                <div className="background" style={{width:'48%', height: 300, marginTop: 20, overflowY: 'hidden', overflowX:'hidden', position: 'absolute', top: 230, left: 10, borderRadius: 5, boxShadow:'2px 2px 15px #8787872a', padding:'15px 20px', boxSizing:'border-box', display: isSearchDivOpen ? 'block' : 'none', zIndex: 100}}>
                                    <Scrollbars 
                                        style={{width : '100%', height: '100%'}}
                                        autoHide
                                        autoHideDuration={1000}
                                        autoHideTimeout={800}
                                        renderThumbVertical={({ style, ...props }) =>
                                        <div {...props} className="backgroundPrimary" style={{ ...style, opacity: 0.4 ,borderRadius: 10 , width: 5, paddingRight: 2, marginRight: 2, zIndex: 300, position: 'absolute', right: -5}}/>
                                        }
                                        
                                    >
                                        {projectMemberSearchResult.map(user => {
                                            return <UserCard id={user.id} fname={user.fname} lname={user.lname} designation={user.designation} photo={user.photo} addUser={() => {
                                                let arr = [...projectMembers]
                                                arr.push(user)
                                                setProjectMembers(arr)
                                            }} people={projectMembers}/>
                                        })}
                                    </Scrollbars>    
                                    
                                </div>
                                </OutsideClickHandler>
                                
                                <p className="t4 title" style={{marginTop: 30}}>Current Project Members ({projectMembers.length})</p>
                                <div style={{width:'100%', marginTop: 30, height: 300}}>
                                    <Scrollbars 
                                        style={{width : '100%', height: 300}}
                                        autoHide
                                        autoHideDuration={1000}
                                        autoHideTimeout={800}
                                        renderThumbVertical={({ style, ...props }) =>
                                        <div {...props} className="backgroundPrimary" style={{ ...style, opacity: 0.4 ,borderRadius: 10 , width: 5, paddingRight: 2, marginRight: 2, zIndex: 300, position: 'absolute', right: -5}}/>
                                        }  
                                    >
                                    {
                                        projectMembers.map(user => {
                                            return <UserCard id={user.id} fname={user.fname} lname={user.lname} designation={user.designation} photo={user.photo} people={projectMembers} cannotEdit deleteUser={() => {
                                                let arr = [...projectMembers]
                                                let newArr = arr.filter(mem => mem.id !== user.id)
                                                setProjectMembers(newArr)
                                            }}/>
                                        })
                                    }
                                    </Scrollbars>
                                </div>
                                
                            </div>
                            <div style={{width:'48%', height:'100%'}}>
                                <p className="t4 title" style={{marginTop: 30}}>Manage Project Permissions</p>
                                <p className="t5 sub" style={{marginTop: 25}}>As the person creating this project, you have permissions to edit or delete anything that is created with the project workspace</p>
                                <p className="t5 sub" style={{marginTop: 5}}>Do you want the project to have mutiple admins who can control the project?</p>
                                <p className="t5 sub" style={{marginTop: 5}}></p>

                                <div className="horizontal" style={{justifyContent: 'flex-start', marginTop: 30}}>
                                    <div style={{height:50, boxSizing:'border-box', padding:'10px 20px 10px 15px', border: '2.5px solid', borderColor : hasMultipleManagers ? '#eee' : '#008EF6', borderRadius: 5, display: 'flex', flexDirection: 'row', alignItems: 'center', cursor:'pointer'}} onClick={() => setHasMultipleManagers(false)}>
                                    {!hasMultipleManagers ? 
                                        <IoIosCheckmarkCircle size={24} className="themeColor" style={{cursor:'pointer'}}/>
                                    :
                                        <RiCheckboxBlankCircleLine size={24} className="dg" style={{cursor:'pointer'}} onClick={() => setHasMultipleManagers(false)}/>
                                    }
                                    <p className="t45 title" style={{fontFamily:'wh-bold', marginLeft: 10}}>single admin</p>
                                    </div>
                                    <div style={{height:50, boxSizing:'border-box', padding:'10px 20px 10px 15px', border: '2.5px solid', borderColor : !hasMultipleManagers ? '#eee' : '#008EF6', borderRadius: 5, display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 20, cursor:'pointer'}} onClick={() => setHasMultipleManagers(true)}>
                                    {hasMultipleManagers ? 
                                        <IoIosCheckmarkCircle size={24} className="themeColor" style={{cursor:'pointer'}}/>
                                    :
                                        <RiCheckboxBlankCircleLine size={24} className="dg" style={{cursor:'pointer'}} onClick={() => setHasMultipleManagers(true)}/>
                                    }
                                    <p className="t45 title" style={{fontFamily:'wh-bold', marginLeft: 10}}>multiple admins</p>
                                    </div>
                                </div> 
                                
                               
                            </div>
                        </div>
                    </div>

                    // =============================================================================
            : activeIndex === 3 ? 
                    <div className="swiper-slide">
                        <div className="horizontal" style={{alignItems: 'flex-start'}}>
                        
                            <div style={{width:'48%', height:'100%', marginRight: 20}}>
                                

                                <p className="t4 title" style={{marginTop: 30}}>Privacy Settings</p>
                                <p className="t5 sub" style={{marginTop: 20}}>Privacy settings can be changed later in project settings</p>

                                 
                                <div className="horizontal" style={{justifyContent: 'flex-start', marginTop: 30, cursor:'pointer'}} onClick={() => setIsProjectPrivate(!isProjectPrivate)}>
                                    <div style={{width: 30, height: '100%', display: 'flex',}}>
                                        {isProjectPrivate ? 
                                            <IoIosCheckmarkCircle size={24} className="themeColor" style={{cursor:'pointer',}} onClick={() => setIsProjectPrivate(!isProjectPrivate)}/>
                                        :
                                            <RiCheckboxBlankCircleLine size={24} className="dg" style={{cursor:'pointer'}} onClick={() => setIsProjectPrivate(!isProjectPrivate)}/>
                                        }
                                    </div>
                                    <div style={{marginLeft: 10}}>
                                        <p className="t45 title" style={{fontFamily:'wh-bold', marginBottom:5}}>Set project scope to private</p>
                                        <p className="t6 sub" style={{marginRight: 50}}>Private projects are accessible to only those who are members</p>
                                    </div>
                                </div>
                                 
                                <div className="horizontal" style={{justifyContent: 'flex-start', marginTop: 30, cursor:'pointer'}}onClick={() => setHasPrivacy(!hasPrivacy)}>
                                    <div style={{width: 30, height: '100%', display: 'flex'}}>
                                    {hasPrivacy ? 
                                        <IoIosCheckmarkCircle size={24} className="themeColor" style={{cursor:'pointer'}} onClick={() => setHasPrivacy(!hasPrivacy)}/>
                                    :
                                        <RiCheckboxBlankCircleLine size={24} className="dg" style={{cursor:'pointer'}} onClick={() => setHasPrivacy(!hasPrivacy)}/>
                                    }
                                    </div>
                                    <div style={{marginLeft: 10}}>
                                        <p className="t45 title" style={{fontFamily:'wh-bold', marginBottom:5}}>Keep members list private</p>
                                        <p className="t6 sub">When private, the project members won't be visible to anyone else</p>
                                    </div>
                                </div>

                                <p className="t4 title" style={{marginTop: 50,}}>Set project due date</p>
                                <p className="t5 sub" style={{marginTop: 20, marginBottom: 20}}>The due date can be changed later, if required</p>
                                <DatePicker 
                                    selected={dueDate} 
                                    onChange={date => {
                                        if(date < new Date())
                                            return 
                                        setDueDate(date)
                                    }} 
                                    
                                    customInput={
                                        <div className='backgroundmg horizontal' style={{width: 200, height:50, borderRadius: 10, padding: '10px 15px', boxSizing: 'border-box', cursor:'pointer', flexDirection: 'row-reverse', justifyContent: 'flex-end'}}>
                                            <p className="t45 title" style={{marginLeft: 15, fontSize: 15}}>{dueDate.toLocaleDateString()}</p>
                                            <CgCalendarDates size={24} className='themeColor' />
                                        </div>
                                    } 
                                />
                                

                            </div>

                            <div style={{width:'48%', height:'100%'}}>

                                <p className="t4 title" style={{marginTop: 30}}>Set Project Priority</p>
                                <p className="t5 sub" style={{marginTop: 20}}>A project priority decides how important thw project delivery is</p>
                               

                                <div style={{justifyContent: 'flex-start', marginTop: 20}}>
                                    
                                    <div style={{boxSizing:'border-box', padding:'10px 0px 10px 0px', display: 'flex', flexDirection: 'row', alignItems: 'center', cursor:'pointer'}} onClick={() => setProjectPriority('low')}>
                                    {projectPriority === 'low' ? 
                                        <IoIosCheckmarkCircle size={24} className="themeColor" style={{cursor:'pointer'}}/>
                                    :
                                        <RiCheckboxBlankCircleLine size={24} className="dg" style={{cursor:'pointer'}} onClick={() => setProjectPriority('low')}/>
                                    }
                                        <div>    
                                            <p className="t45 title" style={{fontFamily:'wh-bold', marginLeft: 10}}>Low priority</p>
                                            <p className="t6 sub" style={{marginLeft: 10, marginTop: 5}}>These projects are allowed to run at a smooth pace, with no reminders</p>
                                        </div>
                                    </div>

                                    <div style={{boxSizing:'border-box', padding:'10px 0px 10px 0px', display: 'flex', flexDirection: 'row', alignItems: 'center', cursor:'pointer'}} onClick={() => setProjectPriority('medium')}>
                                    {projectPriority === 'medium' ? 
                                        <IoIosCheckmarkCircle size={24} className="themeColor" style={{cursor:'pointer'}}/>
                                    :
                                        <RiCheckboxBlankCircleLine size={24} className="dg" style={{cursor:'pointer'}} onClick={() => setProjectPriority('medium')}/>
                                    }
                                        <div>    
                                            <p className="t45 title" style={{fontFamily:'wh-bold', marginLeft: 10}}>Medium priority</p>
                                            <p className="t6 sub" style={{marginLeft: 10, marginTop: 5}}>These projects are allowed to run at medium pace, with occasional reminders</p>
                                        </div>
                                    </div>

                                    <div style={{boxSizing:'border-box', padding:'10px 0px 10px 0px', display: 'flex', flexDirection: 'row', alignItems: 'center', cursor:'pointer'}} onClick={() => setProjectPriority('high')}>
                                    {projectPriority === 'high' ? 
                                        <IoIosCheckmarkCircle size={24} className="themeColor" style={{cursor:'pointer'}}/>
                                    :
                                        <RiCheckboxBlankCircleLine size={24} className="dg" style={{cursor:'pointer'}} onClick={() => setProjectPriority('high')}/>
                                    }
                                        <div>    
                                            <p className="t45 title" style={{fontFamily:'wh-bold', marginLeft: 10}}>High priority</p>
                                            <p className="t6 sub" style={{marginLeft: 10, marginTop: 5}}>Such projects are coupled with freuqent reminders and milestone analysis</p>
                                        </div>
                                    </div>
                                    
                                </div> 
                               
                                <p className="t4 title" style={{marginTop: 30}}>Include a message in invitation</p>
                                <p className="t5 sub" style={{marginTop: 20}}>This message will be shared with people who you have invited to join this project</p>
                                <textarea
                                    placeholder='Type something..'
                                    onChange={t => setInvitationMessage(t.target.value)}
                                    value={invitationMessage}
                                    style={{marginTop: 25, height: 90}}
                                    
                                />

                            </div>
                        </div>
                    </div>
            :       <div className="swiper-slide">
                        <div className="horizontal" style={{alignItems: 'flex-start'}}>
                        
                            <div style={{width:'48%', height:'100%', marginRight: 20}}>
                                <p className="t4 title" style={{marginTop: 30,}}>Confirm project details</p>
                                
                                <div className="horizontal" style={{marginTop: 20, justifyContent: 'flex-start'}}>
                                    <div style={{justifyContent: 'flex-start', marginRight: 20}}>
                                        <p className="t5 sub">Project Name</p>
                                        <p className="t445 title" style={{marginTop: 5, fontSize: 18}}>{nameOfProject}</p>
                                    </div>
                                    <IconButton
                                        icon={<FiEdit3 size={16} className="themeColor"/>}
                                        style={{marginBottom: -25}}
                                        onClick={() => setActiveIndex(0)}
                                    />
                                </div>

                                <div className="horizontal" style={{marginTop: 40, alignItems: 'flex-start'}}>
                                    <div style={{justifyContent: 'flex-start', marginRight: 20, width:'100%'}}>
                                        <p className="t445 title">Project Members</p>
                                    </div>
                                    <IconButton
                                        icon={<FiPlus size={20} className="themeColor"/>}
                                        style={{marginTop: 0}}
                                        onClick={() => setActiveIndex(2)}
                                    />
                                </div>
                                <p className="t5 sub">total {projectMembers.length} members</p>
                                <div style={{width:'100%', marginTop: 10, height: 230}}>
                                            <Scrollbars 
                                                style={{width : '100%', height: 230}}
                                                autoHide
                                                autoHideDuration={1000}
                                                autoHideTimeout={800}
                                                renderThumbVertical={({ style, ...props }) =>
                                                <div {...props} className="backgroundPrimary" style={{ ...style, opacity: 0.4 ,borderRadius: 10 , width: 5, paddingRight: 2, marginRight: 2, zIndex: 300, position: 'absolute', right: -5}}/>
                                                }  
                                            >
                                            {
                                                projectMembers.slice(0,5).map(user => {
                                                    return <UserCard id={user.id} fname={user.fname} lname={user.lname} designation={user.designation} photo={user.photo} people={projectMembers} cannotEdit deleteUser={() => {
                                                        let arr = [...projectMembers]
                                                        let newArr = arr.filter(mem => mem.id !== user.id)
                                                        setProjectMembers(newArr)
                                                    }}/>
                                                })
                                            }
                                            </Scrollbars>
                                </div>
                                <p className="t5 themeColor">{projectMembers.length > 5 ? `+ ${projectMembers.length - 5} people` : ''}</p>

                            </div>
                            
                            <div style={{width:'48%', height:'100%', marginRight: 0}}>
                                <p className="t5 sub" style={{marginTop: 30,}}>Project Template</p>
                                <p className="t445 title" style={{marginTop: 5, fontSize: 18}}>{templateType}</p>
                                
                                <div className='horizontal' style={{marginTop: 20}}>
                                    <div className="backgroundmg" style={{width:180, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10, overflow: 'hidden'}}>
                                        <img src={templateType === 'agile' ? agile : templateType === 'simple' ?  simple : timeline} style={{objectFit:'contain', height: '100%'}}/>
                                    </div>
                                    <div style={{marginTop: 0, marginLeft: 20, justifyContent: 'flex-start', marginRight: 0, width:'65%'}}>
                                        <p className="t445 title" style={{fontSize: 18}}>{templateType} view</p>
                                        <p className="t5 sub" style={{marginTop: 10,}}>
                                        {templateType === 'simple' ? 'The most simple type of project with lesser tasks and duration, and faster speed of work'
                                                :templateType === 'agile' ? 'Suitable for projects requiring fast development. Project is broken down into modules'
                                                :'A more complicated project involving timelines, multiple tasks running parallely and longer duration'    
                                            }
                                        </p>
                                    </div>
                                    <IconButton
                                        icon={<FiEdit3 size={16} className="themeColor"/>}
                                        onClick={() => setActiveIndex(1)}
                                    />
                                </div>

                                <div className='horizontal' style={{marginTop: 30}}>
                                    <div>
                                        <p className="t5 sub" style={{marginTop: 0,}}>Project Priority</p>
                                        <p className="t445 title" style={{marginTop: 5, fontSize: 18}}>{projectPriority} priority</p>
                                        <p className="t6 sub" style={{marginTop: 10,}}>
                                                
                                            {projectPriority === 'low' ? 'These projects are allowed to run at a smooth pace, with no reminders'
                                                :projectPriority === 'medium' ? 'These projects are allowed to run at medium pace, with occasional reminders'
                                                :'Such projects are coupled with freuqent reminders and milestone analysis'    
                                            }
                                        </p>
                                    </div>
                                    <IconButton
                                        icon={<FiEdit3 size={16} className="themeColor"/>}
                                        onClick={() => setActiveIndex(3)}
                                    />
                                </div>
                            </div>
                        
                        </div>
                     
                    </div>
            }


            </div>

            <div className="pagination-div">
                
                <div className={activeIndex >= 0 ? "pagination-circle-active" : "pagination-circle"} onClick={() => goToSlide(0)}>
                    <p className='t445'>1</p>
                </div>
                
                <div className={activeIndex >= 1 ? "pagination-line-active" : "pagination-line"}></div>
                
                <div className={activeIndex >= 1 ? "pagination-circle-active" : "pagination-circle"} onClick={() => goToSlide(1)}>
                    <p className='t445'>2</p>
                </div>
                
                <div className={activeIndex >= 2 ? "pagination-line-active" : "pagination-line"}></div>
                
                <div className={activeIndex >= 2 ? "pagination-circle-active" : "pagination-circle"} onClick={() => goToSlide(2)}>
                    <p className='t445'>3</p>
                </div>
                
                <div className={activeIndex >= 3 ? "pagination-line-active" : "pagination-line"}></div>
                
                <div className={activeIndex >= 3 ? "pagination-circle-active" : "pagination-circle"} onClick={() => goToSlide(3)}>
                    <p className='t445'>4</p>
                </div>

                <div className={activeIndex >= 4 ? "pagination-line-active" : "pagination-line"}></div>
                
                <div className={activeIndex >= 4 ? "pagination-circle-active" : "pagination-circle"} onClick={() => goToSlide(4)}>
                    <p className='t445'>5</p>
                </div>
                
            </div>


            {/* ======================================================================================================================= */}

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={smallModal}>
                <div className="modalDiv">
                    <img src={gear} width={90} height={90} style={{marginTop: 20}} className="rotate"/>
                    <p className="t3 title" style={{marginTop: 30}}>Creating your project...</p>
                    <p className="t45 sub" style={{marginTop: 20, marginBottom: 30}}>This will take a few moments to complete</p>
                </div>
                
            </Modal>

        </div>
    )
}

export default NewProject