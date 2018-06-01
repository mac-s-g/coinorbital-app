import React, { Component } from "react"
import List from "react-smooth-draggable-list"
import Styled from "styled-components"

import ListItem from "./ListItem"

const RANK_IDX_OFFSET = 1

export default class extends Component {
  state = {
    ranked: [],
    order: [],
    pending_change: false
  }

  componentWillMount() {
    this.state.ranked = this.props.watchList.ranked
    this.state.order = Array.from(this.state.ranked.keys())
  }

  componentWillReceiveProps(nextProps) {
    const { ranked } = nextProps.watchList
    if (ranked.length != this.state.ranked.length) {
      this.setState({ ranked: ranked, order: Array.from(ranked.keys()) })
    }
  }

  render() {
    const {
      reorderWatchList,
      removeFromWatchList,
      requestCoinChart,
      requestCoinInfo,
      coins
    } = this.props
    const { ranked, order, pending_change } = this.state

    return (
      <List
        rowHeight={64}
        gutter={0}
        onReOrder={order => {
          this.setState({ order: order, pending_change: true })
        }}
        order={order}
      >
        {ranked.map((symbol, idx) => (
          <List.Item
            key={`${symbol}.${idx}`}
            onMouseUp={e => {
              if (pending_change) {
                reorderWatchList(order.map(idx => ranked[idx]))
                this.setState({ pending_change: false })
              }
            }}
          >
            <ListItem
              coin={coins.by_symbol[symbol]}
              rank={order.indexOf(idx) + RANK_IDX_OFFSET}
              requestCoinChart={requestCoinChart}
              requestCoinInfo={requestCoinInfo}
              removeFromWatchList={removeFromWatchList}
            />
          </List.Item>
        ))}
      </List>
    )
  }
}
