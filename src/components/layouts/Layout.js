import Header from "./Header"
import {ThemeProvider, createGlobalStyle } from 'styled-components';
import React, { useState , createContext} from 'react';
import { lightTheme, darkTheme } from './Theme';
import { GlobalStyles } from './Global';
import { Route, Routes } from "react-router-dom"
import Campaigns from "./pages/Campaigns"
import Create_campaign from "./pages/Create_campaign"
import Dashboard from "./pages/Dashboard"
import { ToastContainer, toast } from 'react-toastify';
import Mydonate from "./pages/Mydonate";

const App = createContext();
const Layout = () => {


  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }
  
  // Return the layout based on the current theme
  return (
    <App.Provider value={{toggleTheme,theme}}>
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
      <ToastContainer />
        <GlobalStyles />
        <Header />
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/create_campaigons" element={<Create_campaign/>}/>
        <Route path="/campaigons" element={<Campaigns/>}/>
        <Route path="/gotocampaign" element={<Mydonate/>}/>
       
      </Routes>  
      </>
    </ThemeProvider >
    </App.Provider>
  );
}


export default Layout;
export {App};
