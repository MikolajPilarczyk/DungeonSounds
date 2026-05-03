import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Home} from "./Home.tsx";
import {MainLoginPage} from "./mainLoginPage.tsx";
import {CookiesProvider} from "react-cookie";
import {Header} from "./Header.tsx"
import {IsLoggedIn} from "./UserContext.tsx";
import {useState} from "react";
import {UserProfile} from "./userProfile.tsx";
import {EditProfile} from "./EditProfile.tsx";
import {PageNotFound} from "./page404.tsx";
import {AddMaterial} from "./components/AddMaterial.tsx";
import PlaylistSets from "./components/PlaylistView.tsx";


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
                      <Route path="/edycja-profilu" element={<EditProfile/> } />
                      <Route path="/dodaj-wpis" element={<AddMaterial/> } />
                      <Route path="/grymuar/:id" element={<PlaylistSets/> } />
                      <Route path="*" element={<PageNotFound/> } />


                 </Routes>
              </CookiesProvider>
          </IsLoggedIn.Provider>
      </BrowserRouter>

  )

    }