
class Configuration{

    baseURL:string = 'http://localhost:5000/'
    public TOKEN_NAME_INTERN = "bazar_utm";
    public JWT_SIGN = "ocupath";


    constructor(){
        this.baseURL =  'http://localhost:5000/'
    }

    config=()=>{    
    }   


}

export default new Configuration()