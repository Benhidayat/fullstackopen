import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';
import { AuthContextProvider } from './context/AuthContext';
import { MessageContextProvider } from './context/MessageContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
            <MessageContextProvider>
                <App />
            </MessageContextProvider>
        </AuthContextProvider>
    </QueryClientProvider>
)