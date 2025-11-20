import React from 'react'

const Notification = ({ message, selector }) => {
    if (message === null) {
        return null;
    }

    return (
        <div className={selector ? 'red-msg' : 'green-msg'}>
            {message}
        </div>
    )
};

export default Notification;
