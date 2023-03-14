import React from 'react';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
//import 'bootstrap/dist/css/bootstrap.min.css';

//import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Error from './pages/Error';
import Chat from './pages/Chat';

import axios from 'axios';


function App() {

  const [userRole, setUserRole] = useState(null);

  const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
/*
  useEffect(() => {
    axios.get('http://localhost:3001/verify_to_access', options)
      .then(res => {
        setUserRole(res.data.role);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
*/
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
        crossOrigin="anonymous"
      />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>

      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path='/chat' element={<Chat />} />

            {userRole === 'admin' ? (
              <>
                <Route path='/manage_actor' element={<Login />} />
                <Route path='/add_customer' element={<Login />} />
              </>
            ) : null}
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);