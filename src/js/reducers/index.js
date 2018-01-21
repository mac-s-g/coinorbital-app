import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"

import modalReducer from "./modalReducer"
import coinReducer from "./coinReducer"
import walletReducer from "./walletReducer"
import watchListReducer from "./watchListReducer"

const reducer = combineReducers({
  coins: coinReducer,
  modals: modalReducer,
  wallets: walletReducer,
  watchList: watchListReducer,
  router: routerReducer
})

export default reducer
