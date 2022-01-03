import { IsNotEmpty, IsString } from "class-validator";

export class UpdateProductDTO {

    constructor({category,status}:{category:string,status:string}){
      this.category = category;
      this.status = status;
    }

    @IsNotEmpty()
    @IsString()
    category:string
    
    @IsNotEmpty()
    @IsString()
    status:string
  
  }
  
  
  export class CreateProductDTO extends UpdateProductDTO {
  
    constructor({category,status,title,description,price}:{category:string,status:string,title:string,description:string,price:number}) {
     super({category,status})
     this.description = description
     this.title = title
     this.price = price
    }
    @IsNotEmpty()
    title: string
    @IsNotEmpty()
    description: string
    @IsNotEmpty()
    price: number

  
  }
  
  
  