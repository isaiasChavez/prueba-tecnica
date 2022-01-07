import { IsNotEmpty, IsString, IsUppercase, IsUUID } from "class-validator";

  type CreateProductDTOType = {category:string,status:string,title:string,description:string,price:number}
  
  export class CreateProductDTO  {
    constructor(data:CreateProductDTOType){
      this.category = data.category;
      this.status = data.status;
      this.description = data.description
      this.title = data.title
      this.price = data.price * 1
    }
  
    @IsNotEmpty()
    title: string
    @IsNotEmpty()
    description: string
    @IsNotEmpty()
    price: number

    @IsNotEmpty()
    @IsString()
    category:string
    
    @IsNotEmpty()
    @IsString()
    status:string
  }


  export class UpdateProductDTO extends CreateProductDTO{

      constructor(data:CreateProductDTOType,uuid:string){
        super(data)
        this.uuid=uuid
      }

      @IsUUID()
      @IsNotEmpty()
      uuid:string
  }

  
  
  
  
  