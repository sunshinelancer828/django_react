import { LOGIN_SUCESS } from "./type";
import { message } from "../utils/message";
import * as api from '../api/api';

export const login = (userInfo, history) => async (dispatch) => {
    try {
        const { data } = await api.login(userInfo);
        localStorage.setItem("token", data.auth_token);
        dispatch({ type: LOGIN_SUCESS, payload: {} })
        history.push('/main/master');
        message('success', 'Login Successful !', dispatch);

    } catch (error) {
        if (error) {
            message('error', 'Incorrect username or password !', dispatch);
        }
    }
}