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
} from 'antd'
import { Form, Input, Select, Image } from 'antd'
import { UserOutlined, UploadOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import EditUserModal from '../components/Profile/EditUserModal'
import TextArea from 'antd/lib/input/TextArea'
import ProductsContext from '../context/products/products.context'
import { UploadFile } from 'antd/lib/upload/interface'
import { HTTPResponses, ServerResponse } from '../types/'
import {
  CreateProductDTO,
  UpdateProductDTO,
} from '../context/products/products.dto'
import LoadingScreen from '../components/Utils/LoadingScreen'

const { Option } = Select
interface NewPublicationProps {}

const NewPublication: React.FC<NewPublicationProps> = () => {
  const navigate = useNavigate()
  let { uuid } = useParams()

  const isEditing = uuid !== null && uuid !== undefined

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
  } = useContext(ProductsContext)
  
  const [visible, setVisible] = useState(false)
  const [fileList, setfileList] = useState<UploadFile[]>([])
  const [fileListPrev, setFileListPrev] = useState<
    { uid: string; url: string }[]
  >([])
  const maXImages = 4
  const [fields, setfields] = useState({
    title:  '',
    category:  '',
    price: 0,
    status:  '',
    description: '',
  })
  useEffect(() => {
    if (isEditing) {
      getPublicationData(uuid)
    }
  }, [uuid])

  useLayoutEffect(() => {
    getCategories()
    getStatusesProduct()
  }, [])
  useEffect(() => {
    console.log("TRAJO",publicationSelected)
    if (isEditing) {
      setfields({
        title:  publicationSelected.title ,
        category:  publicationSelected.category as any,
        price:  publicationSelected.price ,
        status: publicationSelected.status as any,
        description: publicationSelected.description 
      })
    }
  }, [publicationSelected])
  

  const onFieldsChange = (changedFields: [any], allFields: [any]) => {
    changedFields.map((field: { name: [string]; value: any }) => {
      const fieldName = field.name[0]
      setfields({
        ...fields,
        [fieldName]: field.value,
      })
    })
  }

  const onFinish = async () => {
    let status: ServerResponse
    if (isEditing) {
      console.log('Actualizando')
      const dto = new UpdateProductDTO(fields, uuid)
      status = await update(dto)
    } else {
      const dto = new CreateProductDTO(fields)
      status = await create(dto)
    }

    if (status.status === HTTPResponses.Ok ||status.status  === HTTPResponses.OkCreated) {
      navigate('/profile')
    }
  }

  const propsUploader = {
    onRemove: (newFile: UploadFile) => {
      const fileListState = [...fileList]
      const fileListPrevState = [...fileListPrev]
      const newFileList = fileListState.filter(
        (file) => file.uid !== newFile.uid,
      )
      const newFileListPrev = fileListPrevState.filter(
        (file) => file.uid !== newFile.uid,
      )
      setFileListPrev(newFileListPrev)
      setfileList(newFileList)
    },
    beforeUpload: (file: UploadFile) => {
      if (fileList.length >= maXImages) {
        return false
      }
      const reader = new FileReader()
      reader.readAsDataURL((file as unknown) as File)
      reader.onloadend = (result) => {
        setFileListPrev([
          ...fileListPrev,
          {
            uid: file.uid,
            url: result.target.result as string,
          },
        ])
      }
      setfileList([...fileList, file])
      return false
    },
    fileList,
    accept: 'image/png, image/jpg, image/jpeg',
  }
  if (loading) {
      return <LoadingScreen/>
  }
  return (
    <>
      <EditUserModal visible={visible} setVisible={setVisible} />
      <div className="h-screen w-full   flex flex-col">
        <PageHeader
          ghost={false}
          title="Bazar UTM"
          className="shadow  "
          onBack={() => {
            navigate('/profile')
          }}
        ></PageHeader>
        <div className="flex-1   relative">
          <div className=" absolute inset-0  flex">
            {/* Sider */}
            <div className="px-8 w-3/12 flex flex-col h-full  lex flex-col align-center shadow overflow-y-auto">
              <div className=" h-1/12 w-full flex align-center justify-start ">
                <Typography.Title level={4}>Nueva publicación</Typography.Title>
              </div>

              <Form
                name="basic"
                labelCol={{ span: 16 }}
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFieldsChange={onFieldsChange}
                onFinish={onFinish}
                className="flex-1 w-full"
                autoComplete="off"
                layout="vertical"
              >
                <div className="">
                  <Form.Item
                    name="title"
                    label="Título"
                    initialValue={fields.title}
                    rules={[
                      {
                        required: true,
                        message: 'Por favor ingresa un título',
                      },
                      {
                        min: 8,
                        message: 'Se necesita un mínimo de 8 caracteres',
                      },
                      {
                        max: 50,
                        message: 'Máximo 50 caracteres',
                      },
                    ]}
                  >
                    <Input className="" />
                  </Form.Item>

                  <Form.Item
                    name="category"
                    label="Categoria"
                    initialValue={fields.category}
                    
                    rules={[
                      {
                        required: true,
                        message: 'Por favor selecciona una categoría.',
                      },
                    ]}
                  >
                    <Select
                      defaultValue={fields.category}
                      placeholder="Selecciona una categoría"
                    >
                      {categories.map((category) => (
                        <Option key={category.id} value={category.name}>
                          {category.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="status"
                    label="Estado del artículo"
                    initialValue={fields.status}
                    rules={[
                      {
                        required: true,
                        message: 'Por favor selecciona el estado del artículo.',
                      },
                    ]}
                  >
                    <Select
                      placeholder="Selecciona"
                      defaultValue={fields.status}
                    >
                      {statuses.map((status) => (
                        <Option key={status.id} value={status.name}>
                          {status.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="price"
                    label="Precio"
                    initialValue={fields.price}
                    rules={[
                      {
                        required: true,
                        message: 'Por favor ingresa un precio',
                      },
                    ]}
                  >
                    <InputNumber
                      decimalSeparator=","
                      precision={2}
                      min={0}
                      max={50000}
                    />
                  </Form.Item>

                  <Form.Item
                    name="description"
                    initialValue={fields.description}
                    label="Descripción"
                    rules={[
                      {
                        required: true,
                        message: '¡Por favor ingresa una descripción!',
                      },
                      {
                        max: 350,
                        message: 'Máximo 350 caracteres',
                      },
                    ]}
                  >
                    <TextArea rows={4} />
                  </Form.Item>
                </div>
                <Space
                  className="bg-white w-full py-8"
                  direction="vertical"
                  align="center"
                  size="large"
                >
                  <Form.Item
                    rules={[
                      {
                        validator: async (_) => {
                          if (fileList.length === 0) {
                            return Promise.reject(
                              new Error('Debes agregar al menos una imagen'),
                            )
                          }
                        },
                      },
                    ]}
                    name="imagenes"
                    className="pt-8"
                  >
                    <Upload
                      accept=""
                      {...propsUploader}
                      listType="picture"
                      maxCount={3}
                      multiple
                    >
                      <Button
                        block
                        disabled={fileListPrev.length >= maXImages}
                        style={{
                          minWidth: '20rem',
                        }}
                        icon={<UploadOutlined />}
                      >
                        Agregar fotos (Max: 4)
                      </Button>
                    </Upload>
                  </Form.Item>
                </Space>

                <div className=" w-full  flex align-center mb-8">
                  <Button
                    loading={loading}
                    type="primary"
                    htmlType="submit"
                    block
                  >
                    {isEditing ? 'Editar' : 'Publicar'}
                  </Button>
                </div>
              </Form>
            </div>
            {/* Sider */}
            <div className="w-9/12 h-full p-16">
              <Row gutter={16} className="w-full h-full">
                <Col span={4} className="">
                  <Breadcrumb>
                    <Breadcrumb.Item href="">
                      <UserOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item className="text-black capitalize">
                      {' '}
                      {fields.category?.toLowerCase()}{' '}
                    </Breadcrumb.Item>
                  </Breadcrumb>
                </Col>
                <Col span={9}>
                  <Image.PreviewGroup>
                    <div className=" flex flex-col px-4">
                      <Space direction="vertical">
                        {fileListPrev[0] && (
                          <Row
                            gutter={8}
                            align="middle"
                            style={{
                              height: '25rem',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              background: `url(${fileListPrev[0].url})`,
                            }}
                          >
                            <Image height="100%" src={fileListPrev[0].url} />
                          </Row>
                        )}
                        <div className="flex   justify-center">
                          <Row
                            gutter={8}
                            style={{
                              minHeight: '9rem',
                            }}
                          >
                            <Col className="gutter-row" span={8}>
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
                            </Col>
                          </Row>
                        </div>
                      </Space>
                    </div>
                  </Image.PreviewGroup>
                </Col>
                <Col span={9} className="overflow-hidden">
                  <Space direction="vertical">
                    <Typography.Text className="text-black capitalize">
                      {fields.status?.toLowerCase()}
                    </Typography.Text>
                    <Typography.Title level={1}>
                      {fields.title}
                    </Typography.Title>
                    <Typography.Title level={4}>
                      $ {fields.price}{' '}
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
  )
}

export default NewPublication
