import React, { Component } from "react"
import { Route, Switch } from "react-router"

import Navbar from "./Navbar"
import Sidebar from "./Sidebar/"
import Footer from "./Footer"
//views
import Overview from "./Overview/"
import WatchList from "./WatchList/"
import Wallet from "./Wallet/"
import FourOhFour from "./FourOhFour"
//modals
import AddToWatchList from "./../Modal/AddToWatchList"
import CoinChart from "./../Modal/CoinChart"
import CreateWallet from "./../Modal/CreateWallet"
import EditWallet from "./../Modal/EditWallet"
import DeleteWallet from "./../Modal/DeleteWallet"
import CreateTransaction from "./../Modal/CreateTransaction"
import DeleteTransaction from "./../Modal/DeleteTransaction"
import EditTransaction from "./../Modal/EditTransaction"
import TransactionNote from "./../Modal/TransactionNote"
import ContactMe from "./../Modal/ContactMe"
import Donate from "./../Modal/Donate"
import Roadmap from "./../Modal/Roadmap"

import parseSearch from "./../../helpers/parseSearchQuery"

//value refresh
const FETCH_COIN_INTERVAL = 10000

export default class extends Component {
  fetchCoinInterval = false

  componentWillMount() {
    const { fetchCoins } = this.props
    this.fetchCoinInterval = setInterval(fetchCoins, FETCH_COIN_INTERVAL)
  }

  componentWillUnmount() {
    clearInterval(this.fetchCoinInterval)
  }

  render() {
    const { props } = this
    return (
      <div>
        <Navbar {...props} />
        <Sidebar {...props}>
          <Switch>
            <Route
              exact
              path="/dashboard"
              render={routeProps => <Overview {...props} {...routeProps} />}
            />
            <Route
              exact
              path="/dashboard/account"
              render={routeProps => <AccountView {...props} {...routeProps} />}
            />
            <Route
              exact
              path="/dashboard/watch-list"
              render={routeProps => <WatchList {...props} {...routeProps} />}
            />
            <Route
              path="/dashboard/wallet"
              render={routeProps => <Wallet {...props} {...routeProps} />}
            />
            <Route render={routeProps => <FourOhFour {...routeProps} />} />}
          </Switch>
        </Sidebar>
        <Footer {...props} />
        {props.modals.add_to_watchlist ? <AddToWatchList {...props} /> : null}
        {props.modals.coin_chart ? <CoinChart {...props} /> : null}
        {props.modals.create_wallet ? <CreateWallet {...props} /> : null}
        {props.modals.edit_wallet ? <EditWallet {...props} /> : null}
        {props.modals.delete_wallet ? <DeleteWallet {...props} /> : null}
        {props.modals.create_transaction ? (
          <CreateTransaction {...props} />
        ) : null}
        {props.modals.delete_transaction ? (
          <DeleteTransaction {...props} />
        ) : null}
        {props.modals.transaction_note ? <TransactionNote {...props} /> : null}
        {props.modals.edit_transaction ? <EditTransaction {...props} /> : null}
        {props.modals.contact_me ? (
          <ContactMe donate={props.requestDonate} close={props.closeModal} />
        ) : null}
        {props.modals.donate ? <Donate close={props.closeModal} /> : null}
        {props.modals.roadmap ? (
          <Roadmap
            contactMe={props.requestContactMe}
            close={props.closeModal}
          />
        ) : null}
      </div>
    )
  }
}
