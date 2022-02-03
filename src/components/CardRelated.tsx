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
interface CardRelatedProps {
  publication: Publication;
}

export const CardRelated: React.FC<CardRelatedProps> = ({
  publication,
}) => {
  const navigate = useNavigate();
  const {deleteProduct} = useContext(ProductsContext)

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
      cover={
        <img
          alt='example'
          src={IMG.alumno2}
        />
      }
      onClick={() => {
        navigate(`${ROUTES.publication}/${publication.uuid}`)
      }}
    hoverable     
    >
      <Meta
        //avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title={publication.title}
        description={publication.description}
      />
    </Card>
  );
};
