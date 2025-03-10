// import { combineReducers } from 'redux-immutable'
import { combineReducers } from 'redux'
import dataReducer from '../Slices/dataSlice'
import  uiReducer  from '../Slices/uiSlice'
// import { uiReducer } from './ui'
// import { pokemonReducer } from './pokemons'

export const rootReducer = combineReducers({
    data: dataReducer,
    ui: uiReducer,
})

