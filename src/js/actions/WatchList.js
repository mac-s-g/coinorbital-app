import Cabinet from "cabinet-storage"

const WATCH_LIST_RANKED_KEY = "watchlist.ranked"

export const RECEIVE_WATCH_LIST = "RECEIVE_WATCH_LIST"
export const ADD_TO_WATCH_LIST = "ADD_TO_WATCH_LIST"
export const REORDER_WATCH_LIST = "REORDER_WATCH_LIST"

export const fetchWatchList = () => ({
  type: RECEIVE_WATCH_LIST,
  payload: Cabinet.get(WATCH_LIST_RANKED_KEY, [])
})

export const addToWatchList = coin => ({
  type: ADD_TO_WATCH_LIST,
  payload: Cabinet.set(
    WATCH_LIST_RANKED_KEY,
    Cabinet.get(WATCH_LIST_RANKED_KEY, []).concat(coin)
  )
})

export const reorderWatchList = watchList => ({
  type: REORDER_WATCH_LIST,
  payload: Cabinet.set(WATCH_LIST_RANKED_KEY, watchList)
})
