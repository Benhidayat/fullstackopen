
const Notifications = ({ message, notifSelector }) => {

    if (message === null) return null;
    
    return (
        <div>
            <div className={notifSelector ? 'green-msg' : 'red-msg'}>
                {message}
            </div>
        </div>
    )
};

export default Notifications;
