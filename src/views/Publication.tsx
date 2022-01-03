import { PageHeader, Typography, Space, Col, Breadcrumb, Row } from "antd";
import { Image } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EditUserModal from "../components/Profile/EditUserModal";
import { ImageProfile } from "./Profile";
import { CardPublication } from "../components/CardPublication";
interface PublicationProps {}

const Publication: React.FC<PublicationProps> = () => {
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);

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
            <div className="w-full h-full p-16">
              <Row gutter={100} className="w-full h-full">
                <Col span={3} className="">
                  <Breadcrumb>
                    <Breadcrumb.Item href="">
                      <UserOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Electrónica</Breadcrumb.Item>
                  </Breadcrumb>
                </Col>
                <Col span={9}>
                  <Image.PreviewGroup>
                    <div className=" flex flex-col px-4">
                      <Space direction="vertical">
                        <Image
                          className=""
                          src="https://marqcopeques.com/pub/media/catalog/product/cache/c5d2edc70ce3e3c8583abbc3eb88456e/e/s/escritorio_-_avila_u_madera_-_160_-_nogal.jpg"
                        />
                        <div className="flex  justify-center">
                          <Image src="https://marqcopeques.com/pub/media/catalog/product/cache/c5d2edc70ce3e3c8583abbc3eb88456e/e/s/escritorio_-_avila_u_madera_-_120_-_encino_patinado.jpg" />
                          <Image src="https://marqcopeques.com/pub/media/catalog/product/cache/c5d2edc70ce3e3c8583abbc3eb88456e/e/s/escritorio_-_avila_u_madera_-_120_-_laqueado_galeria.jpg" />
                          <Image src="https://marqcopeques.com/pub/media/catalog/product/cache/c5d2edc70ce3e3c8583abbc3eb88456e/e/s/escritorio_-_avila_u_madera_-_120_-_laqueado_galeria.jpg" />
                        </div>
                      </Space>
                    </div>
                  </Image.PreviewGroup>
                </Col>
                <Col span={10}>
                  <Space direction="vertical">
                    <Typography.Text>Usado - Excelente estado</Typography.Text>
                    <Typography.Title level={1}>
                      Escritorio madera, 3 años{" "}
                    </Typography.Title>
                    <Typography.Title level={4}>$ 1,005 </Typography.Title>
                    <Typography.Paragraph>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Doloribus laudantium dolorum esse doloremque provident
                      totam, magnam fuga iure impedit accusantium quisquam optio
                      quis omnis temporibus, eveniet rem voluptates nemo
                      similique recusandae excepturi quibusdam corporis
                      molestias? Voluptas dolorum recusandae at vero.{" "}
                    </Typography.Paragraph>
                  </Space>
                </Col>
              </Row>
            </div>
            <div className="h-screen w-full ">
              <div className="w-10/12 mx-auto shadow  flex flex-col align-end bg-gray p-8">
                <Space direction="vertical">
                  <Typography.Title level={3}>
                    Información del vendedor
                  </Typography.Title>
                  <div>
                    <Space>
                      <Typography.Title level={4}>
                        <span className="px-4">Isaías Chávez </span>
                      </Typography.Title>
                      <ImageProfile image="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp" />
                    </Space>
                  </div>
                </Space>
              </div>
              <div className="w-10/12 mx-auto my-8   flex flex-col   py-8">
                <Space direction="vertical">
                  <Typography.Title level={3}>
                    Productos relacionados
                  </Typography.Title>
                  <div>
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
                </Space>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Publication;
