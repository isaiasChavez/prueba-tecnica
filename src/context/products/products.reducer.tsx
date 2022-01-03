import { ProductsStateType } from "./products.context";
import {  ACTIONS_PRODUCTS, GET_PUBLICATIONS_USER, GET_PUBLICATIONS_USER_PAYLOAD, GET_STATUSES_PAYLOAD, PRODUCTS_ACTIONS } from "./productstypes";

const productsReducer = (
  state: ProductsStateType,
  action: ACTIONS_PRODUCTS
): ProductsStateType => {

  console.log({action})
  switch (action.type) {

    case PRODUCTS_ACTIONS.GET_CATEGORIES:
    case PRODUCTS_ACTIONS.GET_STATUSES:
      let data_1 = action.payload 
      return {
        ...state,
        ...data_1,
      };

    case PRODUCTS_ACTIONS.GET_PUBLICATIONS_USER:
    let data1 = action.payload 
      
    return {
      ...state,
      publicationsUser:data1.publications
    }
    case PRODUCTS_ACTIONS.GET_PUBLICATION_DATA:
    let data2 = action.payload 
      
    return {
      ...state,
      publicationSelected:data2.publication
    }

    default:
      return state;
  }
};
export default productsReducer;
