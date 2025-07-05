import React from 'react'
import BlurText from "./Animation/BlurText";
import SplitText from "./Animation/SplitText";
const About = () => {
    return (
        <>
            {localStorage.getItem('token') &&
                <div className="container mt-5" id="aboutPage" style={{ minHeight: "90vh" }}>
                    <div className="row  d-flex flex-lg-row justify-content-center flex-column-reverse  border-bottom border-warning p-4 pb-5 mb-5">
                        <h2 className="text-warning fw-bolder text-center">
                            My Notebook
                        </h2>
                        <div className="col-md-8 mt-5 mb-3">
                            <BlurText
                                text={` Welcome to iNoteBook - Your Smart Digital Notebook iNoteBook is a modern, fast, and secure notebook web application designed to help you capture your thoughts, ideas, tasks, and inspirations—anytime, anywhere. Built with the power of the MERN stack (MongoDB, Express.js, React, Node.js), our app ensures a seamless and responsive experience across all your devices.`}
                                delay={150}
                                animateBy="words"
                                direction="top"
                                className="mb-5 mt-3 p-3 text-warning fw-bold"
                            />
                        </div>
                        <div className="col-md-4 mt-5 d-flex justify-content-center mb-3">
                            <img
                                src={"./iNotebook.svg"}
                                alt="coding illustration"
                                className="d-block img-fluid"
                                width="250" height="200"
                            />
                        </div>
                    </div>
                    <div className="row  d-flex flex-lg-row justify-content-center border-bottom border-warning p-4 pb-5">
                        <h2 className="text-warning fw-bolder text-center m-5">
                            Why We Built This
                        </h2>
                        <p className='text-warning fw-bold'>In a world full of distractions, we believe that organizing your thoughts should be effortless. Whether you're a student, professional, writer, or thinker, having a place to store and manage your notes is essential. That’s why we created NoteNest—a clutter-free space focused on simplicity, privacy, and speed."
                            className="font-bold text-center text-warning</p>

                    </div>
                    <div className="row  d-flex flex-lg-row justify-content-center p-4 pb-5">
                        <h2 className="text-warning fw-bolder text-center m-5">Our Goal</h2>
                        <p className='text-warning fw-bold'>Our goal is to empower individuals with a clean, distraction-free digital notebook that makes organization simple and enjoyable. We're constantly improving, listening to user feedback, and adding features that make note-taking smarter.</p>

                    </div>
                </div>
            }
        </>
    )
}

export default About