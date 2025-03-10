import { fromJS } from "immutable"
import { set_favorites, set_loading, set_pokemons } from "../Actions/types"

const initialState = fromJS({
    loading: true,
})

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case set_loading:
            // return {
            //     ...state,
            //     loading: action.payload
            // }
            return state.setIn(['loading'], fromJS(action.payload))
        default:
            return state
    }
}
