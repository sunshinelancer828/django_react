import { GET_ALL_MASTERS_SUCCESS } from '../actions/type';

const initialState = {
    files: []
}

export const masterReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_MASTERS_SUCCESS:
            return {
                ...state, files: action.payload
            }
        default:
            return state;
    }
}