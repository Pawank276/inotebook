import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import AnimatedContent from '../components/Animation/AnimatedContent'

const Hero = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/home')
        }
    })
    return (
        <div className="container mt-5" id='hero'>
            <div className="row d-flex justify-content-center">
                <div className="col p-5">
                    <video id="background-video" src='hero.mp4' autoPlay loop muted>
                    </video>
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
                        delay={0.3}
                    >
                        <h1 className=" mt-5 fw-bolder text-light text-center rounded-3">Welcome to <img src={"./iNotebook.svg"} /><strong className="text-warning fw-bolder">iNotebook</strong></h1>
                    </AnimatedContent>

                    <div className="mt-5">
                        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                            <AnimatedContent
                                distance={150}
                                direction="horizontal"
                                reverse={false}
                                duration={1.2}
                                ease="bounce.out"
                                initialOpacity={0.2}
                                animateOpacity
                                scale={1.1}
                                threshold={0.2}
                                delay={0.5}
                            >
                                <Link to={'/login'} className="btn btn-primary btn-lg px-4 me-sm-3 fw-bold">Login</Link>
                            </AnimatedContent>
                            <AnimatedContent
                                distance={150}
                                direction="horizontal"
                                reverse={true}
                                duration={1.2}
                                ease="bounce.out"
                                initialOpacity={0.2}
                                animateOpacity
                                scale={1.1}
                                threshold={0.2}
                                delay={0.5}
                            >
                                <Link to={'/signup'} className="btn btn-warning btn-lg px-4 ms-md-4">SignUp</Link>
                            </AnimatedContent>


                        </div>
                    </div>
                </div>
            </div>
            <div className="icons">
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
                    delay={0.3}
                >
                    <div>
                        <a href="" target='_blank'>
                            <strong className='text-light me-2 ms-auto fs-2 icon'><FaSquareXTwitter /></strong>
                        </a>
                        <a href="https://www.instagram.com/pawan.webdev?igsh=OGQ5ZDc2ODk2ZA==" target='_blank'>
                            <strong className='text-danger me-2 ms-auto fs-2 icon'><FaSquareInstagram /></strong>
                        </a>
                        <a href="https://www.linkedin.com/in/pawan-kuntal-191b51273" target='_blank'>
                            <strong className='text-primary me-2 ms-auto fs-2 icon'><FaLinkedin /></strong>
                        </a>
                    </div>
                </AnimatedContent>

            </div>
        </div>
    )
}

export default Hero