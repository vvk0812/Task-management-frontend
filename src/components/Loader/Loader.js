import React from "react";
import './Loader.css'
export default function Loader() {
    return (
        <div className="loader-conatiner">
        <div class="hourglassBackground">
        <div class="hourglassContainer">
          <div class="hourglassCurves"></div>
          <div class="hourglassCapTop"></div>
          <div class="hourglassGlassTop"></div>
          <div class="hourglassSand"></div>
          <div class="hourglassSandStream"></div>
          <div class="hourglassCapBottom"></div>
          <div class="hourglassGlass"></div>
        </div>
        </div>
      </div>
    )
}