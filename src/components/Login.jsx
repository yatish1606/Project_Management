import React, { useState } from 'react'
import '../css/login.css'
import {HiOutlineArrowNarrowLeft} from 'react-icons/hi'
import { AppButton, CustomInput, IconButton } from './Common'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import s1 from '../assets/s1.svg'
import s3 from '../assets/s3.svg'
import { FiChevronDown, FiCodesandbox } from 'react-icons/fi'
import s4 from '../assets/s4.svg'
import { useTheme } from './ThemeProvider'

const Login = ({history}) => {

    const {theme, setTheme} = useTheme()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)


    const loginUser = () => {

    }

    return (
        <div className="login-container">
            <div className="login-container-left">
                <div className="horizontal" style={{marginTop: '10%'}}>
                    <FiCodesandbox size={32} className="themeColor"/>
                    <p className="t3 lg" style={{marginLeft: 15, letterSpacing: 1, paddingBottom: 8}}>pro<span style={{color:'#ED4B01', fontFamily:'gs-bold', margin:'auto 3px', fontSize: 29, marginTop: -5}}>:</span><span className="themeColor">manage</span></p>
                </div>
                <p className="t45" style={{color:'#878787', marginTop: 20, fontSize: 16}}>an essential project management tool</p>
                <div className='float1login'>
                    <img src={s1}/>
                </div>
                
            </div>
            <div className="login-container-right">
                
                <HiOutlineArrowNarrowLeft size={30} color="#eee" style={{position: 'absolute', cursor:'pointer'}} onClick={() => history.goBack()}/>
                
                <p className="t2" style={{marginTop: '20%', color:'#eee', marginLeft: 3}}>Login into your account</p>

                <div style={{position: 'absolute', right: 40}}>
                    <Link to="/register">
                        <p className="t5 themeColor" style={{cursor:'pointer'}}>New here ? Register</p>
                    </Link>
                </div>
                
                <div style={{width:'100%', paddingRight: '20%', boxSizing:'border-box', marginTop: '15%'}}>
                    <input
                        placeholder='email address'
                        onChange={t => setUsername(t.target.value)}
                        value={username}
                        className="darkinput"
                    />
                    <div style={{position:'relative'}}>
                        <input
                            placeholder='password'
                            onChange={t => setPassword(t.target.value)}
                            value={password}
                            className="darkinput"
                            style={{marginTop: 15}}
                            type={passwordVisible ? 'text' : 'password'}
                        />
                        {passwordVisible ?
                            <FiEyeOff size={20} color="#878787" style={{position: 'absolute', top: '50%', transform:'translateY(-10%)', right: 15, cursor:'pointer'}} onClick={() => setPasswordVisible(!passwordVisible)}/>
                        :
                            <FiEye size={20} color="#878787" style={{position: 'absolute', top: '50%', transform:'translateY(-10%)', right: 15, cursor:'pointer'}} onClick={() => setPasswordVisible(!passwordVisible)}/>
                        }

                    </div>
                    
                    <AppButton
                        title="Login"
                        onClick={loginUser}
                        style={{marginTop: '15%'}}
                    />

                </div>

                
            </div>
        </div>
    )
}

export default Login