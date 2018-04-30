import React from "react"
import { Icon, Tab } from "semantic-ui-react"

import DistributionPie from "./DistributionPie"
import PortfolioTrends from "./PortfolioTrends"

export default ({ wallets, coins, fetchTimeSeries, navigateTo }) => (
  <Tab
    menu={{ secondary: true, pointing: true }}
    panes={[
      {
        menuItem: {
          content: "Trends",
          key: "trendstab",
          icon: "line chart"
        },
        render: () => (
          <PortfolioTrends
            {...{ wallets, coins, fetchTimeSeries, navigateTo }}
          />
        )
      },
      {
        menuItem: {
          content: "Distribution",
          key: "distrotab",
          icon: "pie chart"
        },
        render: () => <DistributionPie {...{ wallets, coins, navigateTo }} />
      }
    ]}
  />
)
