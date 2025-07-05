
import { useSelector } from 'react-redux';
const Alert = ({ handleClose }) => {
    const { message, type } = useSelector(state => state.alert);
    return (
        <>
            {message && (
                <div className={`col-md-3 alert alert-${type} position-fixed ms-lg-5 z-1`} role="alert">
                    <div className=''>
                        <strong className='fs-6'>{type === 'danger' ? 'Error' : 'success'} : </strong>
                        <strong >{message}</strong>
                        <button className='btn-close float-end' onClick={handleClose}></button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Alert
