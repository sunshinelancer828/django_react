import { ALERT_ON } from "../actions/type";

export const message = (severity, message, dispatch) => {
    dispatch({
        type: ALERT_ON, 
        payload: {
            severity: severity,
            message: message,
            open: true,
        }
    })
}