import Cabinet from "cabinet-storage"
console.log(Cabinet.get("watchList", []))

export const RECEIVE_WATCH_LIST = "RECEIVE_WATCH_LIST"
export const ADD_TO_WATCH_LIST = "ADD_TO_WATCH_LIST"

export const fetchWatchList = () => ({
  type: RECEIVE_WATCH_LIST,
  payload: []
  // payload: Cabinet.
})

export const addToWatchList = coin => ({
  type: ADD_TO_WATCH_LIST,
  payload: coin
})
