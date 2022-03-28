import { Avatar, Card, Input, List } from "antd";
import { Form, message, Button, Space } from "antd";
import { useContext } from "react";
import PokemonsContext, { Pokemon } from "../context/pokemons/pokemons.context";

interface LandingProps {}
const data = [];

const { Search } = Input;

const Landing: React.FC<LandingProps> = () => {
  const [form] = Form.useForm();

  const { getPokemonByName, deletePokemonById,pokemons,pokemonsError } = useContext(PokemonsContext);

  const onSearch = async datos => {
    const res = await getPokemonByName(datos.pokemon.trim());
    if (res) {
    form.resetFields()
    }
  };


  const onDelete = async (id:number) => {
    deletePokemonById(id);

  };
  console.log({ pokemons });

  return (
    <>
      <Card title='Pokemon' bordered={false} style={{ width: 800 }}>
        <Form
          form={form}
          layout='vertical'
          onFinish={onSearch}
          autoComplete='off'
        
        >
          <Form.Item
            name='pokemon'
            label='Pokemon name'
           
            rules={[{ required: true, message: "Please fill the field" }]}
          >
            <Input  placeholder='Search pokemon' />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type='primary' htmlType='submit'>
                Capture pokemon
              </Button>
            </Space>
          </Form.Item>
          {pokemonsError}
        </Form>

        <List
          size='small'
          header={<div>Captured Pokemon</div>}
          bordered
          locale={{
            emptyText: "No Pokemons captured yet",
          }}
          dataSource={pokemons}
          renderItem={(item: Pokemon) => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={<Avatar src={item.sprites["front_default"]} />}
                title={<a href='https://ant.design'>{item.name}</a>}
                description={item.id}
              />
              <div>
                <Button type='primary' onClick={()=>onDelete(item.id)} danger>
                  Release pokemon
                </Button>
              </div>
            </List.Item>
          )}
        />
      </Card>
    </>
  );
};

export default Landing;
