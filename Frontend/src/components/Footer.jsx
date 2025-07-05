import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BsLinkedin } from "react-icons/bs";
const Footer = () => {
    const navigate = useNavigate();
    function titleCase(str) {
        return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
    }
    return (
        <>
            {localStorage.getItem('token') &&
                <div className="container mt-5 mb-2">
                    <footer className="my-4 row  text-center border-top pt-3">
                        {/* make a footer for this app*/}
                        <div className="col-md-6">
                            <p className="text-secondary">© {new Date().getFullYear()} iNotebook. All rights reserved.</p>
                        </div>
                        <div className="col-md-6">
                            <p className="text-secondary">Developed by <Link to={'/about'} className='text-decoration-none text-warning' onClick={() => navigate('/about')}>{titleCase('Pavan Kuntal')}</Link></p>
                        </div>
                        <div className="col-md-12">
                            <p className="text-secondary">For any queries or suggestions, please contact me at <a href="mailto:pavankuntal27@gmail.com" className='text-decoration-none text-warning'>pavankuntal27@gmail.com</a></p>
                        </div>
                        <div className="col-md-12">
                            <p className="text-secondary">Follow me on <a href="linkedin.com/in/pavan-kuntal-191b51273/" target="_blank" className='text-decoration-none text-warning fs-3'>
                                <BsLinkedin />
                            </a>
                            </p>
                        </div>
                    </footer>

                </div>
            }
        </>
    )
}

export default Footer