import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"

import accountReducer from "./accountReducer"
import modalReducer from "./modalReducer"
import coinReducer from "./coinReducer"
import watchListReducer from "./watchListReducer"

const reducer = combineReducers({
  accounts: accountReducer,
  coins: coinReducer,
  modals: modalReducer,
  watchList: watchListReducer,
  router: routerReducer
})

export default reducer
