import { OPEN_DIALOG, CLOSE_DIALOG } from "../actions/type";

const initialState = {
    open: false,
}

export const dialogReducer = (state = initialState, action) => {
    switch(action.type) {
        case OPEN_DIALOG:
            return {
                ...state, open: true
            }
        case CLOSE_DIALOG:
            return initialState
        default:
            return state;
    }
}