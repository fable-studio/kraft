import { combineReducers } from 'redux';
import previewReducer from './previewReducer';

const rootReducer = combineReducers({
  preview: previewReducer
});

export default rootReducer;
