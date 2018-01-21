import { REQUEST_COINS, RECEIVE_COINS, RECEIVE_COINS_ERROR } from "./../actions"

import coinsBySymbol from "./../helpers/coinsBySymbol"

const default_state = {
  fetched: false,
  by_symbol: {},
  list: [],
  fetching_coins: false,
  fetch_coins_error: false
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
        list: [...payload],
        by_symbol: coinsBySymbol(payload),
        fetching_coins: false,
        fetch_coins_error: false
      }
    case RECEIVE_COINS_ERROR:
      return {
        ...state,
        fetching_coins: false,
        fetch_coins_error: true
      }
    default:
      return state
  }
}
