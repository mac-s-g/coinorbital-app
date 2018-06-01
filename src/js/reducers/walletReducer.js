import Wallets from "./models/Wallets"

import {
  USER_LOGOUT,
  REQUEST_CREATE_WALLET,
  CREATE_WALLET,
  CREATE_WALLET_ERROR,
  REQUEST_WALLETS,
  RECEIVE_WALLETS,
  RECEIVE_WALLETS_ERROR,
  REQUEST_DELETE_WALLET,
  DELETE_WALLET,
  DELETE_WALLET_ERROR,
  REQUEST_EDIT_WALLET,
  EDIT_WALLET,
  EDIT_WALLET_ERROR
} from "./../actions"

const default_state = {
  fetching: false,
  fetched: false,
  error: false,
  by_name: {}
}

export default (state = default_state, { type, payload }) => {
  switch (type) {
    case USER_LOGOUT:
      return {
        ...default_state
      }
    case REQUEST_WALLETS:
      return {
        ...state,
        fetching: true
      }
    case RECEIVE_WALLETS:
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: false,
        by_name: {
          ...new Wallets(payload)
        }
      }
    case RECEIVE_WALLETS_ERROR:
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: true
      }
    case REQUEST_CREATE_WALLET:
    case CREATE_WALLET:
      return {
        ...state,
        by_name: {
          ...state.by_name,
          ...payload
        }
      }
    case REQUEST_DELETE_WALLET:
      return {
        ...state,
        by_name: {
          ...Object.keys(state.by_name).reduce(
            (acc, name) =>
              name == payload ? acc : { ...acc, [name]: state.by_name[name] },
            {}
          )
        }
      }
    case DELETE_WALLET:
      return {
        ...state,
        by_name: {
          ...payload
        }
      }
    case REQUEST_EDIT_WALLET:
      return {
        ...state,
        by_name: {
          ...Object.keys(state.by_name).reduce(
            (acc, name) =>
              name == payload.original_name
                ? {
                    ...acc,
                    [payload.revised_wallet.name]: payload.revised_wallet
                  }
                : { ...acc, [name]: state.by_name[name] },
            {}
          )
        }
      }
    case EDIT_WALLET:
      return {
        ...state,
        by_name: {
          ...payload
        }
      }
    default:
      return state
  }
}
