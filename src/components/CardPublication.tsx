import { Card, Avatar } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal, Button } from "antd";
import Meta from "antd/lib/card/Meta";
import { Publication } from "../context/products/productstypes";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../Router";
const { confirm } = Modal;
interface CardPublicationProps {
  publication: Publication;
}

export const CardPublication: React.FC<CardPublicationProps> = ({
  publication,
}) => {
  const navigate = useNavigate();

  const showConfirm = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: "¿Seguro que quiere eliminar esta publicación?",
      centered: true,
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <Card
      cover={
        <img
          alt='example'
          src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
        />
      }
      actions={[
        <EditOutlined
          key='edit'
          onClick={() => {
            navigate(`${ROUTES.editPublication}/${publication.uuid}`);
          }}
        />,
        <DeleteOutlined key='ellipsis' onClick={showConfirm} />,
      ]}
    >
      <Meta
        //avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title={publication.title}
        description={publication.description}
      />
    </Card>
  );
};
