import {
  PageHeader,
  Button,
  Typography,
  Space,
  Radio,
  Card,
  Col,
  Row,
  Avatar,
  Empty,
  Input,
  Spin
} from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import { Publication } from '../context/products/productstypes'
import Layout, { Footer } from 'antd/lib/layout/layout'
import { useContext, useEffect, useState } from 'react'
import { IMG } from '../utils/assets'
import Meta from 'antd/lib/card/Meta'
import ProductsContext from '../context/products/products.context'
import { ROUTES } from '../Router'
import SesionContext from '../context/sesion/sesion.context'
const { Search } = Input;

interface StoreProps {}

const Store: React.FC<StoreProps> = () => {
  const onChange = (currentSlide: number) => {}
  const navigate = useNavigate()

  const {isLogged} = useContext(SesionContext);
  const {
    getDashboardProducts,
    publicationsDashboard,
    loading,
    getCategories,
    categories,
  } = useContext(ProductsContext)
  const ALL = 'ALL'

  const [currentCategory, setcurrentCategory] = useState(ALL);
  const [currentQuery, setcurrentQuery] = useState("");

  useEffect(() => {
    getCategories()
    //getDashboardProducts(ALL)
  }, [])


  const onChangeCategory = e => {
    setcurrentQuery("");
    setcurrentCategory(e.target.value);
    getDashboardProducts(e.target.value, "");
  };
  const onSearch = (value: string) => {
    setcurrentCategory(ALL);
    getDashboardProducts(ALL, value);
  };
  console.log({isLogged});
  return (
    <>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={<span
          className="cursor-pointer"
          onClick={() => navigate(ROUTES.root)}
          >Bazar UTM</span>}
        className="shadow"
        backIcon={null}
        extra={
          isLogged ?[<Button type='primary' key="2" onClick={() => navigate(ROUTES.profile)}>
          Perfil
        </Button>]: 
          [
          <Button key="2" onClick={() => navigate(ROUTES.login)}>
            Ingresa
          </Button>,
          <Button key="2" onClick={() => navigate(ROUTES.register)}>
            Crea tu cuenta
          </Button>,
        ]
        
        
      }
      ></PageHeader>

      <div className="min-h-screen   w-full">
        <Layout className="w-10/12 mx-auto">
          <div className=" mx-auto    flex flex-col justify-center items-center">
            <div className="flex justify-center py-16">
              <Space
                direction="vertical"
                size="large"
              >

              <Space
                align="center"
                className="w-full flex justify-center  "
                
                >
                <Radio.Group onChange={onChangeCategory} defaultValue={ALL} buttonStyle="solid">
                  <Radio.Button key="123" value={ALL}>
                    TODO
                  </Radio.Button>
                  {categories.map((category) => (
                    <Radio.Button key={category.id} value={category.name}>
                      {category.name}
                    </Radio.Button>
                  ))}
                </Radio.Group>

              </Space>
                <Search
                onChange={e => {
                  setcurrentQuery(e.target.value);
                }}
                placeholder="Buscar por nombre" onSearch={onSearch} enterButton />
                  </Space>
            </div>
          </div>
          <div className="min-h-screen w-full py-16 px-8">
          {loading ? (
              <div className='inset-0   flex justify-center align-center'>
                <Spin size='large' />
              </div>
            ) : (
              <>
                {publicationsDashboard.length > 0 ? (
                  <Row gutter={16}>
                    {publicationsDashboard.map(publication => (
                      <Col key={publication.uuid} span={6}>
                        <CardProduct publication={publication} />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <Empty
                    description='No hemos encontrado publicaciones'
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                )}
              </>
            )}
          </div>
        </Layout>
      </div>
      <Footer className="relative h-1/12s ">
        <div className=" inset-0 absolute h-full bg-black text-white ">
          <div className="w-10/12 mx-auto  flex align-center h-full">
            <Typography.Text className="text-white">
              © Copyright - Isaías Chávez
            </Typography.Text>
          </div>
        </div>
      </Footer>
    </>
  )
}

const CardProduct = ({ publication }: { publication: Publication }) => {
  const navigate = useNavigate()

  return (
    <Card
    hoverable
      cover={
        <img
          style={{
            maxHeight: '20rem',
            height: '20rem',
          }}
          alt="example"
          src={IMG.silla1}
        />
      }
      onClick={() => {
        navigate(`${ROUTES.publication}/${publication.uuid}`)
      }}
    >
      <Meta
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title={publication.title}
        description={publication.description}
      />
    </Card>
  )
}

export default Store
