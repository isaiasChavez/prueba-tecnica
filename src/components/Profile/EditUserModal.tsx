import {
  Modal,
  Button,
  Typography,
  Space,
  message,
  Switch,
  Tooltip,
  List,
  Skeleton,
  Avatar,
  Upload,
} from "antd";
import { useContext, useEffect, useState } from "react";
import { ImageProfile } from "../../views/Profile";
import { Form, Input, Select, Checkbox } from "antd";
import UserContext from "../../context/user/user.context";
import {
  UpdateConfigurationUser,
  UpdateUserDTO,
} from "../../context/user/user.dto";
import { UploadOutlined } from "@ant-design/icons";
import SesionContext from "../../context/sesion/sesion.context";
import Configuration from "../../config/";
import { ROUTES } from "../../Router";
import { URLS } from "../../types";

interface EditUserModalProps {
  visible: any;
  setVisible: any;
}
const { Option } = Select;

const EditUserModal: React.FC<EditUserModalProps> = ({
  visible,
  setVisible,
}) => {
  const {
    user,
    updateUser,
    updateConfiguration,
    updateAvatar,
    configuration,
    getConfiguration,
    loadingSimple,
  } = useContext(UserContext);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [configurationState, setconfigurationState] = useState(configuration);
  const { token } = useContext(SesionContext);
  
  useEffect(() => {
    getConfiguration();
    console.log({ token });
  }, []);

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

  const onChangeConfiguration = async (checked: boolean, name: string) => {
    console.log({ configurationState });
    setconfigurationState({
      ...configurationState,
      [name]: checked,
    });
    const dto = new UpdateConfigurationUser({
      ...configuration,
      [name]: checked,
    });
    console.log("CAMBIANDO CONFIGURACION", { checked, name });
    console.log({ dto });
    await updateConfiguration(dto);
  };

  const onFinish = async values => {
    console.log({ values });
    const dto = new UpdateUserDTO({
      name: values.name,
      instagram: values.instagram,
      phonenumber: values.phonenumber,
      telegram: values.telegram,
    });
    await updateUser(dto);
  };
  const props = {
    name: Configuration.NAME_INPUT_MULTER,
    action: `${Configuration.baseURL}${URLS.asset.profile}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    onChange:updateAvatar,

  };
  return (
    <Modal
      title={<Typography.Text>Editar usuario</Typography.Text>}
      width='90vw'
      visible={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <div className='w-full flex '>
        <div className='w-3/12   flex justify-center align-center  '>
          <Space direction='vertical'>
            <ImageProfile image={user.avatar} />
            <Upload {...props}
            showUploadList={
              {
                showRemoveIcon:false
              }
            }
             >
              <Button
                icon={<UploadOutlined />}
                className='w-full'
                type='dashed'
                size='large'
              >
                Subir nueva imagen
              </Button>
            </Upload>
            ,
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
              <Input disabled />
            </Form.Item>

            <Form.Item
              name='instagram'
              initialValue={user.instagram}
              label='Instagram'
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='telegram'
              initialValue={user.telegram}
              label='Telegram'
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
                  len: 10,
                  pattern: /^[2-9]{2}[0-9]{8}$/,
                  message: "Debe ser un número de 10 dígitos",
                },
              ]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Form>
        </div>
        <div className='w-2/12 '>
          <Typography.Title level={4}>Cambiar privacidad</Typography.Title>
          <Typography.Paragraph>
            Desactiva en caso de no querer mostrar tus redes sociales en cada
            publicación
          </Typography.Paragraph>
          <List
            className='demo-loadmore-list'
            itemLayout='horizontal'
            dataSource={[
              {
                name: "Instagram",
                checked: configurationState.instagram,
              },
              {
                name: "Telegram",
                checked: configurationState.telegram,
              },
            ]}
            renderItem={item => (
              <List.Item
                actions={[
                  <Switch
                    checked={item.checked}
                    loading={loadingSimple}
                    onChange={(checked: boolean) => {
                      onChangeConfiguration(checked, item.name.toLowerCase());
                    }}
                  />,
                ]}
              >
                <Skeleton avatar title={false} loading={false} active>
                  <List.Item.Meta description={item.name} />
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
