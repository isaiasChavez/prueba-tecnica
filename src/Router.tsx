import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import Landing from "./views/Landing";



export const ROUTES ={
  root:'/',
}

interface RouterProps {
    
}
 
const Routering: React.FC<RouterProps> = () => {
    return (  
        <BrowserRouter>
        <Routes>

          <Route path={`${ROUTES.root}`} element={<Landing  />} key={6}/>
          
        
        </Routes>
      </BrowserRouter>
    );
}
 
export default Routering;