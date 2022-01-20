import { createContext } from "react";
import { ServerResponse } from "../../types";
import { CreateProductDTO, UpdateProductDTO } from "./products.dto";
import { Category, StatusProduct,Publication, PublicationSelected } from "./productstypes";

export type ProductsStateType = {
  categories:Category[],
  statuses:StatusProduct[],
  publicationsUser:Publication[],
  publicationSelected:PublicationSelected,
  publicationsDashboard:Publication[],
  publicationsRelated:Publication[],
  related:Publication[],
}


export const initialStateProducts =():ProductsStateType=> {
  const state:ProductsStateType = {
    categories:[],
    statuses:[],
    publicationsUser:[],
    publicationsDashboard:[],
    publicationsRelated:[],
    related:[],
    publicationSelected:{
      category:null,
      coverPage:"",
      description:"",
      isActive:false,
      price:0,
      status:null,
      title:"",
      uuid:"",
      user:{
        birthday:"",
        email:"",
        gender: false,
        instagram:"",
        lastname:"",
        name:"",
        phonenumber:"",
        telegram:"",
        type:""
    }
  }
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
  update(dto: UpdateProductDTO): Promise<ServerResponse>,
  deleteProduct(uuid: string): Promise<ServerResponse>
  getDashboardProducts(category:string): Promise<ServerResponse> ,
  getRelatedProducts(category:string): Promise<ServerResponse>,
  categories:Category[],
  statuses:StatusProduct[],
  publicationsUser:Publication[],
  publicationsDashboard:Publication[],
  publicationSelected:PublicationSelected,
  related:Publication[],
  publicationsRelated:Publication[]
}

const ProductsContext = createContext<ProductsContextInterface | null>(null);

export default ProductsContext;
