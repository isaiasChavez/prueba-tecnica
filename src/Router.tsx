import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import Landing from "./views/Landing";
import Login from "./views/Login";
import NewPublication from "./views/NewPublication";
import Profile from "./views/Profile";
import ProtectedComponent from "./views/ProtectedRoute";
import Publication from "./views/Publication";
import Register from "./views/Register";
import Store from "./views/Store";



export const ROUTES ={
  root:'/',
  login:'/login',
  profile:'/profile',
  register:'/register',
  newPublication:'/newpublication',
  editPublication:'/edit',
  publication:'/publication',
  store:'/store',
}

interface RouterProps {
    
}
 
const Routering: React.FC<RouterProps> = () => {
    return (  
        <BrowserRouter>
        <Routes>
          <Route path={ROUTES.root} element={<ProtectedComponent Component={Landing} />} key={1}/>


          <Route path={ROUTES.login} element={<ProtectedComponent Component={Login} /> } key={2}/>

          <Route path={ROUTES.register} element={<Register />} key={3}/>

          <Route path={ROUTES.store} element={<Store />} key={4}/>

          <Route path={ROUTES.profile} element={<ProtectedComponent Component={Profile} />} key={5}/>
          <Route path={ROUTES.newPublication} element={<ProtectedComponent Component={NewPublication} />} key={9}/>
          <Route path={`${ROUTES.editPublication}/:uuid`} element={<ProtectedComponent Component={NewPublication} />} key={23}/>

          <Route path={`${ROUTES.publication}/:uuid`} element={<Publication  />} key={6}/>
          
        
        </Routes>
      </BrowserRouter>
    );
}
 
export default Routering;