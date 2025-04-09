import Navbar from '@/components/Navbar'
import React from 'react'
import { Outlet } from 'react-router'

function MainLayout() {
  return (
    <>
      <Navbar/>
      <div>
        {<Outlet/>}
      </div>
    </>
  )
}

export default MainLayout