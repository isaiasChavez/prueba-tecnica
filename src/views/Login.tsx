import { Alert, Card, Space } from "antd";
import { Form, Input, Button } from "antd";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderCustom from "../components/Header";
import SesionContext, { LoginDTO } from "../context/sesion/sesion.context";
import { ROUTES } from "../Router";
import { HTTPResponses } from "../types";
import { IMG } from "../utils/assets";

export interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const navigate = useNavigate();

  const { login,loadingLogin } = useContext(SesionContext);
  const [errors, seterrors] = useState({
    email:false,
    password:false
  })
  const [errorMessage, seterrorMessage] = useState<string|null>(null)
 
  const onFinish = async (values: { email: string; password: string }) => {
    
    let DTO: LoginDTO = new LoginDTO({
      email: values.email.trim().toLowerCase(),
      password: values.password.trim(),
    });
    const {code,message} = await login(DTO)
    console.log({code,message});
    seterrorMessage(null)
    if (code===HTTPResponses.Ok) {
      navigate(ROUTES.profile, { replace: true });

      seterrors({
        email:false,
        password:false
      })       

    }else{
      seterrorMessage(message)
      if (code===HTTPResponses.BadRequest) {
        seterrors({
          email:true,
          password:true
        })
      }
      if (code===HTTPResponses.NotFound) {
        seterrors({
          email:true,
          password:false
        })
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
  };
  return (
    <>
      <HeaderCustom />
      <div
        style={{
          backgroundImage: `url(${IMG.alumno1})`,
          backgroundSize:"cover",
          backgroundOrigin:'center',
          backgroundPosition:"center"
        }}
        className=" h-screen w-screen max-h-screen flex  justify-center align-center "
      >
        <Card className="w-3/12 shadow-lg">
          <Form
          
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onChange={()=>{}}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
            onValuesChange={()=>{
              seterrors({
                email:false,
                password:false
              })      
              seterrorMessage(null)



            }}
          >
            <Form.Item
              wrapperCol={{ span: 24 }}
              label="E-mail"
              validateStatus={errors.email? "error" : 'validating'}
              name="email"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa un email",
                },
                {
                  pattern:
                    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
                  message: "Por favor ingresa un email válido",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              wrapperCol={{ span: 24 }}
              label="Contraseña"
              validateStatus={errors.email?"error":'validating'}
              name="password"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa un password",
                },
              ]}
              >
              <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4, span: 18 }}>
              <Button loading={loadingLogin} className="w-full" type="primary" htmlType="submit">
                Ingresar
              </Button>
            </Form.Item>

  <div className=" text-center  w-full">

  ¿No tienes una cuenta? <Link to={ROUTES.register}>Regístrate</Link>
  </div>
            {errorMessage&&<Alert message={errorMessage} type="error" />}


          </Form>
        </Card>
      </div>
    </>
  );
};

export interface HeaderLandingProps {}

export default Login;
