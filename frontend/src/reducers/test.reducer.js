import { GET_ALL_TESTS_SUCCESS } from '../actions/type';

const initialState = {
    files: []
}

export const testReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_TESTS_SUCCESS:
            return {
                ...state, files: action.payload
            }
        default:
            return state;
    }
}