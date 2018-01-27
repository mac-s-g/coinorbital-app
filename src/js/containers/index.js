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
  editWallet,
  deleteWallet,
  //transactions
  createTransaction,
  //watchlist
  addToWatchList,
  removeFromWatchList,
  fetchWatchList,
  reorderWatchList,
  //modals
  closeAllModals,
  createTransactionModal,
  addToWatchListModal,
  coinInfoModal,
  createWalletModal,
  editWalletModal,
  deleteWalletModal
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
  editWallet: (original_name, wallet) =>
    dispatch(editWallet(original_name, wallet)),
  deleteWallet: wallet_name => dispatch(deleteWallet(wallet_name)),
  //transactions
  createTransaction: payload => dispatch(createTransaction(payload)),
  //watchlist
  addToWatchList: coin => dispatch(addToWatchList(coin)),
  removeFromWatchList: coin => dispatch(removeFromWatchList(coin)),
  fetchWatchList: () => dispatch(fetchWatchList()),
  reorderWatchList: order => dispatch(reorderWatchList(order)),
  //modals
  requestCreateTransaction: wallet => dispatch(createTransactionModal(wallet)),
  requestAddToWatchList: () => dispatch(addToWatchListModal()),
  requestCreateWallet: () => dispatch(createWalletModal()),
  requestEditWallet: wallet => dispatch(editWalletModal(wallet)),
  requestDeleteWallet: wallet_name => dispatch(deleteWalletModal(wallet_name)),
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
