import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import About from './pages/About'
import Header from './components/Header'

function App() {

  return (
    <div>

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/sign-in' element={<Signin />}></Route>
          <Route path='/sign-up' element={<Signup />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/sign-up' element={<Signup/>}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App

