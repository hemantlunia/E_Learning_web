import Navbar from '@/components/Navbar'
import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router'

function AdminLayout() {
  return (
    <>
        <Navbar/>
        <Sidebar/>
    </>
  )
}

export default AdminLayout