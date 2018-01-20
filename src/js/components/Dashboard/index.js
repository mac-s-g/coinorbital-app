import React from "react"
import { Route, Switch } from "react-router"

import Header from "./Header"
import Sidebar from "./Sidebar"
import Overview from "./Overview"
import AccountView from "./AccountView"
import WatchList from "./WatchList/"
import NewTransaction from "./Modal/NewTransaction"
import AddToWatchList from "./Modal/AddToWatchList"
import CoinInfo from "./Modal/CoinInfo"

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
      </Switch>
    </Sidebar>
    {props.modals.new_transaction ? <NewTransaction {...props} /> : null}
    {props.modals.add_to_watchlist ? <AddToWatchList {...props} /> : null}
    {props.modals.coin_info ? <CoinInfo {...props} /> : null}
  </div>
)
