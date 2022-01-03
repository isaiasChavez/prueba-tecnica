import { Alert, Card, message } from "antd";
import { Form, Input, Button, Checkbox } from "antd";
import { Header } from "antd/lib/layout/layout";

import { useContext, useState } from "react";
import UserContext from "../../src/context/user/user.context";
import HeaderCustom from "../components/Header";
import SesionContext, { LoginDTO } from "../context/sesion/sesion.context";
import { HTTPResponses } from "../types";
import { IMG } from "../utils/assets";

export interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  
  const { login,loading } = useContext(SesionContext);
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
    seterrorMessage(null)
    if (code===HTTPResponses.Ok) {
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
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <HeaderCustom />
      <div
        style={{
          backgroundImage: `url(${IMG.fondo1})`,
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
          >
            <Form.Item
              wrapperCol={{ span: 24 }}
              label="email"
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
              label="Password"
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
              <Button loading={loading} className="w-full" type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
            {errorMessage&&<Alert message={errorMessage} type="error" />}


          </Form>
        </Card>
      </div>
    </>
  );
};

export interface HeaderLandingProps {}

export default Login;
