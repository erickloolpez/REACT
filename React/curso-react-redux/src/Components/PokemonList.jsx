import { PokemonCard } from "./PokemonCard";
import './PokemonList.css'

export const PokemonList = ({pokemons})=>{
    return(
        <div className='PokemonList'>
            {pokemons.map((pokemon)=><PokemonCard name={pokemon.name} key={pokemon.name} image={pokemon.sprites.front_default} types={pokemon.types} id={pokemon.id} favorite={pokemon.favorite}/>)}
        </div>

    )
}