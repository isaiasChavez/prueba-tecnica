
class Configuration{

    baseURL:string
    public TOKEN_NAME_INTERN = "bazar_utm";
    public JWT_SIGN = "ocupath";
    public NAME_INPUT_MULTER = "upload";


    constructor(){
        //this.baseURL =  'https://bazarutm.herokuapp.com/'
        this.baseURL =  'http://localhost:5000/'
    }

    config=()=>{    
    }   


}

export default new Configuration()