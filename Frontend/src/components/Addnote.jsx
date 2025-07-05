import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import { noteActions } from '../store/notes';
import { alertActions } from '../store/alert';
import AnimatedContent from '../components/Animation/AnimatedContent'

const Addnote = () => {
    const dispatch = useDispatch();
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const navigate = useNavigate()
    const handleChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const { title, description, tag } = note;
            dispatch(noteActions.addnote({ title, description, tag }));
            navigate('/home');
            dispatch(alertActions.showAlert({
                message: "Note Added successfully",
                type: "success"
            }))
        } catch (error) {
            console.log(error)
            dispatch(alertActions.showAlert({
                message: "Something Wrong in filled fields",
                type: "danger"
            }))
        }

    }
    return (

        <>
            {localStorage.getItem('token') &&
                <div className="container" style={{ minHeight: "80vh" }}>
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
                                <h3 className='border-bottom border-2 border-primary text-warning text-center fw-bolder p-3'>Add Your Notes</h3>
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
                                delay={0.3}
                            >
                                <span>
                                    <NavLink to="/" className='btn btn-outline-warning ms-auto '>My Notes</NavLink>
                                </span>
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
                                <form onSubmit={handleSubmit} >
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputTitle" className="form-label text-warning fw-bolder">Title</label>
                                        <input type="text" name='title' onChange={handleChange} className="form-control" id="exampleInputTitle" minLength={3}
                                            placeholder='Title of note' required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputDesc" className="form-label text-warning fw-bolder">Description</label>
                                        <textarea type="text" name='description' onChange={handleChange} className="form-control" id="exampleInputDesc" minLength={5} placeholder='Description of note' required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputTag" className="form-label text-warning fw-bolder">Tag</label>
                                        <input type="text" name='tag' onChange={handleChange} placeholder='Related tags' className="form-control" id="exampleInputTag" />
                                    </div>
                                    <NavLink to={'/home'} className="btn btn-danger me-2">Cancel</NavLink>
                                    <button type="submit" className="btn btn-primary">Add</button>
                                </form>
                            </AnimatedContent>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Addnote