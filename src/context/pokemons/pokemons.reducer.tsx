import { Pokemon, PokemonsStateType } from "./pokemons.context";


export enum ActionsPokemons {
  GET_ONE_SUCCESS = "GET_ONE_SUCCESS",
  GET_ONE_ERROR = "GET_ONE_ERROR",
  DELETE_ONE = "DELETE_ONE",
}

type Actions =
  | { type: ActionsPokemons.GET_ONE_SUCCESS; payload: Pokemon }
  | { type: ActionsPokemons.GET_ONE_ERROR; payload: any }
  | { type: ActionsPokemons.DELETE_ONE; payload: number }

const userReducer = (
  state: PokemonsStateType,
  action: Actions
): PokemonsStateType => {
  const { payload } = action;

  switch (action.type) {
    case ActionsPokemons.GET_ONE_SUCCESS:
      return {
        ...state,
        pokemons: [...state.pokemons, payload],
        pokemonsError:null
      };
    case ActionsPokemons.GET_ONE_ERROR:
        return {
          ...state,
          pokemonsError:"We couldn't fetch this pokemon, please try again"
        };
    case ActionsPokemons.DELETE_ONE:
          return {
            ...state,
            pokemons:state.pokemons.filter(pokemon => pokemon.id !== payload)
          };
    default:
      return state;
  }
};
export default userReducer;
