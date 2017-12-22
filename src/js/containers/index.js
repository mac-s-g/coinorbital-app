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
  newTransactionModal
} from "./../actions/"

const mapDispatchToProps = dispatch => ({
  navigateTo: location => dispatch(push(location)),
  requestNewTransaction: () => dispatch(newTransactionModal()),
  closeModal: () => dispatch(closeAllModals()),
  createTransaction: payload => dispatch(createTransaction(payload))
})

const mapStateToProps = state => ({ ...state })

const index = props => (
  <Provider store={props.store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route
          exact
          path="/"
          render={routeProps => <Home {...routeProps} {...props} />}
        />
        <Route
          exact
          path="/dashboard"
          render={routeProps => <Dashboard {...routeProps} {...props} />}
        />
      </Switch>
    </ConnectedRouter>
  </Provider>
)

export default connect(mapStateToProps, mapDispatchToProps)(index)
