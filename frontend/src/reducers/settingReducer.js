import { SETTINGS, WELCOME_TEXT } from "../actions/type";
import { SERVER_URL } from "../utils/Util";

const initialState = {
    welcomeText: '',
    logoUrl: '',
}

export const settingReducer = (state = initialState, action) => {
    switch(action.type) {
        case SETTINGS:
            return {
                ...state, 
                welcomeText: action.payload.welcomeText,
                logoUrl: SERVER_URL + action.payload.logoUrl
            }
        
        case WELCOME_TEXT:
            return {
                ...state,
                welcomeText: action.payload
            }

        default:
            return state;
    }
}