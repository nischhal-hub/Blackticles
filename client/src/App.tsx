import { useState } from 'react'
import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import SharedLayout from './components/SharedLayout'
import Home from './components/Home'
import SingleBlog from './components/SingleBlog'
import Postblog from './components/Postblog'
import Search from './components/Search'
import Manage from './components/Manage'
import Editblog from './components/EditBlog'
import Error from './components/Error'
import { AnimatePresence } from 'framer-motion'
function App() {
  const location = useLocation();
  return (
    <>
      <AnimatePresence mode='wait' initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<SharedLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/blog' element={<SingleBlog />} />
            <Route path='/create' element={<Postblog />} />
            <Route path='/search/:query' element={<Search />} />
            <Route path='/search' element={<Search />} />
            <Route path='/manage' element={<Manage />} />
            <Route path='/edit' element={<Editblog />} />
            <Route path='*' element={<Error />}></Route>
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
