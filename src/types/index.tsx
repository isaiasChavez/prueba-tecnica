export enum TypesNotification {
  success = "success",
  error = "error",
  warning = "warning",
}


export enum HTTPResponses {
    Ok = 200,
    OkCreated = 201,
    OkNoContent = 204,
    OkReset = 205,
    BadRequest = 400,
    Unauthorized = 401,
    NotFound = 404,
    InternalError = 500
  }

  
  

export type StatusService = {
    code: HTTPResponses,
    message:string,
    data?: any

  }
  
  export interface ServiceReponse {
    status: number
    msg: string
  }
  export interface ServerResponse extends ServiceReponse {
    data?: any
  }


class Route  {
    private readonly prefig:string = "api/";
    private name:string
    constructor(name:string){
        this.name = name+"/"
    }

    public join(route:string|null):string{
        return `${this.prefig}${this.name}${route?route:''}`
    }

}




const sesionRoute = new Route('auth')
const assetsRoute = new Route('asset')
const userRoute = new Route('user')
const statusesRoute = new Route('statusproduct')
const categoryRoute = new Route('category')
const publicationRoute = new Route('publication')
const configurationRoute = new Route('config')


const sesion = {
    login:sesionRoute.join(null),
    logout:sesionRoute.join('logout'),
    reset:sesionRoute.join('reset'),
    validate:sesionRoute.join('validate'),
}

const user = {
    confirmpass:userRoute.join(null),
    getUserLogged:userRoute.join(null),
    create:userRoute.join(null),
    user:userRoute.join(null),
    logout:userRoute.join('logout'),
    reset:userRoute.join('reset'),
}

const configuration= {
  configuration:configurationRoute.join(null)
}
const asset = {
  asset:assetsRoute.join(null),
  profile:assetsRoute.join('profile'),
}


const product = {
  create:publicationRoute.join(null),
  product:publicationRoute.join(null),
  categories:categoryRoute.join(null),
  all:publicationRoute.join("all"),
  related:publicationRoute.join("related"),
  statuses:statusesRoute.join(null),
  user:publicationRoute.join('user'),
  onepublication:publicationRoute.join(null),
}

export const URLS =   {
    sesion,
    user,
    product,
    configuration,
    asset
};






 

 
