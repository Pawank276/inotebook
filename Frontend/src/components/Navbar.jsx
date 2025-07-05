import React, { useRef } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { VscThumbsupFilled } from "react-icons/vsc";
import { FaUserAlt } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import AnimatedContent from '../components/Animation/AnimatedContent'
const Navbar = () => {
    const ref = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const handleOffcanvas = () => {
        ref.current.click();
    }
    function titleCase(str) {
        return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
    }
    const handleLogout = () => {
        if (confirm("do you really want to logout")) {
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            localStorage.removeItem('email');
            localStorage.removeItem('date');
            navigate('/login');
        }
    }
    return (
        <>
            {localStorage.getItem('token') &&
                <nav className='navbar sticky-top' style={{ backgroundColor: "rgb(5, 18, 26)" }}>
                    <div className="container-fluid">
                        {localStorage.getItem('token') &&
                            <div className="logo">
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
                                    <Link className="navbar-brand text-warning fw-bolder" to="/home">
                                        <img src={"./iNotebook.svg"} />
                                        <strong className="text-warning fw-bolder fs-4">iNotebook</strong>
                                    </Link>
                                </AnimatedContent>

                            </div>
                        }
                        <div className="d-lg-flex d-none">
                            {localStorage.getItem('token') && <>
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
                                    <ul className="navbar-nav d-flex flex-row">
                                        <li className="nav-item me-4">
                                            <NavLink className='nav-link text-warning fw-bold fs-5 d-inline-block ' to="/home" activeclassname="active" >
                                                <i className='fs-3 me-1'><FaHome /></i>
                                                Home
                                            </NavLink>
                                        </li>
                                        <li className="nav-item me-4">
                                            <NavLink className="nav-link text-warning fw-bold fs-5 d-inline-block " to="/about" >
                                                <i className='fs-3 me-1'><VscThumbsupFilled /></i>
                                                About
                                            </NavLink>
                                        </li>
                                        <li className="nav-item me-4">
                                            <Link to={'/user'} className={`btn btn-sm ${location.pathname === '/user' ? 'btn-success' : 'btn-outline-warning'} fw-bold mt-2`}>
                                                <i className='icon fs-5 me-1  text-light'><FaUserAlt /></i>
                                                {titleCase(localStorage.getItem('name'))}
                                            </Link>
                                        </li>
                                        <li className="nav-item me-4">
                                            <button className="btn btn-danger btn-sm mt-2" onClick={handleLogout}>Logout</button>
                                        </li>
                                    </ul>
                                </AnimatedContent>

                            </>
                            }
                        </div>
                        <div className="offcanvas offcanvas-start" id="sidebar" databsscroll="true" tabIndex="-1" aria-labelledby="offcanvasWithBothOptionsLabel" style={{ backgroundColor: "rgb(18, 17, 17)" }}>
                            <div className="offcanvas-header">
                                <h3 className='offcanvas-title text-warning fw-bold '>Menu</h3>
                                <button ref={ref} type="button" className="btn-close text-reset btn-primary bg-danger" data-bs-dismiss="offcanvas"></button>
                            </div>
                            <div className="offcanvas-body">
                                {localStorage.getItem('token') ?

                                    <ul className="navbar-nav ms-5 d-flex flex-column">
                                        <li className="nav-item me-4">
                                            <Link to={'/user'} onClick={handleOffcanvas} className={`btn ${location.pathname === '/user' ? 'btn-success' : 'btn-outline-success'} fw-bold`}>
                                                <i className='fs-4 me-1 text-light'><FaUserAlt /></i>
                                                {titleCase(localStorage.getItem('name'))}
                                            </Link>
                                        </li>
                                        <li className="nav-item me-4">
                                            <NavLink onClick={handleOffcanvas} className='nav-link text-warning fw-bold fs-4 d-inline-block' to="/home" activeclassname="active" >
                                                <i className='fs-3 me-1'><FaHome /></i>
                                                <strong className='fs-5'>Home</strong>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item me-4">

                                            <NavLink onClick={handleOffcanvas} className="nav-link text-warning fw-bold fs-4 d-inline-block " to="/about" >
                                                <i className='fs-3 me-1'><VscThumbsupFilled /></i>
                                                About
                                            </NavLink>
                                        </li>
                                        <li className="nav-item me-4">
                                            <button className="btn btn-danger btn-sm mt-2" onClick={handleLogout}>Logout</button>
                                        </li>
                                    </ul> :
                                    <ul className='mt-2 d-flex flex-column  list-unstyled'>
                                        <li className="nav-item mb-2">
                                            <NavLink className="btn btn-primary me-2" to="/login" >Login</NavLink>
                                        </li>
                                        <li className="nav-item mb-2">
                                            <NavLink className="btn btn-warning " to="/signup" >Sign up</NavLink>
                                        </li>
                                    </ul>
                                }
                            </div>
                        </div>
                        <button className="offcanvasBtn btn btn-primary d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </nav>
            }
        </>
    )
}

export default Navbar