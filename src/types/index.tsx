



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










 

 
