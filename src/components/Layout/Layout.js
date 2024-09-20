import React from "react";
import { Outlet } from 'react-router-dom'
import './Layout.css'
import Navbar from "../Navbar/Navbar";
export default function Layout() {
   return (
    <div className="layout">
      <div className="layout-navbar">
        <Navbar/>
      </div>
      <div className="layout-outlet">
        <Outlet/>
      </div>
    </div>
   )
}