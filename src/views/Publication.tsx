import { PageHeader, Typography, Space, Col, Breadcrumb, Row } from "antd";
import { Image } from "antd";
import { InstagramOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import EditUserModal from "../components/Profile/EditUserModal";
import { ImageProfile } from "./Profile";
import { CardPublication } from "../components/CardPublication";
import ProductsContext from "../context/products/products.context";
import { IMG } from "../utils/assets";
import { CardRelated } from "../components/CardRelated";
import LoadingScreen from "../components/Utils/LoadingScreen";
import FooterGeneral from "../components/Footer";
interface PublicationProps {}

const Publication: React.FC<PublicationProps> = () => {
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  let { uuid } = useParams()
  const {
    getPublicationData,
    publicationSelected,
    getRelatedProducts,
    loading,
    publicationsRelated
  } = useContext(ProductsContext)

  useEffect(() => {
    window.scrollTo(0,0)
      getPublicationData(uuid)
    }, [uuid])
    
  useEffect(() => {
    if (publicationSelected.category) {
      getRelatedProducts(publicationSelected.category+"")
    }
  }, [publicationSelected])
  console.log(publicationSelected)
  if (loading) {
    return <LoadingScreen/>
  }
  let imagesArray = []

  if (publicationSelected.images.length>0) {
    imagesArray = JSON.parse(publicationSelected.images)
  }

  console.log({imagesArray})
  
  return (
    <>
      <EditUserModal visible={visible} setVisible={setVisible} />
      <div className="h-screen w-full  flex flex-col">
        <PageHeader
          ghost={false}
          title="Bazar UTM"
          className="shadow  "
          onBack={() => {
            navigate("/profile");
          }}
        ></PageHeader>
        <div className="flex-1  relative">
          <div className=" absolute inset-0  flex flex-col">
            <div className="w-full h-full px-8" style={{
              minHeight:'45rem',
              marginTop:'3rem'
            }}>
              <Row gutter={100}  style={{
              minHeight:'45rem'
            }}className="w-full  h-full">
                <Col span={3} className="">
                  <Breadcrumb>
                    <Breadcrumb.Item href="">
                      <UserOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>{publicationSelected.category}</Breadcrumb.Item>
                  </Breadcrumb>
                </Col>
                <Col span={9}>
                <Image.PreviewGroup>
                    <div className=" flex flex-col p-16">
                      <Space direction="vertical">
                          <Row
                            gutter={8}
                            align="middle"
                            style={{
                              height: '25rem',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              background: `url(${imagesArray[0]})`,
                            }}
                          >
                            <Image height="100%" src={imagesArray[0]} />
                          </Row>
                        <div className="flex   justify-center">
                          <Row
                            gutter={8}
                            style={{
                              minHeight: '9rem',
                            }}
                          >
                            {imagesArray[1]?<Col className="gutter-row" span={8}>
                                <Image
                                  height="100%"
                                  style={{
                                    maxHeight:'10rem'
                                  }}
                                  className="w-4/12 h-full"
                                  src={imagesArray[1]?imagesArray[1]:null}
                                />
                            </Col>:null}
                            {imagesArray[2]?<Col className="gutter-row" span={8}>
                                <Image
                                  height="100%"
                                  className="w-4/12 h-full"
                                  src={imagesArray[2]?imagesArray[2]:null}
                                />
                            </Col>:null}
                            {imagesArray[3]?<Col className="gutter-row" span={8}>
                                <Image
                                  height="100%"
                                  className="w-4/12 h-full"
                                  src={imagesArray[3]?imagesArray[3]:null}
                                />
                            </Col>:null}
                            
                          </Row>
                        </div>
                      </Space>
                    </div>
                  </Image.PreviewGroup>
                </Col>
                <Col span={10}>
                  <Space direction="vertical">
                    <Typography.Text>{publicationSelected.status}</Typography.Text>
                    <Typography.Title level={1}>
                      {publicationSelected.title}
                    </Typography.Title>
                    <Typography.Title level={4}>$ {publicationSelected.price} </Typography.Title>
                    <Typography.Paragraph>
                    {publicationSelected.description}
                    </Typography.Paragraph>
                  </Space>
                </Col>
              </Row>
            </div>
            <div className="h-screen w-full ">
              <div className="w-10/12 mx-auto shadow  flex    p-8">
                <div className="h-full " style={{
                  width:"20rem"
                }}>

              <Typography.Title level={3}>
                    Información del vendedor
                  </Typography.Title>
                <Typography.Paragraph>
                {publicationSelected.user.name}
                </Typography.Paragraph>

                <Typography.Paragraph copyable>
                {publicationSelected.user.phonenumber}
                </Typography.Paragraph>
                {publicationSelected.user.telegram?<Typography.Paragraph copyable>
                Telegram: {publicationSelected.user.telegram}
                </Typography.Paragraph>:null}
                <Space >
                {publicationSelected.user.instagram?<Typography.Paragraph copyable >
                Instagram: {publicationSelected.user.instagram}
                </Typography.Paragraph>:null}
                </Space>
                </div>
                <div className=" flex-1 flex justify-end">
                    <Space>
                      <Typography.Paragraph >
                        <span className="px-4">  </span>
                      </Typography.Paragraph>
                      <ImageProfile image={publicationSelected.user.avatar} />
                    </Space>
                </div>
              </div>
              {publicationsRelated.length!==0?<div className="w-10/12 mx-auto my-8   flex flex-col   py-8">
                <Space direction="vertical">
                  <Typography.Title level={3}>
                    Productos relacionados
                  </Typography.Title>
                  <div>
                    <Row gutter={16}>
                      { publicationsRelated.map(publication=> <Col span={6}>
                        <CardRelated publication={publication} />
                      </Col>) }
                     
                    </Row>
                  </div>
                </Space>
              </div>:null}
            </div>
          </div>
        </div>
        
      </div>
      
    </>
  );
};

export default Publication;
