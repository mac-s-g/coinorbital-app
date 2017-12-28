import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"

import accountReducer from "./accountReducer"
import modalReducer from "./modalReducer"
import coinReducer from "./coinReducer"

const reducer = combineReducers({
  accounts: accountReducer,
  coins: coinReducer,
  modals: modalReducer,
  router: routerReducer
})

export default reducer
