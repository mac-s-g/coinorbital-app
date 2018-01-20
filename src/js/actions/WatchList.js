import Cabinet from "cabinet-storage"

const WATCH_LIST_RANKED_KEY = "watchlist.ranked"

export const RECEIVE_WATCH_LIST = "RECEIVE_WATCH_LIST"
export const ADD_TO_WATCH_LIST = "ADD_TO_WATCH_LIST"
export const REMOVE_FROM_WATCH_LIST = "REMOVE_FROM_WATCH_LIST"
export const REORDER_WATCH_LIST = "REORDER_WATCH_LIST"

export const fetchWatchList = () => ({
  type: RECEIVE_WATCH_LIST,
  payload: Cabinet.get(WATCH_LIST_RANKED_KEY, [])
})

export const addToWatchList = symbol => ({
  type: ADD_TO_WATCH_LIST,
  payload: Cabinet.set(
    WATCH_LIST_RANKED_KEY,
    Cabinet.get(WATCH_LIST_RANKED_KEY, []).concat(symbol)
  )
})

export const removeFromWatchList = remove_symbol => ({
  type: REMOVE_FROM_WATCH_LIST,
  payload: Cabinet.set(
    WATCH_LIST_RANKED_KEY,
    Cabinet.get(WATCH_LIST_RANKED_KEY, []).filter(
      symbol => symbol != remove_symbol
    )
  )
})

export const reorderWatchList = watchList => ({
  type: REORDER_WATCH_LIST,
  payload: Cabinet.set(WATCH_LIST_RANKED_KEY, watchList)
})
