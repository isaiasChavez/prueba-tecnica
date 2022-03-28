import { createContext } from "react";

interface PokemonsContextInterface {
  getPokemonByName(name:string):Promise<Pokemon>
}



export type Pokemon = {
  abilities:Object,
  base_experience:Object,
  forms:number,
  height:number,
  moves:[],
  species:Object,
  weight:number,
  id:number,
  sprites:[],
}

const PokemonsContext = createContext<PokemonsContextInterface | null>(null);

export default PokemonsContext;
