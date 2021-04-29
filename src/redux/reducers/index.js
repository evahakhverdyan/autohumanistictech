import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import lessons from './Lessons';
import tickets from './Tickets';
import user from './User';
import statistics from './Statistics';

const reducers =  {
    user,
    lessons,
    tickets,
    statistics
};

export const store = createStore(combineReducers(reducers), applyMiddleware(thunk));
