import { SETTINGS } from './type';
import * as api from '../api/api';
import { message } from '../utils/message';

export const setting = (formData) => async (dispatch) => {
    try {
        const { data } = await api.setting(formData);
        dispatch({ type: SETTINGS, payload: data });
        message('success', 'Accept successfully!', dispatch);
    } catch (error) {
        console.log(error);
        message('error', 'Could not accept !', dispatch)
    }
}

export const getSettings = () => async (dispatch) => {
    try {
        const { data } = await api.getSettings();
        dispatch({ type: SETTINGS, payload: data })
    } catch (error) {

    }
}