import { User } from "../user/usertypes"
import { UpdateProductDTO } from "./products.dto"

export interface Category{
    id:number
    name:string
}
export interface StatusProduct{
  id:number
  name:string
}
export interface Publication{
  category: Category,
coverPage: string,
description: string,
status: StatusProduct,
price:number,
isActive: boolean,
uuid: string,
title: string
}

export class PublicationSelected implements Publication{

  category: Category
coverPage: string
description: string
status: StatusProduct
price:number
isActive: boolean
uuid: string
title: string
user:User
}

export enum PRODUCTS_ACTIONS {
  GET_CATEGORIES = "GET_CATEGORIES",
  GET_DASHBOARD_PRODUCTS = "GET_DASHBOARD_PRODUCTS",
  GET_RELATED_PRODUCTS = "GET_RELATED_PRODUCTS",

  GET_STATUSES = "GET_STATUSES",
  CREATE_PRODUCT = "CREATE_PRODUCT",
  UPDATE_PRODUCT = "UPDATE_PRODUCT",
  GET_PUBLICATIONS_USER = "GET_PUBLICATIONS_USER",
  GET_PUBLICATION_DATA = "GET_PUBLICATION_DATA",
  DELETE_PUBLICATION = "DELETE_PUBLICATION",
}

//---------------Payloads-------------
export type GET_CATEGORIES_PAYLOAD = {
  categories:Category[]
};
export type GET_RELATED_PRODUCTS_PAYLOAD = {
  related:Publication[]
};

export type DELETE_PUBLICATION_PAYLOAD = {
  uuid:string
};

export type GET_PUBLICATION_DATA_PAYLOAD = {
  publication:PublicationSelected
};

export type GET_STATUSES_PAYLOAD = {
  statuses:StatusProduct[]
};
export type CREATE_PRODUCT_PAYLOAD = {
};

export type UPDATE_PRODUCT_PAYLOAD = {
  publication:UpdateProductDTO
  uuid:string
};

export type GET_PUBLICATIONS_USER_PAYLOAD = {
  publications:Publication[]
};
export type GET_DASHBOARD_PRODUCTS_PAYLOAD = {
  publications:Publication[]
};




//---------------------------------
export type GET_CATEGORIES = {
  type: PRODUCTS_ACTIONS.GET_CATEGORIES;
  payload: GET_CATEGORIES_PAYLOAD;
};

export type GET_STATUSES = {
  type: PRODUCTS_ACTIONS.GET_STATUSES;
  payload: GET_STATUSES_PAYLOAD;
};

export type CREATE_PRODUCT = {
  type: PRODUCTS_ACTIONS.CREATE_PRODUCT;
  payload: CREATE_PRODUCT_PAYLOAD;
};

export type UPDATE_PRODUCT = {
  type: PRODUCTS_ACTIONS.UPDATE_PRODUCT;
  payload: UPDATE_PRODUCT_PAYLOAD;
};


export type GET_PUBLICATIONS_USER = {
  type: PRODUCTS_ACTIONS.GET_PUBLICATIONS_USER;
  payload: GET_PUBLICATIONS_USER_PAYLOAD;
};

export type GET_PUBLICATION_DATA = {
  type: PRODUCTS_ACTIONS.GET_PUBLICATION_DATA;
  payload: GET_PUBLICATION_DATA_PAYLOAD;
};

export type DELETE_PUBLICATION = {
  type: PRODUCTS_ACTIONS.DELETE_PUBLICATION;
  payload: DELETE_PUBLICATION_PAYLOAD;
};

export type GET_DASHBOARD_PRODUCTS = {
  type: PRODUCTS_ACTIONS.GET_DASHBOARD_PRODUCTS;
  payload: GET_DASHBOARD_PRODUCTS_PAYLOAD;
};

export type GET_RELATED_PRODUCTS = {
  type: PRODUCTS_ACTIONS.GET_RELATED_PRODUCTS;
  payload: GET_RELATED_PRODUCTS_PAYLOAD;
};







//----------------------------------

export type ACTIONS_PRODUCTS = GET_RELATED_PRODUCTS|GET_DASHBOARD_PRODUCTS|GET_CATEGORIES | GET_STATUSES | CREATE_PRODUCT|GET_PUBLICATIONS_USER|GET_PUBLICATION_DATA|UPDATE_PRODUCT|DELETE_PUBLICATION
