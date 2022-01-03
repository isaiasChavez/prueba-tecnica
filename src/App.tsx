import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import ProductsState from './context/products/products.state';

import SesionState from "./context/sesion/sesion.state";
import UserState from "./context/user/user.state";
import Routering from "./Router";

function App() {
  return (
    <SesionState>
      <UserState>
      <ProductsState>
        <Routering />
      </ProductsState>
      </UserState>
    </SesionState>
  );
}

export default App;
