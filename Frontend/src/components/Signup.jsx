import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { alertActions } from '../store/alert';
import Alert from './Alert';
import AnimatedContent from '../components/Animation/AnimatedContent'

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ref = useRef();
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: "", })
    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { name, email, password, cpassword } = credentials;
            if (password !== cpassword) {
                dispatch(alertActions.showAlert({
                    message: "Password are not matched",
                    type: "danger"
                }))
                setTimeout(() => {
                    dispatch(alertActions.clearAlert())
                }, 2000)
            } else {
                const response = await fetch(`https://inotebook-backend-nhrs.onrender.com/api/auth/createuser`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, password })
                });
                const json = await response.json();
                if (json.success) {
                    navigate('/login');
                    dispatch(alertActions.showAlert({
                        message: "User created successfully",
                        type: "success"
                    }))
                } else {
                    let errorMsg = "";
                    if (Array.isArray(json.errors) && json.errors.length > 0) {
                        errorMsg = json.errors[0].msg;
                    } else if (typeof json.errors === 'string') {
                        errorMsg = json.errors;
                    } else if (typeof json.error === 'string') {
                        errorMsg = json.error;
                    } else {
                        errorMsg = "Registration failed";
                    }

                    dispatch(alertActions.showAlert({
                        message: errorMsg,
                        type: "danger"
                    }));
                    setTimeout(() => {
                        dispatch(alertActions.clearAlert());
                    }, 2000);
                }

            }

        } catch (error) {
            dispatch(alertActions.showAlert({
                message: error.message || "Something went wrong",
                type: "danger"
            }))
            setTimeout(() => {
                dispatch(alertActions.clearAlert())
            }, 2000)
            console.log(error);
        }

    }
    const handleClose = () => {
        ref.current.click();
        dispatch(alertActions.clearAlert());
    }
    return (
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
                        <h2 className='text-white fw-bolder mb-2'>Signup🧾❤️</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="text" name='name' placeholder="Enter Your Name" onChange={handleChange} className="form-control" id="name" required minLength={3} />
                            <input type="email" name='email' id="email" placeholder="Email" onChange={handleChange} required />
                            <input type="password" placeholder="Password" name='password' onChange={handleChange} id="password" minLength={5} required />
                            <input type="password" name='cpassword' placeholder="Confirm Password" onChange={handleChange} id="cpassword" required minLength={5} />
                            <button type="submit" className="btn btn-success">Signup</button>
                        </form>
                        <footer className='text-white font-bolder'>
                            <Link to={'/login'} className="btn btn-primary ">Back to login</Link>
                        </footer>
                    </div>
                </AnimatedContent>

            </section>

        </>
    )
}

export default Signup
