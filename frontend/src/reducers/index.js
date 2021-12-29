import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { alertReducer } from './alertReducer';
import { masterReducer } from './masterReducer';
import { testReducer } from './test.reducer';
import { loaderReducer } from './loaderReducer';
import { analyticsReducer } from './analyticsReducer';
import { dialogReducer } from './dialogReducer';
import { settingReducer } from './settingReducer';

export const reducers = combineReducers({
    user: userReducer,
    alert: alertReducer,
    master: masterReducer,
    test: testReducer,
    loader: loaderReducer,
    analytics: analyticsReducer,
    dialog: dialogReducer,
    setting: settingReducer
});
