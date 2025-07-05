
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { alertActions } from '../store/alert'
import AnimatedContent from '../components/Animation/AnimatedContent'
import FuzzyText from '../components/Animation/FuzzyText';
import { FaUserEdit } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
const User = () => {
    const host = "https://inotebook-backend-nhrs.onrender.com";
    const navigate = useNavigate();
    const ref = useRef(null);
    const [user, setUser] = useState({ name: "", email: "", date: "", profilepic: "" })
    const [fetching, setFetching] = useState(true)
    const [fname, setFname] = useState()

    function titleCase(str) {
        return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
    }
    if (!localStorage.getItem('token')) {
        navigate('/login')
    }
    const fetchUser = async () => {

        const { data } = await axios.get(`${host}/api/auth/getuser`, {
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        if (data.success) {
            setUser({
                name: data.user.name,
                email: data.user.email,
                date: data.user.date,
                profilepic: data.user.profilepic || ""  // <-- important
            });
            setFetching(false)
        }
    }
    useEffect(() => {
        fetchUser();
    }, [fetching])
    let utcDate = moment(user.date);
    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete your account')) {
            const { data } = await axios.delete(`${host}/api/auth/deleteaccount`, {
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                }
            });
            if (data.success) {
                localStorage.removeItem('token');
                localStorage.removeItem('name');
                navigate('/login')
                dispatch(alertActions.showAlert({
                    message: "Account Deleted successfully",
                    type: "success"
                }))
            }
        }
    }
    const handleChange = (e) => {
        setFname(e.target.files[0].name)
        setUser({ ...user, profilepic: e.target.files[0] })
    }

    const handleProfilePic = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", user.name);
        formData.append("email", user.email);
        formData.append("date", utcDate.format('YYYY-MM-DD'));
        formData.append("profilepic", user.profilepic);

        // add user's state values into dataabase as it is
        const { data } = await axios.post(`${host}/api/auth/updateprofile`, formData, {
            headers: {
                "auth-token": localStorage.getItem("token"),
                "Content-Type": "multipart/form-data"
            }
        });
        if (data.success) {
            setUser({
                name: data.user.name,
                email: data.user.email,
                date: data.user.date,
                profilepic: data.user.profilepic
            });
            toast('Profile Image Uploaded Successfully', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

        }
    }
    console.log(user.profilepic)

    return (
        <>{!localStorage.getItem('token') ?
            <div className="container" >
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <div className="row d-flex justify-content-center " style={{ maxHeight: "90vh", maxWidth: "90%" }}>
                    <div className="mt-5 ">
                        <FuzzyText
                            baseIntensity={0.2}
                            hoverIntensity={0.5}
                            enableHover={true}
                        >
                            404 Page Not Found
                        </FuzzyText>
                    </div>
                </div></div> :
            <div className="container" style={{ minHeight: "100vh" }}>
                <h3 className='border-bottom border-2 border-primary text-warning text-center fw-bolder p-3 mt-2'> Personal Details</h3>
                <div className="row d-flex justify-content-center align-items-center ">
                    <div className="col-md-6 mt-2 ">
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
                            <div className="card bg-dark p-3 rounded-5" >
                                <div className="card-body">
                                    <div className="row d-flex justify-content-around">
                                        {typeof user.profilepic === "string" && (
                                            <div className='col-md-6'>
                                                <img
                                                    src={user.profilepic ? `user.profilepic` : 'user.svg'}
                                                    alt="Profile"
                                                    width={150}
                                                    height={150}
                                                    className=" mb-3 rounded-circle border border-light object-fit-cover"
                                                />
                                            </div>
                                        )}
                                        <div className='col-md-6 '>
                                            <p className='text-warning font-bolder text-center border border-bottom border-light'>Edit Profile Image</p>
                                            <form onSubmit={handleProfilePic} className="p-1 file-input d-flex gap-2  align-items-center justify-content-center">
                                                <label htmlFor="formFile" className="form-label"><FaUserEdit /><span className='ms-2'>Choose image </span></label>
                                                <input
                                                    ref={ref}
                                                    className="fileClass"
                                                    type="file"
                                                    id="formFile"
                                                    accept="image/jpeg"
                                                    name="profilepic"
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <button type="submit" className="btn btn-sm btn-warning">Save</button>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col d-flex justify-content-center">
                                        <div>
                                            <h5 >
                                                <strong className='text-warning'>Username : </strong>
                                                <strong className='text-white'>{titleCase(user.name)}</strong>
                                            </h5>
                                            <h5 >
                                                <strong className='text-warning'>Email : </strong>
                                                <strong className='text-white'>{user.email}</strong>
                                            </h5>
                                            <p>
                                                <strong className='text-warning'>Account updated on : </strong>
                                                <strong className='text-white'>{utcDate.format('LL')}</strong>
                                            </p>
                                            <div>
                                                <button onClick={handleDelete} className='btn btn-danger'>Delete Account</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AnimatedContent>

                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default User
