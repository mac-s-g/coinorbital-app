import React from "react"
import { Route, Switch } from "react-router"

import Header from "./Header"
import Sidebar from "./Sidebar/"
//views
import Overview from "./Overview/"
import WatchList from "./WatchList/"
import Wallet from "./Wallet/"
//modals
import AddToWatchList from "./Modal/AddToWatchList"
import CoinInfo from "./Modal/CoinInfo"
import CreateWallet from "./Modal/CreateWallet"
import EditWallet from "./Modal/EditWallet"
import DeleteWallet from "./Modal/DeleteWallet"
import CreateTransaction from "./Modal/CreateTransaction"
import DeleteTransaction from "./Modal/DeleteTransaction"
import EditTransaction from "./Modal/EditTransaction"
import TransactionNote from "./Modal/TransactionNote"

import parseSearch from "./../../helpers/parseSearchQuery"

export default props => (
  <div>
    <Header {...props} />
    <Sidebar {...props}>
      {/*parseSearch(props.history.location.search).account ? (
        <AccountView {...props} />
      ) : (
        <Overview {...props} />
      )*/}
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
      </Switch>
    </Sidebar>
    {props.modals.add_to_watchlist ? <AddToWatchList {...props} /> : null}
    {props.modals.coin_info ? <CoinInfo {...props} /> : null}
    {props.modals.create_wallet ? <CreateWallet {...props} /> : null}
    {props.modals.edit_wallet ? <EditWallet {...props} /> : null}
    {props.modals.delete_wallet ? <DeleteWallet {...props} /> : null}
    {props.modals.create_transaction ? <CreateTransaction {...props} /> : null}
    {props.modals.delete_transaction ? <DeleteTransaction {...props} /> : null}
    {props.modals.transaction_note ? <TransactionNote {...props} /> : null}
    {props.modals.edit_transaction ? <EditTransaction {...props} /> : null}
  </div>
)
