import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './index.css'
import './App.css'
import LandingPage  from './pages/landingPage'
import LearningHub from './pages/LearningHub'
import Flashcard from './pages/FlashCard'
import { SignIn } from './pages/Signin'
import { SignUp } from './pages/Signup'
import Quiz from './pages/quiz'
import StartLearning from './pages/StartLearning'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />  
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/signin' element={<SignIn />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/landingpage' element={<LandingPage />}></Route>
          <Route path='/learn' element={<LearningHub />}></Route>
          <Route path='/learn/flashcard' element={<Flashcard />}></Route>
          <Route path='/learn/quiz' element={<Quiz />}></Route>         
          <Route path="/learn/videos" element={<StartLearning />} />
          <Route path="/learn/videos/:videoId" element={<StartLearning />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
