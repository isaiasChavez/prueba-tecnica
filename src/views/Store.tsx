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
  import { useParams, useNavigate } from "react-router-dom";
  
  import {
    EditOutlined,
    EllipsisOutlined,
    SettingOutlined,
  } from "@ant-design/icons";
  
  import Layout, { Content,Footer } from "antd/lib/layout/layout";
  
  import { CSSProperties } from "react";
  import { IMG } from "../utils/assets";
  import Meta from "antd/lib/card/Meta";
import { CardPublication } from "../components/CardPublication";
  
  
  interface StoreProps {}
  
  const Store: React.FC<StoreProps> = () => {
    const onChange = (currentSlide: number) => {};
    const navigate = useNavigate();
  
  
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
            <Button key="2" onClick={()=>navigate("/login")}>SignIn</Button>,
            <Button key="2" onClick={()=>navigate("/register")}>SignUp</Button>,
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
                <Radio.Group defaultValue="a" buttonStyle="solid">
                  <Radio.Button value="a">Hangzhou</Radio.Button>
                  <Radio.Button value="b">Shanghai</Radio.Button>
                  <Radio.Button value="c">Beijing</Radio.Button>
                  <Radio.Button value="d">Chengdu</Radio.Button>
                </Radio.Group>
              </Space>
              </div>
            </div>
            <div className="min-h-screen w-full py-16 px-8">
              <Row gutter={16}>
                {/* <Col span={6}>
                  <CardPublication />
                </Col>
                <Col span={6}>
                  <CardPublication />
                </Col>
                <Col span={6}>
                  <CardPublication />
                </Col>
                <Col span={6}>
                  <CardPublication />
                </Col> */}
              </Row>
            </div>
          </Layout>
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
  


  
  export default Store;
  