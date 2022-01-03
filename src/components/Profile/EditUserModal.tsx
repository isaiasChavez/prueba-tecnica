import { Modal, Button, Typography, Space } from "antd";
import { useState } from "react";
import { ImageProfile } from "../../views/Profile";
import { Form, Input, Select, Checkbox } from "antd";

interface EditUserModalProps {
  visible: any;
  setVisible: any;
}
const { Option } = Select;


const EditUserModal: React.FC<EditUserModalProps> = ({
  visible,
  setVisible,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const handleOk = () => {
    setModalText("The modalllll will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
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
              name={["user", "name"]}
              label="Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="instagram"
              label="Instagram"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="telegram"
              label="Telegram"
              rules={[{ required: true }]}
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
          </Form>
        </div>

      </div>
    </Modal>
  );
};

export default EditUserModal;
