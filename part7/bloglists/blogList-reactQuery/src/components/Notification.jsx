import { useContext } from "react";
import MessageContext from "../context/MessageContext";

const Notification = () => {
    const { notification } = useContext(MessageContext);
    
    if (notification.message === null ) return null;
    return (
        <div className={ notification.type === 'error' ? 'red-msg' : 'green-msg'}>
            {notification.message}
        </div>
    )
}

export default Notification;
