import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Alert from './Alert';
import { useDispatch } from 'react-redux';
import { alertActions } from '../store/alert';
import AnimatedContent from '../components/Animation/AnimatedContent'

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const ref = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = credentials;
        const response = await fetch(`https://inotebook-backend-nhrs.onrender.com/api/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            localStorage.setItem('name', json.name);
            localStorage.setItem('email', json.email);
            localStorage.setItem('date', json.date);
            dispatch(alertActions.showAlert({
                message: "Logged in successfully",
                type: "success"
            }))
            setTimeout(() => {
                dispatch(alertActions.clearAlert())
            }, 2000)
            navigate('/home');
        }
        else {
            let i = 0;
            dispatch(alertActions.showAlert({
                message: json.errors[i].msg,
                type: "danger"
            }))
            dispatch(alertActions.showAlert({
                message: json.errors,
                type: "danger"
            }))
            setTimeout(() => {
                dispatch(alertActions.clearAlert())
            }, 2000)
        }
    }
    const handleClose = () => {
        ref.current.click();
        dispatch(alertActions.clearAlert());
    }
    return (
        <>
            {!localStorage.getItem('token') &&
                <>
                    <Alert handleClose={handleClose} />
                    <button ref={ref} className='btn-close float-end d-none'></button>
                    <section className="page login-1">
                        <div className="login-1-background"></div>
                        <AnimatedContent
                            distance={150}
                            direction="vertical"
                            reverse={true}
                            duration={1.2}
                            ease="bounce.out"
                            initialOpacity={0.2}
                            animateOpacity
                            scale={1.1}
                            threshold={0.2}
                            delay={0.3}>
                            <div className="login-1-card">
                                {/* <img src={logo} /> */}

                                <h2 className='text-white fw-bolder mb-3'>Welcome to iNotebook</h2>
                                <h2 className='text-white fw-bolder mb-3'>Login to Your Account 📝</h2>
                                <form onSubmit={handleSubmit}>
                                    <input type="email" name='email' id="email" placeholder="Email" onChange={handleChange} required />
                                    <input type="password" placeholder="Password" name='password' onChange={handleChange} id="password" minLength={5} required />
                                    <button type="submit" className="btn btn-success">Login</button>
                                </form>
                                <footer className='text-white font-bolder'>
                                    Need an account? <NavLink to={'/signup'} className='fw-bolder text-primary-emphasis'><button className="btn btn-success">Signup</button></NavLink>
                                </footer>
                            </div>
                        </AnimatedContent>

                    </section>

                </>
            }
        </>
    )
}

export default Login
