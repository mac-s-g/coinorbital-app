import React from "react"
import { Route, Switch } from "react-router"

import Header from "./Header"
import Sidebar from "./Sidebar/"
//views
import Overview from "./Overview/"
import WatchList from "./WatchList/"
import Wallet from "./Wallet/"
//modals
import NewTransaction from "./Modal/NewTransaction"
import AddToWatchList from "./Modal/AddToWatchList"
import CoinInfo from "./Modal/CoinInfo"
import CreateWallet from "./Modal/CreateWallet"

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
  </div>
)
