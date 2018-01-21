import React from "react"
import { Route, Switch } from "react-router"
import { Provider, connect } from "react-redux"
import { ConnectedRouter, push } from "react-router-redux"
import history from "./../store/history"

import Home from "./../components/Home"
import Dashboard from "./../components/Dashboard"

import "semantic-ui-css/semantic.min.css"

import {
  //coins
  fetchCoins,
  //wallet
  fetchWallets,
  createWallet,
  //transactions
  createTransaction,
  //watchlist
  addToWatchList,
  removeFromWatchList,
  fetchWatchList,
  reorderWatchList,
  //modals
  closeAllModals,
  newTransactionModal,
  addToWatchListModal,
  coinInfoModal,
  createWalletModal
} from "./../actions/"

const mapDispatchToProps = dispatch => ({
  //router
  navigateTo: location => dispatch(push(location)),
  //coins
  requestCoinInfo: coin => dispatch(coinInfoModal(coin)),
  fetchCoins: () => dispatch(fetchCoins()),
  //wallets
  fetchWallets: () => dispatch(fetchWallets()),
  createWallet: wallet => dispatch(createWallet(wallet)),
  //transactions
  createTransaction: payload => dispatch(createTransaction(payload)),
  //watchlist
  addToWatchList: coin => dispatch(addToWatchList(coin)),
  removeFromWatchList: coin => dispatch(removeFromWatchList(coin)),
  fetchWatchList: () => dispatch(fetchWatchList()),
  reorderWatchList: order => dispatch(reorderWatchList(order)),
  //modals
  requestNewTransaction: () => dispatch(newTransactionModal()),
  requestAddToWatchList: () => dispatch(addToWatchListModal()),
  requestCreateWallet: () => dispatch(createWalletModal()),
  closeModal: () => dispatch(closeAllModals())
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
