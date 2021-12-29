import { LOADER_ON, LOADER_OFF, GET_ALL_TESTS_SUCCESS } from './type';
import * as api from '../api/api';
import { message } from '../utils/message';

export const uploadTest = (formData) => async (dispatch) => {
    try {
        dispatch({ type: LOADER_ON })
        await api.uploadTest(formData);
        dispatch(getTests());
        dispatch({ type: LOADER_OFF })
        message('success', 'File uploaded successfully!', dispatch)
    } catch (error) {
        message('error', 'File could not be uploaded', dispatch)
    }
}

export const getTests = () => async (dispatch) => {
    try {
        const { data } = await api.getTests();
        dispatch({ type: GET_ALL_TESTS_SUCCESS, payload: data })
    } catch (error) {

    }
}

export const deleteTest = (id) => async (dispatch) => {
    try {
        await api.deleteTest(id);
        dispatch(uploadTest);
    } catch (error) {

    }
}