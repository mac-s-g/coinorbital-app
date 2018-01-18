import React from "react"
import { Route, Switch } from "react-router"
import { Provider, connect } from "react-redux"
import { ConnectedRouter, push } from "react-router-redux"
import history from "./../store/history"

import Home from "./../components/Home"
import Dashboard from "./../components/Dashboard"

import "semantic-ui-css/semantic.min.css"

import {
  closeAllModals,
  createTransaction,
  newTransactionModal,
  addToWatchListModal,
  addToWatchList,
  fetchCoins,
  fetchWatchList,
  reorderWatchList
} from "./../actions/"

const mapDispatchToProps = dispatch => ({
  navigateTo: location => dispatch(push(location)),
  requestNewTransaction: () => dispatch(newTransactionModal()),
  requestAddToWatchList: () => dispatch(addToWatchListModal()),
  addToWatchList: coin => dispatch(addToWatchList(coin)),
  closeModal: () => dispatch(closeAllModals()),
  createTransaction: payload => dispatch(createTransaction(payload)),
  fetchCoins: () => dispatch(fetchCoins()),
  fetchWatchList: () => dispatch(fetchWatchList()),
  reorderWatchList: order => dispatch(reorderWatchList(order))
})

const mapStateToProps = state => ({ ...state })

const index = props => (
  <Provider store={props.store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route
          exact
          path="/"
          render={routeProps => <Home {...props} {...routeProps} />}
        />
        <Route
          path="/dashboard"
          render={routeProps => <Dashboard {...props} {...routeProps} />}
        />
      </Switch>
    </ConnectedRouter>
  </Provider>
)

export default connect(mapStateToProps, mapDispatchToProps)(index)
