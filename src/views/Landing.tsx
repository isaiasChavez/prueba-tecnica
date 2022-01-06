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
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import Layout, { Footer } from "antd/lib/layout/layout";

import { CSSProperties, useContext, useEffect } from "react";
import { IMG } from "../utils/assets";
import Meta from "antd/lib/card/Meta";
import ProductsContext from "../context/products/products.context";
import {Publication} from '../context/products/productstypes'
import { ROUTES } from "../Router";


interface LandingProps {}

const Landing: React.FC<LandingProps> = () => {
  const onChange = (currentSlide: number) => {};
  const navigate = useNavigate();
  const {getDashboardProducts,publicationsDashboard} = useContext(ProductsContext)

  useEffect(() => {

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
          <Button onClick={()=>navigate("/store")} type="primary" key="3">
            Tienda
          </Button>,
          <Button key="1" onClick={()=>navigate("/login")}>SignIn</Button>,
          <Button key="2" onClick={()=>navigate("/register")}>SignUp</Button>,
        ]}
      ></PageHeader>
      <Carousel afterChange={onChange}>
        <div>
          <div style={sliderStyle(IMG.fondo1)}></div>
        </div>
        <div>
          <div style={sliderStyle(IMG.fondo2)}>
            <Typography.Title level={2} className="text-white">
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
      <div className="min-h-screen   w-full">
        <Layout className="w-10/12 mx-auto">
          <div className=" mx-auto    flex flex-col justify-center items-center">
            <div className="flex justify-center py-16">
              <Typography.Title>Todo lo que necesitas</Typography.Title>
            </div>
            <Space
              align="center"
              direction="horizontal"
              className="w-full flex justify-center  "
            >
              <Radio.Group defaultValue="a" buttonStyle="solid">
                <Radio.Button value="a">Hangzhou</Radio.Button>
                <Radio.Button value="b">Shanghai</Radio.Button>
                <Radio.Button value="c">Beijing</Radio.Button>
                <Radio.Button value="d">Chengdu</Radio.Button>
              </Radio.Group>
            </Space>
          </div>
          <div className="min-h-screen w-full py-16 px-8">
            <Row gutter={16}>
              {
                publicationsDashboard.map(publication=><Col key={publication.uuid} span={6}>
                  <CardProduct publication={publication} />
                </Col>)
              }
              
             
            </Row>
          </div>
        </Layout>
      </div>
      <div className="h-3/12s ">
      <div className="w-10/12 mx-auto  h-full bg-gray flex align-center justify-center">
      <Row gutter={[16, 50]} className="w-full">
      <Col span={12} >
        <div className="  flex justify-center align-center ">
          <Typography.Title level={5}>
            ENVIAMOS A TODO MÉXICO
          </Typography.Title>
        </div>
      </Col>
      <Col span={12}>
      <div className="  flex justify-center align-center ">

          <Typography.Title level={5}>
            ENVIAMOS A TODO MÉXICO
          </Typography.Title>
      </div>
      </Col>
      <Col span={12}>
      <div className="  flex justify-center align-center ">

          <Typography.Title level={5}>
            ENVIAMOS A TODO MÉXICO
          </Typography.Title>
      </div>
      </Col>

      </Row>

      </div>
      </div>
      <Footer className="relative h-1/12s ">
        <div className=" inset-0 absolute h-full bg-black text-white ">
          <div className="w-10/12 mx-auto  flex align-center h-full">
          <Typography.Text className="text-white">© Copyright - Isaías Chávez</Typography.Text>
          </div>
        </div>
      </Footer>

    </>
  );
};

const CardProduct = ({publication}:{publication:Publication}) => {
  const navigate = useNavigate();

  return (
    <Card
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      onClick={() => {
        navigate(`${ROUTES.publication}/${publication.uuid}`);
      }}
    >
      <Meta
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title={publication.title}
        description={publication.description}
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
    backgroundImage: `url(${background})`,
  };
};

export default Landing;
