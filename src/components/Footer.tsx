import { Col, List, Row, Typography } from "antd";
import { Footer } from "antd/lib/layout/layout";
import { Link } from "react-router-dom";
import { ROUTES } from "../Router";

interface FooterGeneralProps {}

const FooterGeneral: React.FC<FooterGeneralProps> = () => {
  return (
    <Footer className='relative h-2/12s '>
      <Row   className=' px-8 inset-0 absolute h-full bg-black text-white '>
        <Col span={8} className=''>
          <List
            itemLayout='horizontal'
            dataSource={[
              {
                name: "Sobre este sitio",
              },
              {
                name: "Política de privacidad",
              },
              {
                name: "Ayuda",
              },
            ]}
            renderItem={item => (
              <List.Item style={{
                border:'none'
              }}>
                <List.Item.Meta  title={<Link to={ROUTES.about} className="text-white-mid">
                  {item.name}
                </Link>} />
              </List.Item>
            )}
          />
        </Col>
        <Col span={16} className='  justify-end relative'>
          <div className="inset-0 p-4 absolute flex justify-end align-end">

          <Typography.Text className='text-white'>
            © Copyright - Isaías Chávez
          </Typography.Text>
          </div>
        </Col>
      </Row>
    </Footer>
  );
};

export default FooterGeneral;
