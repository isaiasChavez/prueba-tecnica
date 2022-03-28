import {
  PageHeader,
  Button,
  Typography,
  Space,
  Col,
  Upload,
  Breadcrumb,
  Row,
  InputNumber,
  message,
} from "antd";
import { Form, Input, Select, Image } from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import EditUserModal from "../components/Profile/EditUserModal";
import TextArea from "antd/lib/input/TextArea";
import ProductsContext from "../context/products/products.context";
import { UploadFile } from "antd/lib/upload/interface";
import { HTTPResponses, ServerResponse, URLS } from "../types/";
import Configuration from "../config";
import {
  CreateProductDTO,
  UpdateProductDTO,
} from "../context/products/products.dto";
import LoadingScreen from "../components/Utils/LoadingScreen";
import { IMG } from "../utils/assets";
import { ROUTES } from "../Router";
import UserContext from "../context/user/user.context";
import SesionContext from "../context/sesion/sesion.context";

const { Option } = Select;
interface NewPublicationProps {}

const NewPublication: React.FC<NewPublicationProps> = () => {
  const navigate = useNavigate();
  let { uuid } = useParams();

  const isEditing = uuid !== null && uuid !== undefined;

  const {
    getCategories,
    getStatusesProduct,
    create,
    update,
    getPublicationData,
    loading,
    publicationSelected,
    categories,
    statuses,
  } = useContext(ProductsContext);

  const [visible, setVisible] = useState(false);
  const [fileList, setfileList] = useState<UploadFile[]>([]);
  const [loadingData, setloadingData] = useState(true);
  const { token } = useContext(SesionContext);
  const [fileListPrev, setFileListPrev] = useState<
    { uid: string; url: string }[]
  >([]);
  const maXImages = 4;
  const [fields, setfields] = useState({
    title: "",
    category: "",
    price: 0,
    status: "",
    description: "",
    images:""
  });
  useEffect(() => {
    try {
      setloadingData(true);
      if (isEditing) {
        Promise.all([
          getCategories(),
          getStatusesProduct(),
          getPublicationData(uuid),
        ]).then(() => setloadingData(false));
      } else {
        Promise.all([getCategories(), getStatusesProduct()]).then(() =>
          setloadingData(false)
        );
      }
    } catch (error) {
      console.log({ error });
      setloadingData(false);
    }
  }, [uuid]);

  useEffect(() => {
    if (isEditing) {
      setfields({
        title: publicationSelected.title,
        category: publicationSelected.category as any,
        price: publicationSelected.price,
        status: publicationSelected.status as any,
        description: publicationSelected.description,
        images:publicationSelected.images
      });
    }
  }, [publicationSelected]);

  const onFieldsChange = (changedFields: [any], allFields: [any]) => {
    changedFields.map((field: { name: [string]; value: any }) => {
      const fieldName = field.name[0];
      setfields({
        ...fields,
        [fieldName]: field.value,
      });
    });
  };

  const onFinish = async () => {
    let status: ServerResponse;
    if (isEditing) {

      const dto = new UpdateProductDTO(fields, uuid);
      
      status = await update(dto);
    } else {
      const dto = new CreateProductDTO(fields);
      const imagesArray =  fileListPrev.map(file=>{
        return file.url
      })
      const imagesString =  JSON.stringify(imagesArray)
      console.log({imagesString});
      dto.images =  imagesString
      status = await create(dto);
    }

    if (
      status.status === HTTPResponses.Ok ||
      status.status === HTTPResponses.OkCreated
    ) {
      navigate("/profile");
    }
  };

  const propsUploader = {
    onRemove: (newFile: UploadFile) => {
      const fileListState = [...fileList];
      const fileListPrevState = [...fileListPrev];
      const newFileList = fileListState.filter(
        file => file.uid !== newFile.uid
      );
      const newFileListPrev = fileListPrevState.filter(
        file => file.uid !== newFile.uid
      );
      setFileListPrev(newFileListPrev);
      setfileList(newFileList);
    },

    name: Configuration.NAME_INPUT_MULTER,
    action: `${Configuration.baseURL}${URLS.asset.assetOne}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },

    onChange(data: { file: UploadFile; fileList: UploadFile[] }) {
      if (data.file.status !== "uploading") {
      }
      if (data.file.status === "done") {
        message.success(`${data.file.name} file uploaded successfully`);
        //        avatar:data.file.response.data
        console.log("OK!",data.file);
        setFileListPrev([
          ...fileListPrev,
          {
            uid: data.file.originFileObj.uid,
            url: data.file.response.data,
          },
        ]);
      } else if (data.file.status === "error") {
        message.error(`${data.file.name} file upload failed.`);
      }
    },
    accept: "image/png, image/jpg, image/jpeg",
  };

  const imagePrincipal = fileListPrev[0]
    ? fileListPrev[0].url
    : IMG.imagenplaceholder;
  const imageTwo = fileListPrev[1]
    ? fileListPrev[1].url
    : IMG.imagenplaceholder;
  const imageThree = fileListPrev[2]
    ? fileListPrev[2].url
    : IMG.imagenplaceholder;
  const imageFour = fileListPrev[3]
    ? fileListPrev[3].url
    : IMG.imagenplaceholder;
  if (loadingData) {
    return <LoadingScreen />;
  }
  return (
    <>
      <EditUserModal visible={visible} setVisible={setVisible} />
      <div className='h-screen w-full   flex flex-col'>
        <PageHeader
          ghost={false}
          title='Bazar UTM'
          className='shadow  '
          onBack={() => {
            navigate(ROUTES.profile);
          }}
        ></PageHeader>
        <div className='flex-1   relative'>
          <div className=' absolute inset-0  flex'>
            {/* Sider */}
            <div className='px-8 w-3/12 flex flex-col h-full  lex flex-col align-center shadow overflow-y-auto'>
              <div className=' h-1/12 w-full flex align-center justify-start '>
                <Typography.Title level={4}>Nueva publicación</Typography.Title>
              </div>

              <Form
                name='basic'
                labelCol={{ span: 16 }}
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFieldsChange={onFieldsChange}
                onFinish={onFinish}
                className='flex-1 w-full'
                autoComplete='off'
                layout='vertical'
              >
                <div className=''>
                  <Form.Item
                    name='title'
                    label='Título'
                    initialValue={fields.title}
                    rules={[
                      {
                        required: true,
                        message: "Por favor ingresa un título",
                      },
                      {
                        min: 5,
                        message: "Se necesita un mínimo de 5 caracteres",
                      },
                      {
                        max: 50,
                        message: "Máximo 50 caracteres",
                      },
                    ]}
                  >
                    <Input className='' />
                  </Form.Item>
                  <Form.Item
                    name='description'
                    initialValue={fields.description}
                    label='Descripción'
                    rules={[
                      {
                        required: true,
                        message: "¡Por favor ingresa una descripción!",
                      },
                      {
                        max: 350,
                        message: "Máximo 350 caracteres",
                      },
                    ]}
                  >
                    <TextArea rows={4} />
                  </Form.Item>
                  <Form.Item
                    name='category'
                    label='Categoria'
                    initialValue={fields.category}
                    rules={[
                      {
                        required: true,
                        message: "Por favor selecciona una categoría.",
                      },
                    ]}
                  >
                    <Select
                      defaultValue={fields.category}
                      placeholder='Selecciona una categoría'
                    >
                      {categories.map(category => (
                        <Option key={category.id} value={category.name}>
                          {category.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name='status'
                    label='Estado del artículo'
                    initialValue={fields.status}
                    rules={[
                      {
                        required: true,
                        message: "Por favor selecciona el estado del artículo.",
                      },
                    ]}
                  >
                    <Select
                      placeholder='Selecciona'
                      defaultValue={fields.status}
                    >
                      {statuses.map(status => (
                        <Option key={status.id} value={status.name}>
                          {status.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name='price'
                    label='Precio'
                    initialValue={fields.price}
                    rules={[
                      {
                        required: true,
                        message: "Por favor ingresa un precio",
                      },
                    ]}
                  >
                    <InputNumber
                      decimalSeparator=','
                      precision={2}
                      min={0}
                      max={50000}
                    />
                  </Form.Item>
                </div>
                <Space
                  className='bg-white w-full py-8'
                  direction='vertical'
                  align='center'
                  size='large'
                >
                  <Form.Item
                    rules={[
                      {
                        validator: async _ => {
                          if (fileListPrev.length === 0) {
                            return Promise.reject(
                              new Error("Debes agregar al menos una imagen")
                            );
                          }
                        },
                      },
                    ]}
                    name='imagenes'
                    className='pt-8'
                  >
                    <Upload
                      accept=''
                      {...propsUploader}
                      listType='picture'
                      maxCount={4}
                      multiple
                    >
                      <Button
                        block
                        disabled={fileListPrev.length >= maXImages}
                        style={{
                          minWidth: "20rem",
                        }}
                        icon={<UploadOutlined />}
                      >
                        Agregar fotos (Max: 4)
                      </Button>
                    </Upload>
                  </Form.Item>
                </Space>

                <div className=' w-full  flex align-center mb-8'>
                  <Button
                    loading={loading}
                    type='primary'
                    htmlType='submit'
                    block
                  >
                    {isEditing ? "Editar" : "Publicar"}
                  </Button>
                </div>
              </Form>
            </div>
            {/* Sider */}
            <div className='w-9/12 h-full p-16'>
              <Row gutter={16} className='w-full h-full'>
                <Col span={4} className=''>
                  <Breadcrumb>
                    <Breadcrumb.Item href=''>
                      <UserOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item className='text-black capitalize'>
                      {" "}
                      {fields.category?.toLowerCase()}{" "}
                    </Breadcrumb.Item>
                  </Breadcrumb>
                </Col>
                <Col span={9}>
                  <Image.PreviewGroup>
                    <div className=' flex flex-col px-4'>
                      <Space direction='vertical'>
                        <Row
                          gutter={8}
                          align='middle'
                          style={{
                            height: "25rem",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            background: `url(${imagePrincipal}})`,
                          }}
                        >
                          <Image height='100%' src={imagePrincipal} />
                        </Row>

                        <div className='flex   justify-center'>
                          <Row
                            gutter={8}
                            style={{
                              minHeight: "9rem",
                            }}
                          >
                            <Col className='gutter-row' span={8}>
                              <Image
                                height='100%'
                                className='w-4/12 h-full'
                                src={imageTwo}
                              />
                            </Col>
                            <Col className='gutter-row' span={8}>
                              <Image
                                className='flex-1'
                                height='100%'
                                src={imageThree}
                              />
                            </Col>
                            <Col className='gutter-row' span={8}>
                              <Image
                                height='100%'
                                className='flex-1'
                                src={imageFour}
                              />
                            </Col>
                            {/* <Col className="gutter-row" span={8}>
                              {fileListPrev[1] && (
                                <Image
                                  height="100%"
                                  className="w-4/12 h-full"
                                  src={fileListPrev[1].url}
                                />
                              )}
                            </Col>
                            <Col className="gutter-row" span={8}>
                              {fileListPrev[2] && (
                                <Image
                                  className="flex-1"
                                  height="100%"
                                  src={fileListPrev[2].url}
                                />
                              )}
                            </Col>
                            <Col className="gutter-row" span={8}>
                              {fileListPrev[3] && (
                                <Image
                                  height="100%"
                                  className="flex-1"
                                  src={fileListPrev[3].url}
                                />
                              )}
                            </Col> */}
                          </Row>
                        </div>
                      </Space>
                    </div>
                  </Image.PreviewGroup>
                </Col>
                <Col span={9} className='overflow-hidden'>
                  <Space direction='vertical'>
                    <Typography.Text className='text-black capitalize'>
                      {fields.status?.toLowerCase()}
                    </Typography.Text>
                    <Typography.Title level={1}>
                      {fields.title}
                    </Typography.Title>
                    <Typography.Title level={4}>
                      $ {fields.price}{" "}
                    </Typography.Title>
                    <Typography.Paragraph>
                      {fields.description}
                    </Typography.Paragraph>
                  </Space>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPublication;
