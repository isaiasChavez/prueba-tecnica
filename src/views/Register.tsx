import { Card, DatePicker, message, PageHeader } from "antd";
import { Form, Input, Select, Button, Checkbox } from "antd";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../src/context/user/user.context";
import { HTTPResponses } from "../types";

import HeaderCustom from "../components/Header";
import { CreateUserDTO } from "../context/user/user.dto";
import { ROUTES } from "../Router";
import { IMG } from "../utils/assets";
import { verifyEmail } from "../utils/utils";

export interface RegisterProps {}
const { Option } = Select;

const Register: React.FC<RegisterProps> = () => {
  const { loading,createUser } = useContext(UserContext);
  const navigate = useNavigate();


  const male = "male"
  const female = "female"

  const onFinish =async (values: any) => {
    values.birthday = values.birthday.format('L')
    values.phonenumber = parseInt(values.phonenumber)
    values.gender = values.gender === male ? true:false
    
    const dto = new CreateUserDTO(values)

    console.log({dto})
    
    const response = await createUser(dto)
    if (response.status===HTTPResponses.Ok||response.status===HTTPResponses.OkCreated) {
      message.success("Usuario creado correctamente")
      navigate(ROUTES.login, { replace: true });
    }
    

  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${IMG.fondo1})`,
        }}
        className=" relative h-screen w-screen max-h-screen flex  justify-end align-center "
      >
           <PageHeader
    className="site-page-header"
    onBack={() => null}
    title="Title"
    subTitle="This is a subtitle"
  />,
        <Card className="w-3/12 shadow-lg h-full">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              name="name"
              label="Nombre"
              rules={[
               {
                 required:true,
                  message: "Ingrese un nombre"
               }
            ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="lastname"
              label="Apellidos"
              rules={[
               {
                 required:true,
                  message: "Ingrese sus apellidos"
               }
            ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ 
                type: "email",
                message: "Ingrese un email válido",
               },
               {
                 required:true,
                  message: "Ingrese un email"
               }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="nickname"
              label="Nickname"
              tooltip="¿Cómo quieres que los demás te vean?"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa un nickname",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="birthday"
              label="Fecha de nacimiento"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa un nickname",
                },
              ]}
            >
            <DatePicker showToday={false} />
            </Form.Item>

            <Form.Item
              name="phonenumber"
              label="Número de teléfono"
              rules={[
                { required: true, message: "Por favor ingrese su número de teléfono" },
                {
                  len:10,
                  message: "Número de 10 dígitos"
                }
              ]}
            >
              <Input  style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              name="gender"
              label="Género"
              
              rules={[{ required: true, message: "Por favor seleccione un género" }]}
            >
              <Select placeholder="Selecciona">
                <Option value={male}>Hombre</Option>
                <Option value={female}>Mujer</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="password"
              label="Contraseña"
              rules={[
                {
                  required: true,
                  message: "¡Por favor ingresa una contraseña!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirma tu contraseña"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Por favor confirma tu contraseña",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "¡Las contraseñas no coinciden!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{  span: 24 }}>
              <Button loading={loading} className="w-full" type="primary" htmlType="submit">
                Registrarme
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};

export interface HeaderLandingProps {}

export default Register;
