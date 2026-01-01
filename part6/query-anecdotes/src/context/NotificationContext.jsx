import { createContext, useReducer } from "react";

const messageReducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return action.payload
        case 'REMOVE':
            return null
        default:
            return state
    }
};

const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
    const [message, messageDispatch] = useReducer(messageReducer, null);

    return (
        <NotificationContext.Provider value={{ message, messageDispatch }}>
            {children}
        </NotificationContext.Provider>
    )
};

export default NotificationContext;