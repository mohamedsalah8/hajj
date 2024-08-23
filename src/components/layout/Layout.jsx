import React from 'react'
import NavBar from '../nav/NavBar'
import SideBar from '../sidebar/SideBar'
import { Outlet } from 'react-router-dom'


export default function Layout() {
  return (
    <>
      <NavBar />
      <main className="content">
        <Outlet />
      </main>
      <SideBar />
    </>
  )
}
