import { DETAIL_ANALYTICS, GET_ANALYTICS } from '../actions/type';

const initialState = {
    list: [],
    details: []
}

export const analyticsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ANALYTICS:
            return {
                ...state, list: action.payload
            }
        case DETAIL_ANALYTICS:
            return {
                ...state, details: action.payload
            }
        default:
            return state;
    }
}