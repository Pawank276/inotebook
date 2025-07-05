import React, { useEffect, useRef, useState } from 'react'
import Noteitem from '../components/Noteitem'
import { useDispatch, useSelector } from 'react-redux'
import { noteActions } from '../store/notes'
import { NavLink, useNavigate } from 'react-router-dom'
import Alert from '../components/Alert'
import Loading from '../components/Loading'
import { alertActions } from '../store/alert'
import AnimatedContent from '../components/Animation/AnimatedContent'

import axios from 'axios'

const Notes = () => {
    const host = "http://localhost:5000";
    const noteitems = useSelector((store) => store.notes)
    const dispatch = useDispatch();
    const ref = useRef();
    const navigate = useNavigate();
    const [fetching, setFetching] = useState(true)
    const [deleted, setDeleted] = useState(false)
    const fetchnotes = async () => {
        const { data } = await axios.get(`${host}/api/notes/fetchallnotes`, {
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        })
        dispatch(noteActions.getnotes(data))
        setFetching(false)
    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchnotes();
            setTimeout(() => {
                dispatch(alertActions.clearAlert());
            }, 2000)
        } else {
            navigate('/login')
        }
    }, [fetching])
    const handleDelete = async (id) => {
        if (confirm('are you sure you want to delete this note?')) {
            const { data } = await axios.delete(`${host}/api/notes/deletenote/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                }
            });
            if (data.success) {
                setDeleted(true)
                dispatch(alertActions.showAlert({
                    message: "Note Deleted successfully",
                    type: "success"
                }))
            } else {
                dispatch(alertActions.showAlert({
                    message: "Note can't be deleted",
                    type: "danger"
                }))
            };
        }
    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
            if (deleted) {
                fetchnotes();
                setTimeout(() => {
                    dispatch(alertActions.clearAlert());
                }, 2000)
            }
            setDeleted(false);
        }
    }, [deleted]);
    const handleClose = () => {
        ref.current.click();
        dispatch(alertActions.clearAlert());
    }
    return (
        <>

            {noteitems.length > 0 ?
                <div className="container" style={{ minHeight: "100vh" }}>
                    <div className="row">
                        <div className=" d-flex justify-content-start ">
                            <Alert handleClose={handleClose} />
                            <button ref={ref} className='btn-close float-end d-none'></button>
                        </div>
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
                            <h2 className='border-bottom border-2 border-primary text-warning text-center fw-bolder p-3 mt-4'>My Notes</h2>
                        </AnimatedContent>
                        <AnimatedContent
                            distance={150}
                            direction="vertical"
                            reverse={false}
                            duration={1.2}
                            ease="bounce.out"
                            initialOpacity={0.2}
                            animateOpacity
                            scale={1.1}
                            threshold={0.2}
                            delay={0.3}>
                            <div>
                                <NavLink to="/addnote" className='btn btn-outline-warning float-start'>
                                    Add Note
                                </NavLink>
                            </div>
                        </AnimatedContent>
                        <div className="row my-5">
                            {fetching && <Loading />}
                            <AnimatedContent
                                distance={150}
                                direction="vertical"
                                reverse={false}
                                duration={1.2}
                                ease="bounce.out"
                                initialOpacity={0.2}
                                animateOpacity
                                scale={1.1}
                                threshold={0.2}
                                delay={0.3}>
                                {noteitems.map(note => <Noteitem key={note._id} handleDelete={handleDelete} note={note} />)}
                            </AnimatedContent>
                        </div>
                    </div>
                </div>
                :
                <div className="container">
                    <div className="row">
                        <Alert />
                        <div className="d-flex align-items-center justify-content-center " style={{ height: '80vh' }}>
                            <div className="d-flex justify-content-center flex-column">
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
                                    delay={0.3}>
                                    <h2 className='border-bottom border-2 border-primary text-warning text-center fw-bolder p-3'>No Notes</h2>
                                </AnimatedContent>
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
                                    delay={0.3}>
                                    <NavLink to="/addnote" className='btn btn-warning mt-2' >Start to add notes</NavLink>
                                </AnimatedContent>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Notes
