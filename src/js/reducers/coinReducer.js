import Coin from "./models/Coin"

import {
  REQUEST_COINS,
  RECEIVE_COINS,
  RECEIVE_COINS_ERROR,
  REQUEST_TIME_SERIES,
  RECEIVE_TIME_SERIES,
  RECEIVE_TIME_SERIES_ERROR
} from "./../actions"

const default_state = {
  fetched: false,
  by_symbol: {},
  list: [],
  fetching_coins: false,
  fetch_coins_error: false,
  time_series: {}
}

export default (state = default_state, action) => {
  const { payload } = action
  switch (action.type) {
    case REQUEST_COINS:
      return {
        ...state,
        fetching_coins: true,
        fetch_coins_error: false
      }
    case RECEIVE_COINS:
      return {
        ...state,
        fetched: true,
        list: Object.keys(payload).map(key => payload[key]),
        by_symbol: Object.keys(payload).reduce(
          (accumulator, idx) => ({
            ...accumulator,
            [payload[idx].symbol]: { ...new Coin(payload[idx]) }
          }),
          {}
        ),
        fetching_coins: false,
        fetch_coins_error: false
      }
    case RECEIVE_COINS_ERROR:
      return {
        ...state,
        fetching_coins: false,
        fetch_coins_error: true
      }
    case REQUEST_TIME_SERIES:
      return {
        ...state,
        time_series: {
          ...state.time_series,
          [payload.query_key]: {
            fetching: true,
            fetched: false,
            error: false,
            result: state.time_series[payload.query_key]
              ? state.time_series[payload.query_key].result
              : null
          }
        }
      }
    case RECEIVE_TIME_SERIES:
      return {
        ...state,
        time_series: {
          ...state.time_series,
          [payload.query_key]: {
            fetching: false,
            fetched: true,
            error: false,
            result: payload.result
          }
        }
      }
    case RECEIVE_TIME_SERIES_ERROR:
      return {
        ...state,
        time_series: {
          ...state.time_series,
          [payload.query_key]: {
            fetching: false,
            fetched: true,
            error: payload.error,
            result: null
          }
        }
      }
    default:
      return state
  }
}
