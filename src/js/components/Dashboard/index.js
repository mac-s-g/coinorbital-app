import React from "react"

import Header from "./Header"
import Sidebar from "./Sidebar"
import Overview from "./Overview"
import AccountView from "./AccountView"
import NewTransaction from "./Modal/NewTransaction"

import parseSearch from "./../../helpers/parseSearchQuery"

export default props => (
  <div>
    <Header {...props} />
    <Sidebar {...props}>
      {parseSearch(props.history.location.search).account ? (
        <AccountView {...props} />
      ) : (
        <Overview {...props} />
      )}
    </Sidebar>
    {props.modals.new_transaction ? <NewTransaction {...props} /> : null}
  </div>
)
