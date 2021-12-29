import { GET_ALL_MASTERS_SUCCESS } from './type';
import * as api from '../api/api';
import { message } from '../utils/message';

export const uploadMaster = (formData) => async (dispatch) => {
    try {
        await api.uploadMaster(formData);
        dispatch(getMasters());
        message('success', 'File uploaded successfully!', dispatch)
    } catch (error) {
        message('error', 'File could not be uploaded', dispatch)
    }
}

export const getMasters = () => async (dispatch) => {
    try {
        const { data } = await api.getMasters();
        dispatch({ type: GET_ALL_MASTERS_SUCCESS, payload: data })
    } catch (error) {

    }
}

export const deleteMaster = (id) => async (dispatch) => {
    try {
        await api.deleteMaster(id);
        dispatch(getMasters());
        message('success', 'File deleted successfully!', dispatch)
    } catch (error) {
        message('error', 'File could not be deleted!', dispatch)
    }
}

export const updateStatus = (id) => async (dispatch) => {
    try {
        await api.updateStatus(id);
        dispatch(getMasters());
        message('success', 'File selected successfully!', dispatch)
    } catch (error) {
        message('error', 'File could not be selected!', dispatch)
    }
}