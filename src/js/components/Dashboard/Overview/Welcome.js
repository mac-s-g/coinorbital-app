import React from "react"
import Styled from "styled-components"
import { Icon, Message, Segment } from "semantic-ui-react"

import LogoName from "./../../Logo/Name"
import Link from "./../../Link"

import { theme, project_info } from "./../../../constants"

const MessageContent = Styled.div`
  padding 1em 1.33em;
`

export default ({
  wallets,
  navigateTo,
  createWallet,
  requestCreateTransaction,
  requestCreateWallet
}) => (
  <div>
    <Message size="big" attached>
      <div>
        <Icon
          pull="right"
          name="trophy"
          size="large"
          style={{ color: theme.colors.gold, marginRight: "8px" }}
        />
        Welcome to <LogoName />!
      </div>
    </Message>
    <Segment attached>
      <MessageContent>
        <p>Looks like you're just getting started.</p>
        <p>
          Get the ball rolling by{" "}
          <Link onClick={() => requestCreateWallet()}>
            tracking a new investment
          </Link>.
        </p>
        <p>
          Already have some Bitcoin? Get started by{" "}
          <Link
            onClick={() => {
              let wallet
              if (wallets.by_name.Bitcoin === undefined) {
                wallet = { name: "Bitcoin", symbol: "BTC", transactions: [] }
                createWallet(wallet)
              } else {
                wallet = wallets.by_name.Bitcoin
              }
              navigateTo("dashboard/investment/?name=Bitcoin")
              requestCreateTransaction(wallet)
            }}
          >
            logging your transactions
          </Link>.
        </p>
      </MessageContent>
    </Segment>
  </div>
)
