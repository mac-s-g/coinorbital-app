import React, { Component } from "react"
import Styled from "styled-components"
import { Button, Icon, Loader } from "semantic-ui-react"

import RankedList from "./RankedList"
import ContentComponent from "./../ContentComponent"
import CoinDropdown from "./../../Inputs/CoinDropdown"

const ListContainer = Styled.div`
  margin: 1.67em 0 1.67em 0;
  position: relative;
  min-height: 3em;
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
    const { coins, watchList } = this.props

    return (
      <ListContainer>
        {!watchList.fetching && coins.list.length ? (
          watchList.ranked.length ? (
            <RankedList {...this.props} />
          ) : (
            <div>
              <Icon name="meh" size="big" />
              Your Watch List is empty
            </div>
          )
        ) : (
          <Loader active />
        )}
      </ListContainer>
    )
  }

  render() {
    const { watchList, requestAddToWatchList } = this.props
    return (
      <ContentComponent
        header="Coin Watch List"
        subHeader="Monitor coins that catch your eye"
        logo
      >
        {this.getSortableList()}
        <Button onClick={requestAddToWatchList}>
          Add Coins to your Watch List
        </Button>
      </ContentComponent>
    )
  }
}
