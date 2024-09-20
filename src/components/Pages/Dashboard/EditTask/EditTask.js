import React,{useState} from "react";
import "../CreateTask/Createtask.css"
import { useLocation, useNavigate } from "react-router-dom";
import Api_Service from "../../../../Service/ApiService";
import {ToastContainer} from "react-toastify";
export default function CreateTask() {
  const location = useLocation();
  const prevdata = location?.state;
  const Id = prevdata?._id
  const prevTitle = prevdata?.Title;
  const prevdescription = prevdata?.Description;

   const [title,setTitle]=useState(prevTitle);
   const [description,setDescription]=useState(prevdescription);
   const [loader,setloader]=useState(null);
   const navigate = useNavigate();
   const EditTask = async(e)=> {
    e.preventDefault();
    try {
      const data = {
         'task_id': Id ,
         'Title' : title || prevTitle ,
         'Description' : description || prevdescription
      }
      setloader(true);
      const result = await Api_Service.update('UpdateTask',data);
      navigate('/Task');
    } catch (error) {
      console.log(error);
    } finally {
      setloader(false);
    }

   }


    return (
    <div className="form-container">
      <div>
        <ToastContainer/>
      </div>
     <div className="input-feild">
        <input type="text"
         placeholder="Title"
         value={title}
         onChange={(e)=>setTitle(e.target.value)}
         />
     </div>

     <div className="input-feild">
        <input type="text" placeholder="Description"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
        />
     </div>

     <div className="submit-wrapper">
     <button className="submit" onClick={(e)=>EditTask(e)}>
      {loader ? 'Editing...': 'Edit Task' }
      </button>
     </div>
    </div>
    )
}