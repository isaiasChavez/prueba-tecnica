import { Spin } from "antd";
import { useContext, useEffect, useState } from "react";
import Algo, { useNavigate, useLocation } from "react-router-dom";
import Config from "../config";
import SesionContext from "../context/sesion/sesion.context";
import { ROLES_TYPES, USERS_TYPES } from "../context/sesion/sesiontypes";
import UserContext from "../context/user/user.context";
import { ROUTES } from "../Router";
import { HTTPResponses } from "../types";

const ProtectedComponent = ({ Component: Component, ...props }) => {
  
    const navigate = useNavigate();
    let location = useLocation();


    const freeRoutes = [ROUTES.root,ROUTES.login, ROUTES.register,ROUTES.root];

    const { verifyToken,isLogged,loading } = useContext(SesionContext);
    const {getUserProfile,loading:loadingUser} = useContext(UserContext)

    const isAFreeRoute = freeRoutes.includes(location.pathname);
    useEffect(() => {

      const accessToken = localStorage.getItem(Config.TOKEN_NAME_INTERN);
      
      // if no accessToken was found,then we redirect to "/" page.
      console.log({accessToken});
      if (!accessToken) {
        if (!isAFreeRoute) {
          navigate(ROUTES.root);
        }
      } else {
        
        // we call the api that verifies the token.
        const routesAdmin = [ROUTES.profile,ROUTES.root,ROUTES.store];
        const routesGuest = [ROUTES.profile,ROUTES.root,ROUTES.store];

        verifyToken(accessToken).then( async(data) => {
          const dataUser = data.data;
          if (data.status === HTTPResponses.Ok) {

            const userType = dataUser.role;

            let isAdmin = userType === ROLES_TYPES.ADMIN;
            let isUser = userType === ROLES_TYPES.USER;

            await getUserProfile(false)

            if (isAdmin) {
              if (!routesAdmin.includes(location.pathname)) {
                navigate(ROUTES.profile, { replace: true });
              } 
            }

            else if (isUser) {
              if (!routesGuest.includes(location.pathname)) {
                navigate(ROUTES.profile, { replace: true });
              } 
            }else{
              navigate(ROUTES.root, { replace: true });
            }

          } else {
            // If the token was fraud we first remove it from localStorage and then redirect to "/"
            //localStorage.removeItem(Config.TOKEN_NAME_INTERN);
            navigate(ROUTES.root, { replace: true });
          }
        });

      }
    }, []);

    if (loading|| loadingUser) {
        return(

          <div className="fixed flex justify-center align-center inset-0 ">
          <Spin  size="large"/>

        </div>
          )  
    }else if (isLogged || isAFreeRoute) {
      return <Component {...props} />;
    } else {
      return null;
    }
};

export default ProtectedComponent;
