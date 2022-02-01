import {
  PageHeader,
  Button,
  Descriptions,
  Carousel,
  Typography,
  Space,
  Radio,
  Card,
  Col,
  Row,
  Avatar,
  Empty,
  Input,
  Spin,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Layout, { Footer } from "antd/lib/layout/layout";
import { CSSProperties, useContext, useEffect, useState } from "react";
import { IMG } from "../utils/assets";
import Meta from "antd/lib/card/Meta";
import ProductsContext from "../context/products/products.context";
import { Publication } from "../context/products/productstypes";
import { ROUTES } from "../Router";
import SesionContext from "../context/sesion/sesion.context";
import LoadingScreen from "../components/Utils/LoadingScreen";
import FooterGeneral from "../components/Footer";
const { Search } = Input;
interface LandingProps {}

const Landing: React.FC<LandingProps> = () => {
  const onChange = (currentSlide: number) => {};
  const navigate = useNavigate();
  const { isLogged } = useContext(SesionContext);
  const {
    getDashboardProducts,
    publicationsDashboard,
    getCategories,
    categories,
    loading,
  } = useContext(ProductsContext);
  const todo = "ALL";
  const [currentCategory, setcurrentCategory] = useState(todo);
  const [currentQuery, setcurrentQuery] = useState("");

  useEffect(() => {
    getCategories();
    getDashboardProducts(todo, "");
  }, []);

  const onChangeCategory = e => {
    setcurrentQuery("");
    setcurrentCategory(e.target.value);
    getDashboardProducts(e.target.value, "");
  };

  const onSearch = (value: string) => {
    setcurrentCategory(todo);
    getDashboardProducts(todo, value);
  };
  console.log({ isLogged });
  return (
    <>
    <div className="fixed top-0 left-0 right-0" style={{
      zIndex:200
    }}>

      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title='Bazar UTM'
        className='shadow fixed top-0'
        backIcon={null}
        extra={
          isLogged
          ? [
                <Button
                type='primary'
                  key='2'
                  onClick={() => navigate(ROUTES.profile)}
                  >
                  Perfil
                </Button>,
              ]
              : [
                <Button key='2' onClick={() => navigate(ROUTES.store)}>
                  Tienda
                </Button>,
                <Button key='2' onClick={() => navigate(ROUTES.login)}>
                  Ingresa
                </Button>,
                <Button
                  type='primary'
                  key='2'
                  onClick={() => navigate(ROUTES.register)}
                >
                  Crea tu cuenta
                </Button>,
              ]
            }
            ></PageHeader>
            </div>
      <Carousel afterChange={onChange} >
        <div>
          <div className="relative" style={sliderStyle(IMG.alumno2)}>
            <div style={{
              height:'80vh'
            }} className="  inset-0 flex justify-end align-center    ">
              <span className="relative " style={{
                fontSize:'3.5rem',
                marginRight:'2rem'
              }}>

                Vende aquello que ya no utilizarás
              </span>
            </div>
          </div>
        </div>
        <div>
          <div style={sliderStyle(IMG.alumno1)}>
            <Typography.Title level={2} className='text-white'>
              Hola
            </Typography.Title>
          </div>
        </div>
        <div>
          <div style={sliderStyle(IMG.fondo3)}></div>
        </div>
        <div>
          <div style={sliderStyle(IMG.fondo4)}></div>
        </div>
      </Carousel>
      <div className='min-h-screen   w-full'>
        <Layout className='w-10/12 mx-auto'>
          <div className=' mx-auto    flex flex-col justify-center items-center'>
            <div className='flex justify-center py-16'>
              <Typography.Title>Todo lo que necesitas</Typography.Title>
            </div>
            <Space direction='vertical' size='large'>
              <Space
                align='center'
                direction='horizontal'
                className='w-full flex justify-center  '
              >
                <Radio.Group
                  value={currentCategory}
                  onChange={onChangeCategory}
                  defaultValue='all'
                  buttonStyle='solid'
                >
                  <Radio.Button key='123' value={todo}>
                    TODO
                  </Radio.Button>
                  {categories.map(category => (
                    <Radio.Button key={category.id} value={category.name}>
                      {category.name}
                    </Radio.Button>
                  ))}
                </Radio.Group>
              </Space>

              <Search
                value={currentQuery}
                onChange={e => {
                  setcurrentQuery(e.target.value);
                }}
                placeholder='Buscar por nombre'
                onSearch={onSearch}
                enterButton
              />
            </Space>
          </div>

          <div className='min-h-screen relative w-full py-16 px-8'>
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
      <div className='h-3/12s '>
        <div className='w-full mx-auto  h-full  flex align-center justify-center'>
          <Row gutter={[50, 50]} className='w-full px-8 h-full'>
            <Col span={8} className="p-4">
              <div className='  flex justify-center   h-full flex-col text-center'>
                <Typography.Title level={4} className="text-uppercase">
                  Vende aquello que ya no utilizas
                </Typography.Title>
                <Typography.Paragraph>
                  Ya sea porque estás por terminar tus años de estudio o cualquier situación por la que necesites vender tus objetos. 
                </Typography.Paragraph>
              </div>
            </Col>
            <Col span={8} className="p-4">
              <div className='  flex justify-center   h-full flex-col text-center'>
                <Typography.Title level={4} className="text-uppercase">
                  Encuentra mejores precios 
                </Typography.Title>
                <Typography.Paragraph>
                  Ya sea porque estás por terminar tus años de estudio o cualquier situación por la que necesites vender tus objetos. 
                </Typography.Paragraph>
              </div>
            </Col>
            <Col span={8} className="p-4">
              <div className='  flex justify-center   h-full flex-col text-center'>
                <Typography.Title level={4} className="text-uppercase">
                  Encuentra mejores precios 
                </Typography.Title>
                <Typography.Paragraph>
                  Ya sea porque estás por terminar tus años de estudio o cualquier situación por la que necesites vender tus objetos. 
                </Typography.Paragraph>
              </div>
            </Col>
          </Row>
        </div>
      </div>
     <FooterGeneral/>
    </>
  );
};

const CardProduct = ({ publication }: { publication: Publication }) => {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      bodyStyle={{

        height:'12rem'
        }}
      cover={
        <img
          style={{
            maxHeight: "15rem",
            height: "15rem",
          }}
          alt='example'
          src={IMG.silla1}
        />
      }
      onClick={() => {
        navigate(`${ROUTES.publication}/${publication.uuid}`);
      }}
    >
      <Meta
        avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
        title={publication.title}
        description={<span >{publication.description}</span>}
      />
    </Card>
  );
};

const sliderStyle = (background: string): CSSProperties => {
  return {
    height: "80vh",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    backgroundPosition: "center",
    backgroundSize:'cover',
    backgroundImage: `url(${background})`,
  };
};

export default Landing;
