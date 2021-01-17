import React, { useState } from 'react'
import '../css/login.css'
import {HiCheck, HiOutlineArrowNarrowLeft} from 'react-icons/hi'
import { AppButton, CustomInput, getRandomColor, IconButton } from './Common'
import { FiCheck, FiEye, FiEyeOff } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import s1 from '../assets/s1.svg'
import s3 from '../assets/s3.svg'
import { FiChevronDown, FiCodesandbox } from 'react-icons/fi'
import s4 from '../assets/s4.svg'
import { PasswordMeter } from 'password-meter'
import { RiCheckboxBlankCircleLine } from 'react-icons/ri'
import {IoIosCheckmarkCircle} from 'react-icons/io'
import axios from 'axios'
import { APIURL } from './api'
import { useUser } from './UserProvider'
import { useAuth } from './AuthProvider'



const randomColor = getRandomColor(true)

const Register = ({history}) => {


    const {user, setUser} = useUser()
    const {isAuthenticated, setAuth} = useAuth()
    const historyRouter = useHistory()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState({
        strength:null,
        text:''
    })
    const [passwordFocused, setPasswordFocused] = useState(false)
    const [designation, setDesignation] = useState('')
    const [profilePhoto, setProfilePhoto] = useState({
        photo: null,
        name : null,
        size : null
    })
    const [gender, setGender] = useState('male')

    const [activeIndexReg, setActiveIndex] = useState(0)

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const canProceed = [
        firstName.length > 2 && lastName.length,
        emailRegex.test(String(email).toLowerCase()) && password.length && designation.length && passwordStrength.strength >= 40,
        true,
        true
    ]

    const handleNextSlide = () => {

        if(canProceed[activeIndexReg]) {
            setActiveIndex(activeIndexReg + 1)
        }
    }

    const handlePreviousSlide = () => {
        setActiveIndex(activeIndexReg - 1)
    }

    const findPasswordStrength = () => {

        let s = new PasswordMeter({}, {
            '20' : 'very weak',
            '40' : 'weak',
            '60' : 'medium',
            '80' : 'strong',
            '100': 'perfect',
            '_'  : 'perfect'
        }).getResult(password)

        setPasswordStrength({
            strength: s.percent,
            text: s.status
        })
    }

    const handleProfilePhotoUpload = event => {
		
        if(event) {
            setProfilePhoto({
                photo: event.target.files[0],
                name: event.target.files[0].name,
                size : event.target.files[0].size
            })
        }

        var oFReader = new FileReader();
        oFReader.readAsDataURL(event.target.files[0]);

        oFReader.onload = oFREvent => {
            document.getElementById("profile-photo-image").src = oFREvent.target.result
        }
	}


    const registerUser = () => {

        const userObject = {
            fname : firstName.charAt(0).concat(firstName.slice(1, firstName.length)),
            lname : lastName.charAt(0).concat(lastName.slice(1, lastName.length)),
            email : email,
            password : password,
            designation : designation.charAt(0).concat(designation.slice(0, designation.length)),
            profile_photo : profilePhoto,
            gender : gender,
            projects : 0
        }

        axios.post(`${APIURL}/users`, userObject)
        .then(res => {
            setUser(res.data.userInserted)
            setAuth(true)
            historyRouter.push('/dashboard')
        })
        .catch(e => console.error(e))
    }

    return (
        <div className="login-container">

            <div className="register-pagination">
                <div className={activeIndexReg === 0 || (activeIndexReg > 0 && canProceed[0]) ? "register-pagination-circle active" : "register-pagination-circle"} onClick={() => setActiveIndex(0)}>
                    <p className="t4" style={{color:'inherit'}}>{activeIndexReg > 0 && canProceed[activeIndexReg] ?  <HiCheck size={22} color="#fff" style={{marginTop: 4}}/> : `1`}</p>
                </div>
                <div className="register-pagination-line">

                </div>
                <div className={activeIndexReg === 1 || (activeIndexReg > 1 && canProceed[1]) ? "register-pagination-circle active" : "register-pagination-circle"} onClick={() => canProceed[0] ?  setActiveIndex(1) : null}>
                    <p className="t4" style={{color:'inherit'}}>{activeIndexReg > 1 && canProceed[activeIndexReg] ?  <HiCheck size={22} color="#fff" style={{marginTop: 4}}/> : `2`}</p>
                </div>
                <div className="register-pagination-line">

                </div>
                <div className={activeIndexReg === 2 || (activeIndexReg > 2 && canProceed[2]) ? "register-pagination-circle active" : "register-pagination-circle"} onClick={() => canProceed[0] && canProceed[1] ?  setActiveIndex(2) : null}>
                    <p className="t4" style={{color:'inherit'}}>{activeIndexReg > 2 && canProceed[activeIndexReg] ?  <HiCheck size={22} color="#fff" style={{marginTop: 4}}/> : '3'}</p>
                </div>
                <div className="register-pagination-line">

                </div>
                <div className={activeIndexReg === 3 || (activeIndexReg > 3 && canProceed[3]) ? "register-pagination-circle active" : "register-pagination-circle"} onClick={() => canProceed[0] && canProceed[1] && canProceed[2] ?  setActiveIndex(3) : null}>
                    <p className="t4" style={{color:'inherit'}}>{activeIndexReg > 3 && canProceed[activeIndexReg] ?  <HiCheck size={22} color="#fff" style={{marginTop: 4}}/> : '4'}</p>
                </div>
            </div>
    
            <div className="login-container-right">
                
                <HiOutlineArrowNarrowLeft size={30} color="#eee" style={{position: 'absolute', cursor:'pointer'}} onClick={() => history.goBack()}/>
                
                <div style={{position: 'absolute', right: 40}}>
                    <Link to="/login">
                        <p className="t5 themeColor" style={{cursor:'pointer', fontSize: 16, marginTop: 5}}>Been here before ? Login</p>
                    </Link>
                </div>


                <div className="register-slide" style={{display:activeIndexReg === 0? 'block' : 'none'}}>
                
                    <p className="t2" style={{marginTop: '20%', color:'#eee', marginLeft: 3}}>Efficiently create and manage projects</p>
                    <p className="t4" style={{marginTop: '15px', color:'#878787', marginLeft: 3, fontFamily:'wh-sbold'}}>register and explore the features</p>

                    <p className="t4" style={{marginTop: '20%', color:'#878787', marginLeft: 3, fontFamily:'wh-sbold'}}>Let's get started with your name</p>

                    
                    <div style={{width:'100%', paddingRight: '20%', boxSizing:'border-box', marginTop: '40px'}}>
                        <input
                            placeholder='first name'
                            onChange={t => setFirstName(t.target.value)}
                            value={firstName}
                            className="darkinput"
                        />
                        <input
                            placeholder='last name'
                            onChange={t => setLastName(t.target.value)}
                            value={lastName}
                            className="darkinput"
                            style={{marginTop:15}}
                        />
                    </div>
                
                </div>

                <div className="register-slide" style={{display:activeIndexReg === 1? 'block' : 'none'}}>
                
                    <p className="t4" style={{marginTop: '20%', color:'#eee', marginLeft: 3, fontFamily:'wh-sbold'}}>Add an email and a password</p>

                    
                    <div style={{width:'100%', paddingRight: '20%', boxSizing:'border-box', marginTop: '40px'}}>
                        <input
                            placeholder='email'
                            onChange={t => setEmail(t.target.value)}
                            value={email}
                            className="darkinput"
                        />
                        <div style={{position:'relative'}}>
                            <input
                                placeholder='password'
                                onChange={t => {
                                    setPassword(t.target.value)
                                    findPasswordStrength()
                                }}
                                value={password}
                                className="darkinput"
                                style={{marginTop: 15}}
                                type={passwordVisible ? 'text' : 'password'}
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => setPasswordFocused(false)}
                            />
                            {passwordVisible ?
                                <FiEyeOff size={20} color="#878787" style={{position: 'absolute', top: '50%', transform:'translateY(-10%)', right: 15, cursor:'pointer'}} onClick={() => setPasswordVisible(!passwordVisible)}/>
                            :
                                <FiEye size={20} color="#878787" style={{position: 'absolute', top: '50%', transform:'translateY(-10%)', right: 15, cursor:'pointer'}} onClick={() => setPasswordVisible(!passwordVisible)}/>
                            }

                        </div> 
                        
                        <div style={{height:50, width:'100%'}}>
                            <div className="password-strength-div" style={{visibility: passwordFocused ? 'visible' : 'hidden'}}>
                                
                                <div className={passwordStrength.strength > 0 ? "password-strength-bar backgroundThemeColor" : 'password-strength-bar'}></div>
                                <div className={passwordStrength.strength > 20 ? "password-strength-bar backgroundThemeColor" : 'password-strength-bar'}></div>
                                <div className={passwordStrength.strength > 40 ? "password-strength-bar backgroundThemeColor" : 'password-strength-bar'}></div>
                                <div className={passwordStrength.strength > 60 ? "password-strength-bar backgroundThemeColor" : 'password-strength-bar'}></div>
                                <div className={passwordStrength.strength > 80 ? "password-strength-bar backgroundThemeColor" : 'password-strength-bar'}></div>

                            </div> 
                            <div style={{width:'100%', alignContent:'flex-end', display: 'flex', flexDirection:'column', alignItems:'flex-end'}}>
                                <p className="t5 themeColor" style={{visibility: passwordFocused ? 'visible' : 'hidden',marginRight: 10, textAlign:'right', marginTop: 15}}>{passwordStrength.text}</p>
                            </div>
                            
                        </div>
                        
                    </div>
                    
                    
                    <p className="t4" style={{marginTop: '20px', color:'#eee', marginLeft: 3, fontFamily:'wh-sbold'}}>Designation</p>

                    <p className="t5" style={{marginTop: '20px', color:'#878787', marginLeft: 3, fontFamily:'wh-sbold'}}>Your designation is the role you play currently at work</p>
                

                    <div style={{width:'100%', paddingRight: '20%', boxSizing:'border-box', marginTop: '40px'}}>
                        <input
                            placeholder='designer, manager, etc'
                            onChange={t => setDesignation(t.target.value)}
                            value={designation}
                            className="darkinput"
                        />
                    </div>

                </div>

                <div className="register-slide" style={{display:activeIndexReg === 2? 'block' : 'none'}}>
                
                    <p className="t4" style={{marginTop: '20%', color:'#eee', marginLeft: 3, fontFamily:'wh-sbold'}}>Edit your profile photo</p>

                    <div className="horizontal" style={{marginTop: 20, justifyContent: 'flex-start'}}>
                        <div className='register-profile-photo' style={{backgroundColor: randomColor}}>
                            {
                                profilePhoto.photo ? 
                                <img id="profile-photo-image"/>
                                :
                                <p className="t1" style={{color:'#fff'}}>{firstName.charAt(0).toUpperCase()} {lastName.charAt(0).toUpperCase()}</p>
                            }
                        </div>
                        
                        <div className="upload-button">
                            <p className="t5" style={{color:'#eee'}}>upload</p>
                            <input type="file" style={{opacity:0, width:'100%', position: 'absolute', height:'100%'}} onChange={handleProfilePhotoUpload} accept="image/jpg, image/jpeg, image/png"/>
                        </div>
                    </div>
                   
                    <p className="t4" style={{marginTop: '50px', color:'#eee', marginLeft: 3, fontFamily:'wh-sbold'}}>Please select your gender</p>

                    
                    <div style={{justifyContent: 'flex-start', marginTop: 20}}>
                                    
                        <div style={{boxSizing:'border-box', padding:'10px 0px 10px 0px', display: 'flex', flexDirection: 'row', alignItems: 'center', cursor:'pointer'}} onClick={() => setGender('male')}>
                            {gender === 'male' ? 
                                <IoIosCheckmarkCircle size={24} className="themeColor" style={{cursor:'pointer'}}/>
                                :
                                <RiCheckboxBlankCircleLine size={24} color="#878787" style={{cursor:'pointer'}} onClick={() => setGender('male')}/>
                            }
                            <div>    
                                <p className="t45" style={{fontFamily:'wh-sbold', marginLeft: 10, color:'#878787'}}>male</p>
                            </div>
                        </div>

                        <div style={{boxSizing:'border-box', padding:'10px 0px 10px 0px', display: 'flex', flexDirection: 'row', alignItems: 'center', cursor:'pointer'}} onClick={() => setGender('female')}>
                            {gender === 'female' ? 
                                <IoIosCheckmarkCircle size={24} className="themeColor" style={{cursor:'pointer'}}/>
                                :
                                <RiCheckboxBlankCircleLine size={24} color="#878787" style={{cursor:'pointer'}} onClick={() => setGender('female')}/>
                            }
                            <div>    
                                <p className="t45" style={{fontFamily:'wh-sbold', marginLeft: 10, color:'#878787'}}>female</p>
                            </div>
                        </div>

                        <div style={{boxSizing:'border-box', padding:'10px 0px 10px 0px', display: 'flex', flexDirection: 'row', alignItems: 'center', cursor:'pointer'}} onClick={() => setGender('nan')}>
                            {gender === 'nan' ? 
                                <IoIosCheckmarkCircle size={24} className="themeColor" style={{cursor:'pointer'}}/>
                                :
                                <RiCheckboxBlankCircleLine size={24} color="#878787" style={{cursor:'pointer'}} onClick={() => setGender('nan')}/>
                            }
                            <div>    
                                <p className="t45" style={{fontFamily:'wh-sbold', marginLeft: 10, color:'#878787'}}>other</p>
                            </div>
                        </div>

                                    
                    </div> 


                </div>


                <div className="register-slide" style={{display:activeIndexReg === 3? 'block' : 'none'}}>
                
                    <p className="t4" style={{marginTop: '20%', color:'#eee', marginLeft: 3, fontFamily:'wh-sbold'}}>You are all set !</p>

                    <div className='register-profile-photo-large' style={{backgroundColor: randomColor}}>
                            {
                                profilePhoto.photo ? 
                                <img id="profile-photo-image"/>
                                :
                                <p className="t1" style={{color:'#fff'}}>{firstName.charAt(0).toUpperCase()} {lastName.charAt(0).toUpperCase()}</p>
                            }
                    </div>

                    <p className='t1 text-center' style={{marginTop: 30, color:'#fff'}}>{firstName} {lastName}</p>

                    <p className='t45 text-center' style={{marginTop: 20, color:'#878787'}}>{designation}</p>

                    <p className='t45 text-center' style={{marginTop: 20, color:'#878787'}}>{email}</p>

                </div>


                
                <AppButton
                    title={activeIndexReg === 3 ? "Done" : "continue"}
                    onClick={activeIndexReg === 3 ? registerUser : handleNextSlide}
                    style={{position:'absolute', bottom:50, right:50,}}
                />
                
                <AppButton
                    title="back"
                    onClick={handlePreviousSlide}
                    style={{position:'absolute', bottom:45, paddingLeft:0, left:50,backgroundColor:'transparent', display:activeIndexReg === 0? 'none' :'flex'}}
                />

                
            </div>

            <div className="login-container-left">
                {isAuthenticated ? 'auth' : 'nah'}
                <div className="horizontal" style={{marginTop: '10%'}}>
                    <FiCodesandbox size={32} className="themeColor"/>
                    <p className="t3 " style={{marginLeft: 15, letterSpacing: 1, paddingBottom: 8, color:'#eee'}}>pro<span style={{color:'#ED4B01', fontFamily:'gs-bold', margin:'auto 3px', fontSize: 29, marginTop: -5}}>:</span><span className="themeColor">manage</span></p>
                </div>
                <p className="t45" style={{color:'#878787', marginTop: 20, fontSize: 16}}>an essential project management tool</p>
                <div className='float1login'>
                    <img src={s1}/>
                </div>
                
            </div>

        </div>
    )
}

export default Register