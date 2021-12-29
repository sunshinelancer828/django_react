import { LOADER_OFF, LOADER_ON } from '../actions/type';

const initialState = {
    loading: false
}

export const loaderReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOADER_ON:
            return {
                ...state, loading: true
            }
        case LOADER_OFF:
            return initialState
        default: 
            return state
    }
}