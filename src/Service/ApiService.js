import {toast, } from "react-toastify";

const API_URL ='http://localhost:3000/'
const successMessage = (message) => {
  return new Promise((resolve) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 1000,
      onClose: () => {
        resolve(); 
      }
    });
  });
};

const errorMessage = (message) => {
  return new Promise((resolve) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 2000,
      onClose: () => {
        resolve(); 
      }
    });
  });
};
const Api_Service = {
    get: async (endpoint) => {
      const url =`${API_URL}${endpoint}`
      console.log("url",url);

        const requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
    
        try {
          const response = await fetch(url, requestOptions);
          const data = await response.json();
          console.log('APi response',data);
          if (!response.ok) {
              throw new Error( data?.message || 'Somenthing Went Wrong');
            }
          return await data;
        } catch (error) {
          console.error('Fetch error:', error);
          throw error;
        }
      },


      authpost: async (endpoint,data) => {
        const url = `${API_URL}${endpoint}`;
        
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
         
        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(data),
          redirect: "follow"
        };
        try {
          const response = await fetch(url, requestOptions);
          const data = await response.json();
          console.log("Api response",data);
          if (!response.ok) {
              throw new Error(data?.message ||'Somenthing Went Wrong');
            }
          const result = data;
          await successMessage(result.message || 'Operation successful');
          return result;
        } catch (error) {
          console.error('Fetch error:', error);
          await errorMessage(error.message || 'Something Went Wrong');
          throw error;
        }
      },


      update: async (endpoint, data,) => {
        const url = `${API_URL}${endpoint}`;
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: JSON.stringify(data),
          redirect: "follow"
        };
        try {
          const response = await fetch(url, requestOptions);
          const data = await response.json();
          console.log("Api response",data);
          if (!response.ok) {
              throw new Error(data?.message || 'Somenthing Went Wrong');
            }
          const result = data;
          await successMessage(result.message || 'Operation successful');
          return result;
        } catch (error) {
          console.error('Fetch error:', error);
          await errorMessage(error.message || 'Something Went Wrong');
          throw error;
        }
      },



      delete: async (endpoint,data) => {
        const url =  `${API_URL}${endpoint}`;
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
          method: "DELETE",
          headers: myHeaders,
          body: JSON.stringify(data),
          redirect: "follow"
        };
    
        try {
          const response = await fetch(url, requestOptions);
          const data = await response.json();
          console.log("data",data);
          if (!response.ok) {
              throw new Error(data?.message || 'Somenthing Went Wrong');
            }
          const result = data;
          await successMessage(result.message || 'Operation successful');
          return result;
        } catch (error) {
          console.error('Fetch error:', error);
          await errorMessage(error.message || 'Something Went Wrong');
          throw error;
        }
      },


}

export default Api_Service