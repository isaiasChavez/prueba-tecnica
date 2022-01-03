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

export enum PRODUCTS_ACTIONS {
  GET_CATEGORIES = "GET_CATEGORIES",
  GET_STATUSES = "GET_STATUSES",
  CREATE_PRODUCT = "CREATE_PRODUCT",
  GET_PUBLICATIONS_USER = "GET_PUBLICATIONS_USER",
  GET_PUBLICATION_DATA = "GET_PUBLICATION_DATA",
}

//---------------Payloads-------------
export type GET_CATEGORIES_PAYLOAD = {
  categories:Category[]
};
export type GET_PUBLICATION_DATA_PAYLOAD = {
  publication:Publication
};

export type GET_STATUSES_PAYLOAD = {
  statuses:StatusProduct[]
};
export type CREATE_PRODUCT_PAYLOAD = {
};

export type GET_PUBLICATIONS_USER_PAYLOAD = {
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

export type GET_PUBLICATIONS_USER = {
  type: PRODUCTS_ACTIONS.GET_PUBLICATIONS_USER;
  payload: GET_PUBLICATIONS_USER_PAYLOAD;
};

export type GET_PUBLICATION_DATA = {
  type: PRODUCTS_ACTIONS.GET_PUBLICATION_DATA;
  payload: GET_PUBLICATION_DATA_PAYLOAD;
};


//----------------------------------

export type ACTIONS_PRODUCTS = GET_CATEGORIES | GET_STATUSES | CREATE_PRODUCT|GET_PUBLICATIONS_USER|GET_PUBLICATION_DATA
