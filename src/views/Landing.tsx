import { Input, List } from "antd";
import { Form, message, Button, Space } from 'antd';
import { useContext } from "react";
import PokemonsContext from "../context/pokemons/pokemons.context";

interface LandingProps {}
const data = [
  "Racing car sprays burning fuel into crowd.",
];

const { Search } = Input;

const Landing: React.FC<LandingProps> = () => {
    const [form] = Form.useForm();

    const {getPokemonByName} = useContext(PokemonsContext)


  const onSearch = async (datos) => {
        console.log({datos})
    await getPokemonByName(datos.pokemon.trim())
  };

  return (
    <>
      <Form
      form={form}
      layout="vertical"
      onFinish={onSearch}
      
      autoComplete="off"
    >
      <Form.Item
        name="pokemon"
        label="Nombre del pokemon"
    
        rules={[{ required: true,message:"Por favor ingresa un dato" }]}
      >
        <Input placeholder="Busca un pokemon" />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Buscar
          </Button>
        </Space>
      </Form.Item>
    </Form>

      <List
        size='small'
        header={<div>Pokemones</div>}
        bordered
        dataSource={data}
        renderItem={item => <List.Item>{item}</List.Item>}
      />
    </>
  );
};

export default Landing;
