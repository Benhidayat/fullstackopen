import { createContext, useEffect, useReducer, useRef } from "react";

const MessageContext = createContext();

const messageReducer = (state, action) => {
    switch (action.type) {
        case 'SET_MESSAGE':
            return {
                message: action.payload.message,
                type: action.payload.type
            }
        case 'CLEAR_MESSAGE': 
            return {
                message: null,
                type: null
            }
        default: 
            return state;
    }
};

export const MessageContextProvider = ({ children }) => {
    const [notification, dispatchNotification] = useReducer(messageReducer, {message: null, type: null});

    const timeOutRef = useRef();

    // clean up the timeout side effect inside notify
    useEffect(() => {
        const timeOut = timeOutRef.current;
        return () => {
            clearTimeout(timeOut);
        }
    }, []);

    const notify = (text, type = 'success', seconds = 5) => {
        dispatchNotification({
            type: 'SET_MESSAGE',
            payload: {
                message: text,
                type
            }
        });

        const timeOut = setTimeout(() => {
            dispatchNotification({ type: 'CLEAR_MESSAGE' })
        }, seconds * 1000);
        timeOutRef.current = timeOut;
    };

    return (
        <MessageContext.Provider value={{ notification, notify }}>
            {children}
        </MessageContext.Provider>
    )
};

export default MessageContext;