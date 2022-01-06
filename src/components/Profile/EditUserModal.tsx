import { Modal, Button, Typography, Space, message } from "antd";
import { useContext, useState } from "react";
import { ImageProfile } from "../../views/Profile";
import { Form, Input, Select, Checkbox } from "antd";
import UserContext from "../../context/user/user.context";

interface EditUserModalProps {
  visible: any;
  setVisible: any;
}
const { Option } = Select;


const EditUserModal: React.FC<EditUserModalProps> = ({
  visible,
  setVisible,
}) => {

  const {user} = useContext(UserContext)
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const handleOk = async () => {
    try {
      
      setModalText("The modalllll will be closed after two seconds");
      setConfirmLoading(true);
      const l = await form.validateFields()
      setConfirmLoading(false);
      form.submit()
      console.log(l)
    } catch (error) {
      setConfirmLoading(false);
      console.log({error})      
    }
  };
  const [form] = Form.useForm();

  const handleCancel =async () => {
    const l = form.resetFields()
    setVisible(false);
  };

  

  return (
    <Modal
      title={<Typography.Title level={3}>Editar usuario</Typography.Title>}
      width="90vw"
      visible={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <div className="w-full flex ">
        <div className="w-3/12  h-full min-h-2/12s flex justify-center">
          <Space direction="vertical">
            <ImageProfile image="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp" />
            <Button className="w-full" type="dashed" size="large">
              Subir nueva imagen
            </Button>
          </Space>
        </div>
        <div className="w-9/12  h-full  flex  px-16">
        <Form
        form={form}
  name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            /* onFinish={onFinish}
            onFinishFailed={onFinishFailed} */
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              validateFirst={true}

              name="name"
              label="Name"
              rules={[
                { required: true,
                message:"Por favor ingrese un valor"
                },
                { min: 3, message:"Minimo 3 caracteres"},

              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="instagram"
              initialValue={user.instagram}
              
              label="Instagram"
              rules={[
                { required: true,
                message:"Por favor ingrese un valor"
                },
                { min: 3, message:"Minimo 3 caracteres"},
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="telegram"
              initialValue={user.telegram}
              label="Telegram"
              rules={[
                { required: true,
                message:"Por favor ingrese un valor"
                },
                { min: 3, message:"Minimo 3 caracteres"},
              ]}
            >
              <Input />
            </Form.Item>
           
            <Form.Item
              name="phonenumber"
              initialValue={user.phonenumber}
              label="Phone Number"
              rules={[
                { required: true,
                message:"Por favor ingrese un valor"
                },
                { min: 3, message:"Minimo 3 caracteres"},
                {
                  min:10,
                  max:10,
                  pattern:/^[2-9]{2}[0-9]{8}$/,
        message:"Debe ser un número de 10 dígitos"                  
                },

              ]}
            >
              <Input  style={{ width: "100%" }} />
            </Form.Item>
          </Form>
        </div>

      </div>
    </Modal>
  );
};

export default EditUserModal;
