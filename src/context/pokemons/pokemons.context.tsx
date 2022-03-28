import { createContext } from "react";

interface PokemonsContextInterface {
  getPokemonByName(name:string):Promise<Pokemon>,
  deletePokemonById(id:number):void,
  pokemons:Pokemon[],
  pokemonsError:string
}

export type PokemonsStateType = {
  pokemons: Pokemon[];
  pokemonsError:string
};


type Sprite = { 
  front_default:string
}

export type Pokemon = {
  name:string,
  abilities:Object,
  base_experience:Object,
  forms:number,
  height:number,
  moves:[],
  species:Object,
  weight:number,
  id:number,
  sprites:Sprite[],
}

const PokemonsContext = createContext<PokemonsContextInterface | null>(null);

export default PokemonsContext;
