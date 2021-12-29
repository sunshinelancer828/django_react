import { GET_ANALYTICS, DETAIL_ANALYTICS, LOADER_ON, LOADER_OFF, OPEN_DIALOG } from "./type";
import { message } from "../utils/message";
import * as api from '../api/api';

export const getAnalyticsList = () => async (dispatch) => {
    try {
        const { data } = await api.getAnalytics();
        dispatch({ type: GET_ANALYTICS, payload: data })
    } catch {
        message('error', 'server_error!', dispatch);
    }
}

export const detailAnalytics = (id, format) => async (dispatch) => {
    try {
        dispatch({ type: LOADER_ON })
        const { data } = await api.detailAnalytics(id, format);
        dispatch({ type: DETAIL_ANALYTICS, payload: data })
        dispatch({ type: LOADER_OFF })
        dispatch({ type: OPEN_DIALOG })
    } catch {
        message('error', 'server_error!', dispatch);
    }
}