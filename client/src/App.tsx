import { useState } from 'react'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import SharedLayout from './components/SharedLayout'
import Home from './components/Home'
import SingleBlog from './components/SingleBlog'
function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<SharedLayout />}>
        <Route path='/' element={<Home />}/>
        <Route path='/blog' element={<SingleBlog />}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
