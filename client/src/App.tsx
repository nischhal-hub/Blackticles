import { useState } from 'react'
import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import SharedLayout from './components/SharedLayout'
import Home from './pages/Home'
import SingleBlog from './pages/SingleBlog'
import Postblog from './pages/Postblog'
import Search from './pages/Search'
import Manage from './pages/Manage'
import Editblog from './pages/EditBlog'
import Error from './pages/Error'
import { AnimatePresence } from 'framer-motion'
function App() {
  const location = useLocation();
  return (
    <>
      <AnimatePresence mode='wait' initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<SharedLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/blog/:query' element={<SingleBlog />} />
            <Route path='/create' element={<Postblog />} />
            <Route path='/search/:query' element={<Search />} />
            <Route path='/search' element={<Search />} />
            <Route path='/manage' element={<Manage />} />
            <Route path='/edit/:query' element={<Editblog />} />
            <Route path='*' element={<Error />}></Route>
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
