import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { ToastContainer} from 'react-toastify';
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store} >
    <RouterProvider router={router} />
    <ToastContainer position='bottom-left' theme='colored'/>
    </Provider>
)
