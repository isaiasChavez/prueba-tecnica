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
} from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import { Publication } from '../context/products/productstypes'
import Layout, { Footer } from 'antd/lib/layout/layout'
import { useContext, useEffect } from 'react'
import { IMG } from '../utils/assets'
import Meta from 'antd/lib/card/Meta'
import ProductsContext from '../context/products/products.context'
import { ROUTES } from '../Router'

interface StoreProps {}

const Store: React.FC<StoreProps> = () => {
  const onChange = (currentSlide: number) => {}
  const navigate = useNavigate()

  const {
    getDashboardProducts,
    publicationsDashboard,
    getCategories,
    categories,
  } = useContext(ProductsContext)
  const todo = 'all'

  useEffect(() => {
    getCategories()
    getDashboardProducts()
  }, [])

  return (
    <>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="Bazar UTM"
        className="shadow"
        backIcon={null}
        extra={[
          <Button type="primary" key="3">
            Tienda
          </Button>,
          <Button key="2" onClick={() => navigate('/login')}>
            SignIn
          </Button>,
          <Button key="2" onClick={() => navigate('/register')}>
            SignUp
          </Button>,
        ]}
      ></PageHeader>

      <div className="min-h-screen   w-full">
        <Layout className="w-10/12 mx-auto">
          <div className=" mx-auto    flex flex-col justify-center items-center">
            <div className="flex justify-center py-16">
              <Space
                align="center"
                direction="horizontal"
                className="w-full flex justify-center  "
              >
                <Radio.Group defaultValue="all" buttonStyle="solid">
                  <Radio.Button key="123" value={todo}>
                    TODO
                  </Radio.Button>
                  {categories.map((category) => (
                    <Radio.Button key={category.id} value={category.id}>
                      {category.name}
                    </Radio.Button>
                  ))}
                </Radio.Group>
              </Space>
            </div>
          </div>
          <div className="min-h-screen w-full py-16 px-8">
            <Row gutter={16}>
              {publicationsDashboard.map((publication) => (
                <Col key={publication.uuid} span={6}>
                  <CardProduct publication={publication} />
                </Col>
              ))}
            </Row>
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
