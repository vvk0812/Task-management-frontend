import React, { useEffect, useState } from "react";
import "./Task.css"
import { useNavigate } from "react-router-dom";
import Api_Service from "../../../../Service/ApiService";
import {ToastContainer} from "react-toastify";
export default function Task() {
    
    const [loader,setloader]=useState(false);
    const [data,setData]=useState([]);
    const navigate = useNavigate();

    const createTask =()=> {
        navigate('/CreateTask');
    }

    const EditTask =(item)=> {
      if(!item?.Completed) {
        navigate("/EditTask", {
          state : item
       })
      } 
    }

    useEffect(()=> {
        GetTasks();
    },[])

    const GetTasks =async()=> {
      try {
        setloader(true);
        const result = await Api_Service.get('GetAllTask');
        setData(result?.Tasks);
      } catch (error) {
        console.log(error);
      } finally {
        setloader(false);
      }
    }

    const completeTask =async(item)=> {
      const id = item?._id
      try {
        const data = {
          'task_id' : id
        }
        const result = await Api_Service.authpost('CompleteTask',data);
        setData((prevData) =>
          prevData.map((task) =>
            task._id === id ? { ...task, Completed: true } : task
          )
        );
      } catch (error) {
        console.log(error);
      }
    }

    const Delete = async(item)=> {
      const id = item?._id
      try {
        const data ={
          'task_id': id
        }
        const result = await Api_Service.delete("DeleteTask",data);
        setData((prevData) => prevData.filter((task) => task._id !== id));
      } catch (error) {
        console.log(error);
      }
    }


    return (
        <div className="task">
           <ToastContainer/>
            <div className="task-head">
              <button className="task-head-buuton" onClick={()=>createTask()}>Create Task</button>
            </div>
            {loader ? (
              <span className="small-loader"></span>
            ) : data?.length === 0 ? (
               <div className="no-data">
                <span >No data available</span>
               </div>
            ) : (
              <>
               <div className="task-wrapper">
                {data?.map((item)=> (
                <div className="task-card">
                  <div className="task-card-head">
                    <div className="task-card-title">
                      <span>{item?.Title}</span>
                    </div>
                    <div className="task-card-icons">
                      <img className="task_icon" onClick={()=>EditTask(item)} src={require("../../../../assesets/pencil.png")}/>
                      <img className="task_icon" onClick={()=>Delete(item)} src={require("../../../../assesets/delete.png")}/>
                    </div>
                  </div>
                  <div className="task-card-footer">
                    <span>{item?.Description}</span>
                  </div>
                  <div className="task-card-status">
                    <span className="task-status"> Task Status</span>
                    {item?.Completed ? (
                      <div className="status-icon-conatiner">
                         <span>Completed</span>
                        <img className="status-icons" src={require("../../../../assesets/completed.png")}/>
                      </div>
                    ) : (
                     <div className="status-icon-conatiner">
                       <span>In-progress</span>
                       <img className="status-icons" src={require("../../../../assesets/mark.png")}/>
                     </div>
                    )}
                  </div>
                  <div className="line"></div>
                  <div className="task-togle-conatiner">
                  <div className="task-clickhere">Click here to complete task</div>
                  <div className="task-toggle"  >
                  <label>
                  <input class="toggle-checkbox" type="checkbox" checked={item?.Completed}
                    disabled={item?.Completed} onClick={()=>completeTask(item)} />
                  <div class="toggle-slot">
                    <div class="sun-icon-wrapper">
                      <div class="iconify sun-icon" data-icon="feather-sun" data-inline="false"></div>
                    </div>
                    <div class="toggle-button"></div>
                    <div class="moon-icon-wrapper">
                      <div class="iconify moon-icon" data-icon="feather-moon" data-inline="false"></div>
                    </div>
                  </div>
                </label>
                </div>

                  </div>
                </div>
             ))}
            </div>
            </>
            )}

        </div>
    )
}