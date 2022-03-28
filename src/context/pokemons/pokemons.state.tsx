import { AxiosResponse } from "axios";
import { useReducer } from "react";
import clienteAxios from "../../config/axios";
import PokemonsContext, { Pokemon, PokemonsStateType } from "./pokemons.context";
        
import PokemonsReducer, { ActionsPokemons } from "./pokemons.reducer";
const PokemonsState = ({ children }) => {
  const [state, dispatch] = useReducer(PokemonsReducer, initialState());

  
   

  const getPokemonByName = async (name:string):Promise<Pokemon>=>{
    try {
      
      const url =  `pokemon/${name}`
      const response:AxiosResponse = await clienteAxios.get(url)
      const pokemon:Pokemon =  response.data
      console.log( pokemon)
      
       dispatch({
        type: ActionsPokemons.GET_ONE_SUCCESS,
        payload: pokemon,
      }); 
      return pokemon

    } catch (error) {
      dispatch({
        type: ActionsPokemons.GET_ONE_ERROR,
        payload: null,
      }); 
      console.log({error})
      return null  
    }
  }

  const deletePokemonById = (id:number):void=>{
       dispatch({
        type: ActionsPokemons.DELETE_ONE,
        payload: id,
      }); 
  }

 
 

  return (
    <PokemonsContext.Provider
      value={{
        getPokemonByName,
        deletePokemonById,
        ...state,
      }}
    >
      {children}
    </PokemonsContext.Provider>
  );
};

const initialState = () => {
  let state:PokemonsStateType = {
    pokemons:[],
    pokemonsError:null
  };  
  return state;
};

export default PokemonsState;
