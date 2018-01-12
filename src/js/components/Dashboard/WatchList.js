import React, { Component } from "react"
import Styled from "styled-components"
import DragList from "react-smooth-draggable-list"
import { Button } from "semantic-ui-react"

import ContentComponent from "./ContentComponent"
import CoinDropdown from "./../Inputs/CoinDropdown"

import { theme } from "./../../constants"

const ListContainer = Styled.div`
  padding-top: 1em;
`
const ListItem = Styled.div`
  background-color: ${theme.colors.well_gray};
  border-radius: 2px;
  height: 60px;
  padding: 4px 8px;
`

export default class extends Component {
  componentDidMount() {
    this.props.fetchWatchList()
  }

  getSortableList = coins => (
    <ListContainer>
      <DragList rowHeight={60}>
        {coins.map(coin => (
          <DragList.Item key={coin.symbol} as={ListItem}>
            {coin.symbol}
          </DragList.Item>
        ))}
      </DragList>
    </ListContainer>
  )

  render() {
    const { watchList, requestAddToWatchList } = this.props
    console.log("watchlist", watchList)
    return (
      <ContentComponent
        header="Coin Watch List"
        subHeader="Keep track of the coins you're interested in."
      >
        <Button onClick={requestAddToWatchList}>
          Add a Coin to your Watch List
        </Button>
        {watchList.ranked.length
          ? this.getSortableList(watchList.ranked)
          : null}
      </ContentComponent>
    )
  }
}
