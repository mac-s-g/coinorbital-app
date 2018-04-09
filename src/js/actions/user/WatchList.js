import Cabinet from "cabinet-storage"

import auth from "./../../auth/Auth"

const WATCH_LIST_RANKED_KEY = "watchlist.ranked"

export const RECEIVE_WATCH_LIST = "RECEIVE_WATCH_LIST"
export const ADD_TO_WATCH_LIST = "ADD_TO_WATCH_LIST"
export const REMOVE_FROM_WATCH_LIST = "REMOVE_FROM_WATCH_LIST"
export const REORDER_WATCH_LIST = "REORDER_WATCH_LIST"

const default_watch_list = ["BTC", "ETH", "LTC", "BCH"]

const watchListKey = user_id => `${WATCH_LIST_RANKED_KEY}.${user_id}`

export const fetchWatchList = () => dispatch =>
  auth.getUserId().then(user_id =>
    dispatch({
      type: RECEIVE_WATCH_LIST,
      payload: Cabinet.get(watchListKey(user_id), default_watch_list)
    })
  )

export const addToWatchList = symbol => dispatch =>
  auth.getUserId().then(user_id =>
    dispatch({
      type: ADD_TO_WATCH_LIST,
      payload: Cabinet.set(
        watchListKey(user_id),
        Cabinet.get(watchListKey(user_id), default_watch_list).concat(symbol)
      )
    })
  )

export const removeFromWatchList = remove_symbol => dispatch =>
  auth.getUserId().then(user_id =>
    dispatch({
      type: REMOVE_FROM_WATCH_LIST,
      payload: Cabinet.set(
        watchListKey(user_id),
        Cabinet.get(watchListKey(user_id), default_watch_list).filter(
          symbol => symbol != remove_symbol
        )
      )
    })
  )

export const reorderWatchList = watchList => dispatch =>
  auth.getUserId().then(user_id =>
    dispatch({
      type: REORDER_WATCH_LIST,
      payload: Cabinet.set(watchListKey(user_id), watchList)
    })
  )
