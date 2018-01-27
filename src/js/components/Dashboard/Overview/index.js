import React, { Component } from "react"
import ContentComponent from "./../ContentComponent"
import ChartistGraph from 'react-chartist';

const simpleLineChartData = {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  series: [
    [12, 9, 7, 8, 5],
    [2, 1, 3.5, 7, 3],
    [1, 3, 4, 5, 6]
  ]
}

export default class extends Component {
  componentWillMount() {
    const { fetchWallets, fetchCoins, wallets, coins } = this.props
    if (!wallets.fetched) {
      fetchWallets()
    }
    if (!coins.fetching_coins && !coins.fetched) {
      fetchCoins()
    }
  }
	render() {
	const { coins, wallets } = this.props
	return coins.fetched && wallets.fetched  // make sure app state contains what i need
		? (
		  <ContentComponent
		    header="Overview"
		    subHeader="Manage your assets at a glance."
		  >
		  <ChartistGraph data={simpleLineChartData} type={'Line'} />
			</ContentComponent>
		)
		: <div>hi</div>
	}
}

// export default props => (
//   <ContentComponent
//     header="Overview"
//     subHeader="Manage your assets at a glance."
//   >
//     <pre>{JSON.stringify(props, null, 2)}</pre>
//   </ContentComponent>
// )
