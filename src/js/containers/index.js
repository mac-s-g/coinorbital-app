import React from "react"
import { Route, Switch } from "react-router"
import { Provider, connect } from "react-redux"
import { ConnectedRouter, push } from "react-router-redux"
import history from "./../store/history"

import Home from "./../components/Home"
import Dashboard from "./../components/Dashboard"
import FourOhFour from "./../components/Dashboard/FourOhFour"

import "semantic-ui-css/semantic.min.css"

import {
  //coins
  fetchCoins,
  fetchTimeSeries,
  //wallet
  fetchWallets,
  createWallet,
  editWallet,
  deleteWallet,
  //watchlist
  addToWatchList,
  removeFromWatchList,
  fetchWatchList,
  reorderWatchList,
  //modals
  closeAllModals,
  createTransactionModal,
  addToWatchListModal,
  coinChartModal,
  createWalletModal,
  editWalletModal,
  deleteWalletModal,
  deleteTransactionModal,
  transactionNoteModal,
  editTransactionModal,
  contactMeModal,
  donateModal,
  roadmapModal
} from "./../actions/"

const mapDispatchToProps = dispatch => ({
  //router
  navigateTo: location => dispatch(push(location)),
  //coins
  fetchCoins: () => dispatch(fetchCoins()),
  fetchTimeSeries: (filters, key) => dispatch(fetchTimeSeries(filters, key)),
  //wallets
  fetchWallets: () => dispatch(fetchWallets()),
  createWallet: wallet => dispatch(createWallet(wallet)),
  editWallet: (original_name, wallet) =>
    dispatch(editWallet(original_name, wallet)),
  deleteWallet: wallet_name => dispatch(deleteWallet(wallet_name)),
  //watchlist
  addToWatchList: coin => dispatch(addToWatchList(coin)),
  removeFromWatchList: coin => dispatch(removeFromWatchList(coin)),
  fetchWatchList: () => dispatch(fetchWatchList()),
  reorderWatchList: order => dispatch(reorderWatchList(order)),
  //modals
  requestCoinChart: coin => dispatch(coinChartModal(coin)),
  requestCreateTransaction: wallet => dispatch(createTransactionModal(wallet)),
  requestAddToWatchList: () => dispatch(addToWatchListModal()),
  requestCreateWallet: () => dispatch(createWalletModal()),
  requestEditWallet: wallet => dispatch(editWalletModal(wallet)),
  requestDeleteWallet: wallet_name => dispatch(deleteWalletModal(wallet_name)),
  requestDeleteTransaction: (wallet, tx_idx) =>
    dispatch(deleteTransactionModal(wallet, tx_idx)),
  requestEditTransaction: (wallet, tx_idx) =>
    dispatch(editTransactionModal(wallet, tx_idx)),
  requestTransactionNote: (wallet, tx_idx) =>
    dispatch(transactionNoteModal(wallet, tx_idx)),
  requestContactMe: () => dispatch(contactMeModal()),
  requestDonate: () => dispatch(donateModal()),
  requestRoadmap: () => dispatch(roadmapModal()),
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
        <Route
          render={routeProps => <Dashboard {...props} {...routeProps} />}
        />
      </Switch>
    </ConnectedRouter>
  </Provider>
)

export default connect(mapStateToProps, mapDispatchToProps)(index)
