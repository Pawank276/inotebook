import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { noteActions } from '../store/notes';
import { alertActions } from '../store/alert';
import Alert from '../components/Alert'
import AnimatedContent from '../components/Animation/AnimatedContent'

const host = "http://localhost:5000"
const Editform = () => {
    const [updated, setUpdated] = useState(false)
    const location = useLocation();
    const { id } = location.state;
    const dispatch = useDispatch();
    const etitle = useRef("");
    const edescription = useRef("");
    const etag = useRef("");
    const noteId = useRef("");
    const ref = useRef();
    const navigate = useNavigate()
    if (!localStorage.getItem('token')) {
        navigate("/")
    } else {
        const fetchNote = async () => {
            const response = await fetch(`${host}/api/notes/fetchnote/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                }
            });
            const json = await response.json();
            etitle.current.value = json.title;
            edescription.current.value = json.description;
            etag.current.value = json.tag;
            noteId.current.value = json._id;
        }
        useEffect(() => {
            fetchNote();
        }, []);


        useEffect(() => {
            if (updated) {
                setTimeout(() => {
                    dispatch(alertActions.clearAlert());
                }, 2000)
            }
            setUpdated(false);
        }, [updated]);

    }
    return (
        <>{localStorage.getItem('token') &&
            <><div className=" d-flex justify-content-start ">
                <Alert handleClose={() => {
                    ref.current.click();
                    dispatch(alertActions.clearAlert());
                }} />
                <button ref={ref} className='btn-close float-end d-none'></button>
            </div><div className="container" style={{ minHeight: "100vh" }}>
                    <div className="row d-flex justify-content-center">
                        <div className="col-12  d-flex flex-column ">
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
                                <h3 className='border-bottom border-2 border-primary text-warning text-center fw-bolder p-3'>Edit Note </h3>
                            </AnimatedContent>

                        </div>
                        <div className="col-md-6 my-3">
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
                                delay={0.3}
                            >
                                <form>
                                    <input type="text" ref={noteId} className="form-control d-none" />
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputTitle" className="form-label text-warning fw-bolder">Title</label>
                                        <input type="text" ref={etitle} className="form-control" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputDesc" className="form-label text-warning fw-bolder">Description</label>
                                        <textarea type="text" ref={edescription} name='description' className="form-control" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputTag" className="form-label text-warning fw-bolder">Tag</label>
                                        <input type="text" ref={etag} name='tag' className="form-control" id="exampleInputTag" />
                                    </div>
                                    <Link to='/home' className="btn btn-danger me-3">Cancle</Link>
                                    <button type="submit" onClick={(e) => {
                                        e.preventDefault();
                                        if (confirm("are you sure you want to save these details?")) {
                                            const titleVal = etitle.current.value;
                                            const descriptionVal = edescription.current.value;
                                            const tagVal = etag.current.value;
                                            const id = noteId.current.value;
                                            if (descriptionVal.length > 1 && titleVal.length > 1) {
                                                dispatch(noteActions.editnote({ id: id, title: titleVal, description: descriptionVal, tag: tagVal }));
                                                navigate('/home');
                                                dispatch(alertActions.showAlert({
                                                    message: "Note updated successfully",
                                                    type: "success"
                                                }))
                                            } else {
                                                setUpdated(true)
                                                dispatch(alertActions.showAlert({
                                                    message: "fill something in all the inputs!",
                                                    type: "danger"
                                                }))
                                            }
                                        }
                                    }} className="btn btn-primary">Update</button>
                                </form>
                            </AnimatedContent>
                        </div>
                    </div>
                </div></>
        }
        </>
    )
}

export default Editform
