import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Home} from "./Home.tsx";
import {MainLoginPage} from "./mainLoginPage.tsx";
import {CookiesProvider} from "react-cookie";
import {Header} from "./Header.tsx"
import {IsLoggedIn} from "./UserContext.tsx";
import {useState} from "react";
import {UserProfile} from "./userProfile.tsx";

export default function App(){
    const [isLoggedIn,setIsLoggedIn] = useState(false);
  return(
      <BrowserRouter>
          <IsLoggedIn.Provider value={{isLoggedIn,setIsLoggedIn}}>
              <CookiesProvider>
                  <Header/>
                  <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/mainLoginPage" element={<MainLoginPage/> } />
                    <Route path="/profile/:username" element={<UserProfile/> } />
                 </Routes>
              </CookiesProvider>
          </IsLoggedIn.Provider>
      </BrowserRouter>

  )

    }