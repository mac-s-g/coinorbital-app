import Cabinet from "cabinet-storage"

const WATCH_LIST_RANKED_KEY = "watchlist.ranked"

export const RECEIVE_WATCH_LIST = "RECEIVE_WATCH_LIST"
export const ADD_TO_WATCH_LIST = "ADD_TO_WATCH_LIST"
export const REMOVE_FROM_WATCH_LIST = "REMOVE_FROM_WATCH_LIST"
export const REORDER_WATCH_LIST = "REORDER_WATCH_LIST"

const default_watch_list = ["BTC", "ETH", "LTC", "BCH"]

export const fetchWatchList = () => ({
  type: RECEIVE_WATCH_LIST,
  payload: Cabinet.get(WATCH_LIST_RANKED_KEY, default_watch_list)
})

export const addToWatchList = symbol => ({
  type: ADD_TO_WATCH_LIST,
  payload: Cabinet.set(
    WATCH_LIST_RANKED_KEY,
    Cabinet.get(WATCH_LIST_RANKED_KEY, default_watch_list).concat(symbol)
  )
})

export const removeFromWatchList = remove_symbol => ({
  type: REMOVE_FROM_WATCH_LIST,
  payload: Cabinet.set(
    WATCH_LIST_RANKED_KEY,
    Cabinet.get(WATCH_LIST_RANKED_KEY, default_watch_list).filter(
      symbol => symbol != remove_symbol
    )
  )
})

export const reorderWatchList = watchList => ({
  type: REORDER_WATCH_LIST,
  payload: Cabinet.set(WATCH_LIST_RANKED_KEY, watchList)
})
