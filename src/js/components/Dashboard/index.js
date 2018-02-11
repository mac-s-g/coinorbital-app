import React from "react"
import { Route, Switch } from "react-router"

import Navbar from "./Navbar"
import Sidebar from "./Sidebar/"
import Footer from "./Footer"
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
//home modals
import ContactMe from "./../Home/Modal/ContactMe"
import Donate from "./../Home/Modal/Donate"
import Roadmap from "./../Home/Modal/Roadmap"

import parseSearch from "./../../helpers/parseSearchQuery"

export default props => (
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
      </Switch>
    </Sidebar>
    <Footer {...props} />
    {props.modals.add_to_watchlist ? <AddToWatchList {...props} /> : null}
    {props.modals.coin_info ? <CoinInfo {...props} /> : null}
    {props.modals.create_wallet ? <CreateWallet {...props} /> : null}
    {props.modals.edit_wallet ? <EditWallet {...props} /> : null}
    {props.modals.delete_wallet ? <DeleteWallet {...props} /> : null}
    {props.modals.create_transaction ? <CreateTransaction {...props} /> : null}
    {props.modals.delete_transaction ? <DeleteTransaction {...props} /> : null}
    {props.modals.transaction_note ? <TransactionNote {...props} /> : null}
    {props.modals.edit_transaction ? <EditTransaction {...props} /> : null}
    {props.modals.contact_me ? (
      <ContactMe donate={props.requestDonate} close={props.closeModal} />
    ) : null}
    {props.modals.donate ? <Donate close={props.closeModal} /> : null}
    {props.modals.roadmap ? (
      <Roadmap contactMe={props.requestContactMe} close={props.closeModal} />
    ) : null}
  </div>
)
