import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { ContextProvider } from './Context/MyContext.jsx'
import { ThemeProvider } from './Context/ThemeContext.jsx'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <ThemeProvider>
            <ContextProvider>
                <App />
                <ToastContainer
                    position="bottom-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    closeOnClick
                    pauseOnHover
                    draggable
                    theme="colored"
                />
            </ContextProvider>
        </ThemeProvider>
    </BrowserRouter>
)
