import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"

import accountReducer from "./accountReducer"
import modalReducer from "./modalReducer"

const reducer = combineReducers({
  accounts: accountReducer,
  modals: modalReducer,
  router: routerReducer
})

export default reducer
