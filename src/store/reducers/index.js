import { combineReducers } from 'redux';
import previewReducer from './previewReducer';
import themeReducer from './themeReducer';

const rootReducer = combineReducers({
  preview: previewReducer,
  themes: themeReducer
});

export default rootReducer;
