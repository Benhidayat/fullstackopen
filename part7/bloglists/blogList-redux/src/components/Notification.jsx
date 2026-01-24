import { useSelector } from "react-redux";

const Notification = () => {
    const {message, type } = useSelector(state => state.notifications);
    
    if (message === null ) return null;
    return (
        <div className={ type === 'error' ? 'red-msg' : 'green-msg'}>
            {message}
        </div>
    )
}

export default Notification;
