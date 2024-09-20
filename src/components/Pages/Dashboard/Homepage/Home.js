import React, { useEffect, useState } from "react";
import "./Home.css"
import Api_Service from "../../../../Service/ApiService";
export default function Home() {

  const [Completed,setCompleted]=useState('');
  const [incompleted,setincompleted]=useState('');
  useEffect(()=> {
    GetTasks();
  },[])
  const GetTasks =async()=> {
    try {
      const result = await Api_Service.get('GetAllTask');
      setCompleted(result?.completedTask);
      setincompleted(result?.Totaltask);
    } catch (error) {
      console.log(error);
    } 
  }
    return (
        <div className="home">
          <div className="home-wrapper">
            <div className="home-card-wrapper">
              <div className="homecrad-left">
              <span>Total Task</span>
              <span>{incompleted}</span>
              </div>
              <div className="homecard-right">
                <img width={40} height={40} src={require("../../../../assesets/chart-histogram.png")}/>
              </div>
            </div>

            <div className="home-card-wrapper">
              <div className="homecrad-left">
              <span>Task Completed</span>
              <span>{Completed}</span>
              </div>
              <div className="homecard-right">
               <img width={40} height={40} src={require("../../../../assesets/shield-check.png")} />
              </div>
            </div>
          </div>
        </div>
    )
}