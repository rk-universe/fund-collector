import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element:<Dashboard/> ,
//   },
//   {
//     path: "/campaigons",
//     element:<Campaigns/> ,
//   },
//   {
//     path: "/create_campaigons",
//     element:<Create_campaign/> ,
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );


reportWebVitals();
