import { Card, PageHeader } from "antd";
import { Form, Input, Select, Button, Checkbox } from "antd";

import { useContext, useState } from "react";
import UserContext from "../../src/context/user/user.context";
import HeaderCustom from "../components/Header";
import { IMG } from "../utils/assets";
import { verifyEmail } from "../utils/utils";

export interface RegisterProps {}
const { Option } = Select;

const Register: React.FC<RegisterProps> = () => {
  const [registerState, setregisterState] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const { loading } = useContext(UserContext);

  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });
  const { email, password } = registerState;

  const validateFields = () => {
    let isValid = true;
    const newErrors = {
      email: null,
      password: null,
    };

    if (!email || email.trim() === "") {
      newErrors.email = "Enter a value";
      isValid = false;
    }
    if (!password) {
      newErrors.password = "Enter a value";
    }
    if (!verifyEmail(email.trim())) {
      newErrors.email = "Enter a valid email";
      isValid = false;
    }
    if (!isValid) {
      setErrors(newErrors);
    }
    return isValid;
  };

  /*   const onSubmit = async e => {
    e.preventDefault()
    if (validateFields()) {
      let dto = new ReuestSesionDTO(
        loginState.email.trim().toLowerCase(),
        loginState.password
        )
      }
    } */
  /* 
    
  const validateResponse = res => {
    const newErrors = {
      email: null,
      password: null
    }
    if (res.status === 1) {
      newErrors.email = 'We cannot find an active account with this email'
    }
    if (res.status === 2) {
      newErrors.password = 'Invalid password'
    }
    if (res.status === 3) {
      message.info('Your subscription has expired')
    }
    setErrors(newErrors)
  }

  
   */
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const onFinish = (values: any) => {
    console.log("Success:", values);
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
              name={["user", "name"]}
              label="Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["user", "email"]}
              label="Email"
              rules={[{ type: "email" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="nickname"
              label="Nickname"
              tooltip="What do you want others to call you?"
              rules={[
                {
                  required: true,
                  message: "Please input your nickname!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input  style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: "Please select gender!" }]}
            >
              <Select placeholder="select your gender">
                <Option value="male">Hombre</Option>
                <Option value="female">Mujer</Option>
                <Option value="other">Otro</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{  span: 24 }}>
              <Button className="w-full" type="primary" htmlType="submit">
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
