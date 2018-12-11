/**
 * Redux Module Template
 *
 * Instructions:
 *
 * 1. Update the `initialState` object to reflect your desired initial state.
 *
 * 2. Add/remove action types as required.
 *
 * 4. Add/remove action creators as required.
 *
 * 3. Update the reducer to handle actions.
 *
 * 6. Add a reference to this module in your root reducer `./reducer.js` file.
 *
 * 7. Delete these instructions from your file.
 */

import { FirestoreRepository } from 'instant-firestore';
import { db } from '@hbagroup/instant-react/utils/firebase';

const api = new FirestoreRepository(db, '__name__'); // or, const api = new FirestoreRepository(db, db.collection('__name__'));

// Initial State
//
const initialState = [];

// Action Types
//
const FETCH_REQUEST = '__name__/FETCH_REQUEST';
const FETCH_SUCCESS = '__name__/FETCH_SUCCESS';
const FETCH_FAILURE = '__name__/FETCH_FAILURE';
const CREATE_REQUEST = '__name__/CREATE_REQUEST';
const CREATE_SUCCESS = '__name__/CREATE_SUCCESS';
const CREATE_FAILURE = '__name__/CREATE_FAILURE';
const REMOVE_REQUEST = '__name__/REMOVE_REQUEST';
const REMOVE_SUCCESS = '__name__/REMOVE_SUCCESS';
const REMOVE_FAILURE = '__name__/REMOVE_FAILURE';

// Action Creators
//

/**
 * Fetch
 */
export const fetch = () => ({
  types: [FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE],
  promise: () => api.find(),
});

/**
 * Create
 */
export const create = attributes => ({
  types: [CREATE_REQUEST, CREATE_SUCCESS, CREATE_FAILURE],
  promise: () => api.create(attributes),
});

/**
 * Remove
 */
export const remove = id => ({
  types: [REMOVE_REQUEST, REMOVE_SUCCESS, REMOVE_FAILURE],
  promise: () => api.delete(id),
});

// Reducer
//
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_SUCCESS:
      return action.data;

    case CREATE_SUCCESS:
      return [...state, action.data];

    case REMOVE_SUCCESS:
      return state.filter(item => item.id !== action.id);

    case FETCH_FAILURE:
    case CREATE_FAILURE:
    case REMOVE_FAILURE:
      console.error(action.error);
      return state;

    default:
      return state;
  }
}
