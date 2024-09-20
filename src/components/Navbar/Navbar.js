import React from "react";
import "./Navbar.css"
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  
  const Home =()=> {
    navigate("/")
  }
  const Task =()=> {
    navigate("/Task")
  }

 return (
    <div className="navbar">
      <div className="navbar-right">
        <span onClick={()=>Home()}>Welcome</span>
      </div>
      <div className="navbar-left">
        <span onClick={()=>Home()}>Dashboard</span>
        <span onClick={()=>Task()}>Tasks</span>
        <img width={40} height={40} src={require("../../assesets/man.png")} />
      </div>
    </div>
 ) 
}