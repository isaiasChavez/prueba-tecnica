import { AxiosResponse } from "axios";
import { useReducer } from "react";
import clienteAxios from "../../config/axios";
import PokemonsContext, { Pokemon } from "./pokemons.context";
        
import PokemonsReducer, { PokemonsStateType } from "./pokemons.reducer";
const PokemonsState = ({ children }) => {
  const [state, dispatch] = useReducer(PokemonsReducer, initialState());

  
   

  const getPokemonByName = async (name:string):Promise<Pokemon>=>{
    try {
      
      const url =  `pokemon/${name}`
      const pokemon:AxiosResponse = await clienteAxios.get(url)
      console.log({pokemon})
      
      return pokemon.data

    } catch (error) {
      console.log({error})
      return null  
    }
  }

 
 

  return (
    <PokemonsContext.Provider
      value={{
        getPokemonByName,
        ...state,
      }}
    >
      {children}
    </PokemonsContext.Provider>
  );
};

const initialState = () => {
  let state:PokemonsStateType = {
    pokemons:[]
  };  
  return state;
};

export default PokemonsState;
