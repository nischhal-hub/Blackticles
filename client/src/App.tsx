import { useState } from 'react'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import SharedLayout from './components/SharedLayout'
import Home from './components/Home'
import SingleBlog from './components/SingleBlog'
import Postblog from './components/Postblog'
import Search from './components/Search'
function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<SharedLayout />}>
        <Route path='/' element={<Home />}/>
        <Route path='/blog' element={<SingleBlog />}/>
        <Route path='/create' element={<Postblog/>}/>
        <Route path='/search/:query' element={<Search />}/>
        <Route path='/search' element={<Search />}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
