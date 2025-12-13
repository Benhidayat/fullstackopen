
const Notification = ({ message }) => {
    if (message === null) return null;
    
    return (
        <div>
            <div className="error">
                {message}
            </div>
        </div>
    )
};

export default Notification;
