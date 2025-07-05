import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdRemoveRedEye } from "react-icons/md";
import { Link } from 'react-router-dom';
import moment from "moment";

const Noteitem = ({ note, handleDelete }) => {
    const tags = note.tag;
    let tagsArr = tags.split(" ");
    function titleCase(str) {
        return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
    }
    if (tagsArr[0] === '') {
        tagsArr[0] = 'general';
    }
    const tagsArr2 = tagsArr.filter(word => word.trim().length > 0);
    return (
        <>
            <div className="col-lg-4 col-md-6 mb-3">
                <div className="card" style={{ backgroundColor: 'rgb(9, 39, 58)' }}>
                    <div className="card-body rounded-5">

                        <div className="d-flex align-items-center justify-content-center mb-3">
                            <h5 className="card-title text-warning fw-bolder text-truncate" style={{ fontSize: 18 }}>{titleCase(note.title)}</h5>
                            <strong onClick={() => handleDelete(note._id)} className='text-danger me-2 ms-auto icon'><MdDelete /></strong>
                            <Link to={'/editnote'} state={{ id: note._id }} className='text-success icon me-2' ><FaEdit /></Link>
                            <Link to={'/fetchnote'} state={{ id: note._id }} className='text-white icon'><MdRemoveRedEye /></Link>
                        </div>
                        <div className="mt-3">
                            <p className="card-text text-white fw-bold p-2 border border-1 text-truncate">{note.description}</p>
                        </div>
                    </div>
                    <div className="card-footer mt-5 d-flex flex-column">
                        {tagsArr2.map((tag, i) => <span key={tagsArr2[i]} className="text-white fw-bold">
                            {`#${tag}`}</span>)}
                        <span className="text-secondary" style={{ fontSize: "14" }}>Created {moment(note.date).fromNow()}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Noteitem