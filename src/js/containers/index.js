import React from "react"
import Analytics from "react-router-ga"
import { Route, Switch } from "react-router"
import { Provider, connect } from "react-redux"
import { ConnectedRouter, push } from "react-router-redux"
import history from "./../store/history"
import auth from "./../auth/Auth"

import Home from "./../components/Home"
import Dashboard from "./../components/Dashboard"
import Loading from "./../components/Loading"

import { ga_tracking_id, environment } from "./../constants"

//global semantic - todo: only use what's needed
import "semantic-ui-css/semantic.min.css"

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication()
  }
}

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
  roadmapModal,
  demoDashModal,
  //logout
  logout
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
  requestDemoDash: () => dispatch(demoDashModal()),
  closeModal: () => dispatch(closeAllModals()),
  clearUserState: () => dispatch(logout())
})

const mapStateToProps = state => ({ ...state })

const index = props => (
  <Provider store={props.store}>
    <ConnectedRouter history={history}>
      <Analytics
        id={ga_tracking_id}
        debug={environment == "production" ? false : true}
      >
        <Switch>
          <Route
            exact
            path="/"
            render={routeProps => (
              <Home auth={auth} {...props} {...routeProps} />
            )}
          />
          <Route
            path="/dashboard"
            render={routeProps => (
              <Dashboard auth={auth} {...props} {...routeProps} />
            )}
          />
          <Route
            path="/callback"
            render={routeProps => {
              handleAuthentication(routeProps)
              return <Loading auth={auth} {...props} {...routeProps} />
            }}
          />
          <Route
            render={routeProps => (
              <Dashboard auth={auth} {...props} {...routeProps} />
            )}
          />
        </Switch>
      </Analytics>
    </ConnectedRouter>
  </Provider>
)

export default connect(mapStateToProps, mapDispatchToProps)(index)
