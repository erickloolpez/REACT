import { set_favorites, set_loading, set_pokemons } from "./types";
import { getPokemonDetails } from "../Api";

export const setPokemons = (payload) => ({
    type: set_pokemons,
    payload,
})

export const setLoading = (payload) => ({
    type: set_loading,
    payload,
})

export const setFavorites = (payload) => ({
    type: set_favorites,
    payload,
})

export const getPokemonsWithDetails = (pokemons = []) => async (dispatch) => {
    const pokemonsDetailed = await Promise.all(pokemons.map((pokemon) => getPokemonDetails(pokemon)))
    dispatch(setPokemons(pokemonsDetailed))
}