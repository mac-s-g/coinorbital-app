import React, { Component } from "react"
import Styled from "styled-components"
import { Button, Loader } from "semantic-ui-react"

import RankedList from "./RankedList"
import ContentComponent from "./../ContentComponent"
import CoinDropdown from "./../../Inputs/CoinDropdown"

const ListContainer = Styled.div`
  margin: 1.67em 0 1.67em 0;
`

export default class extends Component {
  componentWillMount() {
    const { fetchWatchList, fetchCoins, coins } = this.props
    fetchWatchList()
    if (!coins.fetching_coins && !coins.list.length) {
      fetchCoins()
    }
  }

  getSortableList = () => {
    const { list } = this.props.coins

    return (
      <ListContainer>
        {list.length ? (
          <RankedList {...this.props} />
        ) : (
          <Loader inline active />
        )}
      </ListContainer>
    )
  }

  render() {
    const { watchList, requestAddToWatchList } = this.props
    return (
      <ContentComponent
        header="Coin Watch List"
        subHeader="Monitor coins that interest you"
      >
        {watchList.ranked.length ? this.getSortableList() : null}
        <Button onClick={requestAddToWatchList}>
          Add a Coin to your Watch List
        </Button>
      </ContentComponent>
    )
  }
}
