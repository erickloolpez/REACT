import { fromJS } from "immutable"
import { set_favorites, set_pokemons } from "../Actions/types"

const initialState = fromJS({
    pokemons: [],
})

export const pokemonReducer = (state = initialState, action) => {
    switch (action.type) {
        case set_pokemons:
            // return {
            //     ...state,
            //     pokemons: action.payload
            // }
            return state.setIn(['pokemons'], fromJS(action.payload))
        case set_favorites:
            // const newPokemonList = [...state.pokemons]

            // const currentPokemonIndex = newPokemonList.findIndex((pokemon)=> pokemon.id === action.payload.pokemonID)
            const currentPokemonIndex = state.get('pokemons').findIndex(pokemon => pokemon.get('id') === action.payload.pokemonID)

            if (currentPokemonIndex < 0) {
                return state
            }

            // newPokemonList[currentPokemonIndex].favorite = !newPokemonList[currentPokemonIndex].favorite
            const isFavoriteOne = state.get('pokemons').get(currentPokemonIndex).get('favorite')

            const isFavoriteTwo = state.getIn(['pokemons', currentPokemonIndex, 'favorite'])

            return state.setIn(['pokemons', currentPokemonIndex, 'favorite'], !isFavoriteOne)
        default:
            return state
    }
}
