import Cabinet from "cabinet-storage"

import auth from "./../../auth/Auth"
import axiosInstance from "./axiosInstance"

import { api, local_user } from "./../../constants"
import { default_watch_list } from "./fixtures/watchlist"

const WATCH_LIST_RANKED_KEY = "watchlist.ranked"

export const RECEIVE_WATCH_LIST = "RECEIVE_WATCH_LIST"
export const REQUEST_WATCH_LIST = "REQUEST_WATCH_LIST"
export const RECEIVE_WATCH_LIST_ERROR = "RECEIVE_WATCH_LIST_ERROR"
export const ADD_TO_WATCH_LIST = "ADD_TO_WATCH_LIST"
export const REQUEST_ADD_TO_WATCH_LIST = "REQUEST_ADD_TO_WATCH_LIST"
export const ADD_TO_WATCH_LIST_ERROR = "ADD_TO_WATCH_LIST_ERROR"
export const REMOVE_FROM_WATCH_LIST = "REMOVE_FROM_WATCH_LIST"
export const REQUEST_REMOVE_FROM_WATCH_LIST = "REQUEST_REMOVE_FROM_WATCH_LIST"
export const REMOVE_FROM_WATCH_LIST_ERROR = "REMOVE_FROM_WATCH_LIST_ERROR"
export const REORDER_WATCH_LIST = "REORDER_WATCH_LIST"
export const REQUEST_REORDER_WATCH_LIST = "REQUEST_REORDER_WATCH_LIST"
export const REORDER_WATCH_LIST_ERROR = "REORDER_WATCH_LIST_ERROR"

const watchlist_key = `${WATCH_LIST_RANKED_KEY}.${local_user}`

const requestFetchWatchList = () => ({ type: REQUEST_WATCH_LIST })
const fetchWatchListSuccess = payload => ({
  type: RECEIVE_WATCH_LIST,
  payload
})
const fetchWatchListError = payload => ({
  type: RECEIVE_WATCH_LIST_ERROR,
  payload
})

export const fetchWatchList = () => dispatch => {
  if (auth.isAuthenticated()) {
    dispatch(requestFetchWatchList())
    axiosInstance()
      .get(api.paths.watchlist)
      .then(response => dispatch(fetchWatchListSuccess(response.data)))
      .catch(error => dispatch(fetchWatchListError(error)))
  } else {
    dispatch(
      fetchWatchListSuccess(Cabinet.get(watchlist_key, default_watch_list))
    )
  }
}

const requestAddToWatchList = payload => ({
  type: REQUEST_ADD_TO_WATCH_LIST,
  payload
})
const addToWatchListSuccess = payload => ({
  type: ADD_TO_WATCH_LIST,
  payload
})
const addToWatchListError = payload => ({
  type: ADD_TO_WATCH_LIST_ERROR,
  payload
})

export const addToWatchList = symbols => dispatch => {
  if (auth.isAuthenticated()) {
    dispatch(requestAddToWatchList(symbols))
    axiosInstance()
      .post(api.paths.watchlist, { symbols })
      .then(response =>
        dispatch(addToWatchListSuccess(response.data.watchlist))
      )
      .catch(error => dispatch(addToWatchListError(error)))
  } else {
    dispatch(
      addToWatchListSuccess(
        Cabinet.get(watchlist_key, default_watch_list).concat(symbols)
      )
    )
  }
}

const requestRemoveFromWatchList = payload => ({
  type: REQUEST_REMOVE_FROM_WATCH_LIST,
  payload
})
const removeFromWatchListSuccess = payload => ({
  type: REMOVE_FROM_WATCH_LIST,
  payload
})
const removeFromWatchListError = payload => ({
  type: REMOVE_FROM_WATCH_LIST_ERROR,
  payload
})

export const removeFromWatchList = symbol => dispatch => {
  if (auth.isAuthenticated()) {
    dispatch(requestRemoveFromWatchList(symbol))
    axiosInstance()
      .delete(`${api.paths.watchlist}${symbol}`, { symbol })
      .then(response =>
        dispatch(removeFromWatchListSuccess(response.data.watchlist))
      )
      .catch(error => dispatch(removeFromWatchListError(error)))
  } else {
    Cabinet.set(
      watchlist_key,
      Cabinet.get(watchlist_key, default_watch_list).filter(
        s => s != symbol
      )
    )
    dispatch(requestRemoveFromWatchList(symbol))
  }
}

const requestReorderWatchList = () => ({ type: REQUEST_REORDER_WATCH_LIST })
const reorderWatchListSuccess = payload => ({
  type: REORDER_WATCH_LIST,
  payload
})
const reorderWatchListError = payload => ({
  type: REORDER_WATCH_LIST_ERROR,
  payload
})

export const reorderWatchList = watchlist => dispatch => {
  if (auth.isAuthenticated()) {
    dispatch(requestReorderWatchList())
    axiosInstance()
      .put(api.paths.watchlist, { watchlist })
      .then(response =>
        dispatch(reorderWatchListSuccess(response.data.watchlist))
      )
      .catch(error => dispatch(reorderWatchListError(error)))
  } else {
    dispatch(reorderWatchListSuccess(Cabinet.set(watchlist_key, watchlist)))
  }
}
