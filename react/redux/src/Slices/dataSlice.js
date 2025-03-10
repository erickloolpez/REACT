import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPokemonDetails, getPokemons } from "../Api";
import { setLoading } from './uiSlice'

const initialState = {
    pokemons: [],
}

export const fetchPokemonWithDetails = createAsyncThunk('data/fetchPokemonsWithDetails', async (_, { dispatch }) => {
    //dispatch del loading
    dispatch(setLoading(true))
    const pokemonsRes = await getPokemons()
    const pokemonsDetailed = await Promise.all(pokemonsRes.map((pokemon) => getPokemonDetails(pokemon)))
    dispatch(setPokemons(pokemonsDetailed))
    dispatch(setLoading(false))
})

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setPokemons: (state, action) => {
            state.pokemons = action.payload
        },
        setFavorite: (state, action) => {
            const currentPokemonIndex = state.pokemons.findIndex(pokemon => pokemon.id === action.payload.pokemonID)

            if (currentPokemonIndex >= 0) {
                const isFavoriteOne = state.pokemons[currentPokemonIndex].favorite

                state.pokemons[currentPokemonIndex].favorite = !isFavoriteOne
            }
        }
    }
})

export const { setFavorite, setPokemons } = dataSlice.actions

export default dataSlice.reducer