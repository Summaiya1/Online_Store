import { combineReducers } from 'redux'
import themeReducer from './reducers/themeReducer'
import userReducer from './reducers/userReducer'
import adsReducer from './reducers/adsReducer'

export default combineReducers({
  adsReducer,
  themeReducer,
  userReducer,
 
})