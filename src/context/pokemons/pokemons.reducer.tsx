import { Pokemon } from "./pokemons.context";

export type PokemonsStateType = {
  pokemons: Pokemon[];
};

enum ActionsPokemons {
  GET_ONE_SUCCESS = "GET_ONE_SUCCESS",
}

type Actions =
  | { type: ActionsPokemons.GET_ONE_SUCCESS; payload: Pokemon }
  | { type: "ERROR"; payload: any }
  | { type: "WARNING"; payload: any };

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
      };

    default:
      return state;
  }
};
export default userReducer;
