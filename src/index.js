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
import Call from './pages/Call';
import Video from './pages/Video';
import Register from './pages/Register';

import axios from 'axios';


function App() {

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
            <Route path='/login' element={<Login />} />            
            <Route path='/chat' element={<Chat />} />
            <Route path='/call' element={<Call />} />
            <Route path='/video' element={<Video />} />
            <Route path='/register' element={<Register />} />

            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);