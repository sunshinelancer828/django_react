import { ALERT_OFF, ALERT_ON } from "../actions/type";

const initialState = {
    message: '',
    severity: '',
    open: false,
}

export const alertReducer = (state = initialState, action) => {
    switch(action.type) {
        case ALERT_ON:
            return action.payload
        case ALERT_OFF:
            return initialState
        default:
            return state;
    }
}