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
import { useContext } from "react";
import ProductsContext from "../context/products/products.context";
import { IMG } from "../utils/assets";
const { confirm } = Modal;
interface CardPublicationProps {
  publication: Publication;
}

export const CardPublication: React.FC<CardPublicationProps> = ({
  publication,
}) => {
  const navigate = useNavigate();
  const {deleteProduct,loading} = useContext(ProductsContext)

  const showConfirm = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: "¿Seguro que quiere eliminar esta publicación?",
      centered: true,
      async onOk() {
        console.log("OK");
       await deleteProduct(publication.uuid)
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <Card
    hoverable
    bodyStyle={{

      height:'8rem'
      }}
      cover={
        <img
        onClick={()=>{
          navigate(`${ROUTES.publication}/${publication.uuid}`);
        }}
          alt='example'
          style={{
            maxHeight: "15rem",
            height: "15rem",
          }}
          src={publication.coverPage}
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
        title={publication.title}
        description={publication.description}
      />
    </Card>
  );
};
