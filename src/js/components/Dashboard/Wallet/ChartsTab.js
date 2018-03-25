import React from "react"

import WalletLineChart from "./WalletLineChart"
import CoinDeltas from "./CoinDeltas"

export default props => (
  <div>
    <CoinDeltas {...props} />
    <WalletLineChart {...props} />
  </div>
)
