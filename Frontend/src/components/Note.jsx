import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import Loading from './Loading'
import moment from "moment";
import AnimatedContent from '../components/Animation/AnimatedContent'

const Note = () => {

    const host = "http://localhost:5000"
    const location = useLocation();
    const { id } = location.state;
    const [note, setNote] = useState({})
    const [fetching, setFetching] = useState(true)
    const navigate = useNavigate()
    const fetchNote = async () => {
        const response = await fetch(`${host}/api/notes/fetchnote/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const note = await response.json();
        const title = note.title.toUpperCase();
        setNote({ title: title, description: note.description, tags: note.tag, date: note.date })
        setFetching(false)
    }
    useEffect(() => {
        fetchNote();
    }, [fetching]);

    return (
        <>
            <div className="container d-flex justify-content-center" style={{ minHeight: "89vh" }}>
                {fetching && <Loading />}
                <div className="col mb-3 mt-5">
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
                        <div className="card" style={{ backgroundColor: 'rgb(9, 39, 58)' }}>
                            <div className="card-body" >
                                <div className="d-flex align-items-center justify-content-center mb-3   ">
                                    <h5 className="card-title text-warning fw-bolder" >{note.title}</h5>
                                </div>
                                <p className="card-text text-white fw-bold p-3 border ">{note.description}</p>
                            </div>
                            <div className="card-footer">
                                <div className="d-flex">
                                    {note.tag}
                                </div>
                                <div className="text-secondary fs-6">
                                    Created {moment(note.date).fromNow()}
                                </div>
                            </div>
                        </div>
                    </AnimatedContent>
                </div>
            </div>
        </>
    )
}

export default Note
