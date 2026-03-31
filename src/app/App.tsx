import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Home} from "./Home.tsx";
import {MainLoginPage} from "./mainLoginPage.tsx";

export default  function App(){
  return(

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
            <Route path="/mainLoginPage" element={<MainLoginPage/>} />

        </Routes>
      </BrowserRouter>
  )
}