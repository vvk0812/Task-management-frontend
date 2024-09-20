import React,{useState} from "react";
import "./Createtask.css"
import Api_Service from "../../../../Service/ApiService";
import {ToastContainer} from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function CreateTask() {
   const [title,setTitle]=useState('');
   const [description,setDescription]=useState('');
   const [errors, setErrors] = useState({});
   const [loader,setloader]=useState(null);
   const navigate = useNavigate();
   const validateForm = () => {
    let formErrors = {};
    if (!title) formErrors.title = 'Title is required';
    if (!description) formErrors.description = 'Description is required';
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

 
   const createTask = async(e)=> {
    e.preventDefault();
    if (validateForm()) {
     try {
      setloader(true);
      const data = {
        'Title' : title,
        'Description':description
      }

      const result = await Api_Service.authpost("createTask",data);
        navigate("/Task")
     } catch (error) {
      console.log(error);
     } finally {
      setloader(false);
     }
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
          {errors.title && <span  className="errormessage">{errors.title}</span>}
     </div>

     <div className="input-feild">
        <input type="text" placeholder="Description"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
        />
        {errors.description && (
          <span className="errormessage">{errors.description}</span>
        )}
     </div>

     <div className="submit-wrapper">
     <button className="submit"
      onClick={(e)=>createTask(e)}
      disabled={loader}
      >
        {loader ? 'Creating...' : 'Create Task'}
      </button>
     </div>
    </div>
    )
}