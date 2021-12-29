import axios from 'axios';
import variable from '../config';

const { SERVER_ROUTE } = variable;

const Api = axios.create({ baseURL: SERVER_ROUTE });

Api.interceptors.request.use((req) => {
    
    const token = localStorage.getItem('token');
    if (token) { 
        req.headers.Authorization = "Token " + token;
    }
    return req;
})

// --------login-----------//
export const login = ( userData ) => Api.post('/api/v1/token/login/', userData);

// ----------master sheet-----------//
export const uploadMaster = ( formData ) => Api.post('/master/upload', formData);
export const getMasters = () => Api.get('/master/masters');
export const deleteMaster = (id) => Api.delete(`/master/masters/${id}`);
export const updateStatus = (id) => Api.put(`/master/masters/${id}`);

export const uploadTest = ( formData ) => Api.post('/test/upload', formData);
export const getTests = () => Api.get('/test/tests');
export const deleteTest = (id) => Api.delete(`/test/tests/${id}`);

export const getAnalytics = () => Api.get('/analytics');
export const detailAnalytics = (id, format) => Api.put(`/analytics/${id}`, {format: format});

export const setting = (formData) => Api.post('/setting', formData);
export const getSettings = () => Api.get('/setting');