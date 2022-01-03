import { useReducer } from "react";
import NotificationContext from "./notifications.context";
import NotificationReducer, { NotificationStateType } from "./notifications.reducer";
import {TypesNotification} from '../../types'
const NotificationState = ({ children }) => {
  const [state, dispatch] = useReducer(NotificationReducer, initialState());

  const sendAlert = async ({msg,type,stop}: {msg:string,type:TypesNotification,stop:boolean}) => {
    try {
        if (type===TypesNotification.success) {
          
            return 
        }
        if (type===TypesNotification.error) {
          
            return 
        }
       
        if (type===TypesNotification.warning) {
         
            return 
        }
       
        
    

    } catch (error) {
      console.error({ error });
    }
  };


 
 

  return (
    <NotificationContext.Provider
      value={{
        sendAlert,
        ...state,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

const initialState = () => {
  let state: NotificationStateType = {
    
  };  
  return state;
};

export default NotificationState;
