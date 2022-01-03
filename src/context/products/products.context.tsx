import { createContext } from "react";
import { ServerResponse } from "../../types";
import { CreateProductDTO } from "./products.dto";
import { Category, StatusProduct,Publication } from "./productstypes";

export type ProductsStateType = {
  categories:Category[],
  statuses:StatusProduct[],
  publicationsUser:Publication[],
  publicationSelected:Publication,
}


export const initialStateProducts =():ProductsStateType=> {
  const state:ProductsStateType = {
    categories:[],
    statuses:[],
    publicationsUser:[],
    publicationSelected:{
      category:null,
      coverPage:"",
      description:"",
      isActive:false,
      price:0,
      status:null,
      title:"",
      uuid:""
    },
};
return state
}
interface ProductsContextInterface {
  loading:boolean,
  getCategories():Promise<ServerResponse>,
  getStatusesProduct():Promise<ServerResponse>,
  create(dto:CreateProductDTO): Promise<ServerResponse>,
  getPublicationsUser(): Promise<ServerResponse>,
  getPublicationData(uuid:string): Promise<ServerResponse>,
  categories:Category[],
  statuses:StatusProduct[],
  publicationsUser:Publication[],
  publicationSelected:Publication
}

const ProductsContext = createContext<ProductsContextInterface | null>(null);

export default ProductsContext;
