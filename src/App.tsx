import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import PokemonsState from './context/pokemons/pokemons.state';
import Routering from "./Router";

function App() {
  return (
      <PokemonsState>
        <Routering />
      </PokemonsState>
  );
}

export default App;
