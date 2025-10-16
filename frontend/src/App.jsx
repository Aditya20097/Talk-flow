import React from 'react'
import { Route,Routes } from 'react-router'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/HomePage'
import OnBoarding from './pages/OnBoarding'
import NotificationPage from './pages/NotificationPage'
import ChatPage from './pages/ChatPage'
import CallPage from './pages/CallPage'
import  {Toaster} from 'react-hot-toast'
const App = () => {
  return (
    <div className=' h-screen' data-theme="night">
     <Routes>
      <Route path='/' element ={< HomePage/>}/>
        <Route path='/signup' element ={<SignUpPage/>}/>
        <Route path='/login' element ={<LoginPage/>}/>
        <Route path='/onboarding' element ={<OnBoarding/>}/>
        <Route path='/notification' element ={<NotificationPage/>}/>
        <Route path='/chat' element ={<ChatPage/>}/>
        <Route path='/call' element ={<CallPage/>}/>
     </Routes>
     <Toaster/>
   </div>
  )
}

export default App