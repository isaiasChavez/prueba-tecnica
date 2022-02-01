import { Modal, Button, Typography, Space, message, Switch, Tooltip, List, Skeleton, Avatar } from "antd";
import { useContext, useState } from "react";
import { ImageProfile } from "../../views/Profile";
import { Form, Input, Select, Checkbox } from "antd";
import UserContext from "../../context/user/user.context";
import { UpdateUserDTO } from "../../context/user/user.dto";

interface EditUserModalProps {
  visible: any;
  setVisible: any;
}
const { Option } = Select;

const EditUserModal: React.FC<EditUserModalProps> = ({
  visible,
  setVisible,
}) => {
  const { user,updateUser } = useContext(UserContext);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    try {
      setConfirmLoading(true);
      const l = await form.validateFields();
      setConfirmLoading(false);

      form.submit();
    } catch (error) {
      setConfirmLoading(false);
      console.log({ error });
    }
  };
  const [form] = Form.useForm();

  const handleCancel = async () => {
    const l = form.resetFields();
    setVisible(false);
  };

  const onFinish = async values => {
    console.log({ values });
    const dto = new UpdateUserDTO({
      name: values.name,
      instagram: values.instagram,
      phonenumber: values.phonenumber,
      telegram: values.telegram,
      
    });
    await updateUser(dto)


  };
  return (
    <Modal
      title={<Typography.Text >Editar usuario</Typography.Text>}
      width='90vw'
      visible={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <div className='w-full flex '>
        <div className='w-3/12   flex justify-center align-center  '>
          <Space direction='vertical'>
            <ImageProfile image='https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp' />
            <Button className='w-full' type='dashed' size='large'>
              Subir nueva imagen
            </Button>
          </Space>
        </div>
        <div className='w-4/12   h-full  flex  px-16'>
          <Form
            className='w-full'
            form={form}
            name='basic'
            onFinish={onFinish}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            /* onFinish={onFinish}
            onFinishFailed={onFinishFailed} */
            autoComplete='off'
            layout='vertical'
          >
            <Form.Item
              validateFirst={true}
              initialValue={user.name}
              name='name'
              label='Name'
              rules={[
                { required: true, message: "Por favor ingrese un valor" },
                { min: 3, message: "Minimo 3 caracteres" },
              ]}
            >
                <Input />
                
            </Form.Item>

            <Form.Item
              name='instagram'
              initialValue={user.instagram}
              label='Instagram'
              rules={[
                { required: true, message: "Por favor ingrese un valor" },
                { min: 3, message: "Minimo 3 caracteres" },
              ]}
            >
              <Input />
               
            </Form.Item>
            <Form.Item
              name='telegram'
              initialValue={user.telegram}
              label='Telegram'
              rules={[
                { required: true, message: "Por favor ingrese un valor" },
                { min: 3, message: "Minimo 3 caracteres" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name='phonenumber'
              initialValue={user.phonenumber}
              label='Phone Number'
              rules={[
                { required: true, message: "Por favor ingrese un valor" },
                { min: 3, message: "Minimo 3 caracteres" },
                {
                  min: 10,
                  max: 10,
                  pattern: /^[2-9]{2}[0-9]{8}$/,
                  message: "Debe ser un número de 10 dígitos",
                },
              ]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Form>
        </div>
        <div className="w-2/12 ">
          <Typography.Title level={4}>
              Cambiar privacidad
          </Typography.Title>
          <Typography.Paragraph>
              Desactiva en caso de no querer mostrar tus redes sociales en cada publicación 
          </Typography.Paragraph>
        <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={[
          {
          name:"Instagram",
        },
        {
          name:"Telegram",
        },
      ]}
        renderItem={item => (
          <List.Item
            actions={[<Switch defaultChecked  />,]}
          >
            <Skeleton avatar title={false} loading={false} active>
              <List.Item.Meta
                description={item.name}
              />
            </Skeleton>
          </List.Item>
           )}
           />
        </div>
      </div>
    </Modal>
  );
};

export default EditUserModal;
