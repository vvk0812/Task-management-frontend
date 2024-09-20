import React from 'react';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Loader from './components/Loader/Loader';
function App() {

  const Home = React.lazy(()=>import("./components/Pages/Dashboard/Homepage/Home"));
  const Task = React.lazy(()=>import("./components/Pages/Dashboard/Task/Task"));
  const CreateTask = React.lazy(()=>import("./components/Pages/Dashboard/CreateTask/CreateTask"));
  const EditTask = React.lazy(()=>import("./components/Pages/Dashboard/EditTask/EditTask"));
  return (
    <div className="App">
      <BrowserRouter>
      <React.Suspense fallback={<Loader/>}>
       <Routes>
        <Route element={<Layout/>}>
         <Route index path='/' element={<Home/>}/>
         <Route path='/Task' element={<Task/>}/>
         <Route path='/CreateTask' element={<CreateTask/>}/>
         <Route path='/EditTask' element={<EditTask/>}/>
        </Route>
       </Routes>
       </React.Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
