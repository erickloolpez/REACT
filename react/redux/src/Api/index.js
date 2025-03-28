import axios from 'axios'

export const getPokemons = ()=>{
    return axios.get('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
    .then(res => res.data.results)
    .catch((err) => console.log(err))
}

export const getPokemonDetails = (pokemon)=>{
    return axios.get(pokemon.url)
    .then(res => res.data)
    .catch(err => console.log(err))
}