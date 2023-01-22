import { combineReducers } from 'redux';
import { reducerWeather } from './Weather';
import { reducerOptions } from './Options';

export const rootReducer = combineReducers({
  weather: reducerWeather,
  options: reducerOptions,
});