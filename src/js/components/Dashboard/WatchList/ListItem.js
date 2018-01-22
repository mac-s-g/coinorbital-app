import React, { Component } from "react"
import Styled from "styled-components"
import { Container, Icon, Image, Statistic } from "semantic-ui-react"
import { rgba } from "polished"

import CoinLogo from "./../../CoinLogo/"

import formatNumber from "./../../../helpers/formatNumberForDisplay"
import { theme } from "./../../../constants"

const ItemContainer = Styled.div`
  cursor: ${({ moveCursor }) => (moveCursor ? "move" : "grab")};
  border-radius: 2px;
  padding: 8px 8px;
  height: 100%;
  width: 100%;
  & > div {
    display: inline-block;
    vertical-align: top;
  }
  & * {
    cursor: ${({ moveCursor }) => (moveCursor ? "move !important" : "grab")};
  }
`

const Rank = Styled.div`
  width: 36px;
  font-size: 26px;
  display: inline-block;
  font-style: italic;
  font-weight: bold;
  color: ${theme.colors.gray};
  margin-top: 0.2em;
`

const Name = Styled.div`
  width: 150px;
  margin-right: 0.67em;
  & :first-child {
    height: 22px;
    font-size: 1.5rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  & :nth-child(2) {
    font-weight: bold;
    font-size: 10px;
    color: ${theme.colors.gray};
  }
`

const CoinIcon = Styled.div`
  width: 44px;
`

const Price = Styled.div`
  width: 180px;
  @media (max-width: 876px) {
    display: none !important;
  }
`

const Deltas = Styled.div`
  width: 142px;
  @media (max-width: 1016px) {
    display: none !important;
  }
`

const DeltaStat = Styled.div`
  display: inline-block;
  color: ${({ color }) => color};
  font-weight: bold;
  text-align: center;
  vertical-align: top;
  margin-right: 14px;
`

const Controls = Styled.div`
  float: right;
  & > .icon {
    cursor: pointer;
  }
`

export default class extends Component {
  state = { moveCursor: false }
  calculateDeltaColor = delta => {
    if (delta > 0) {
      return theme.colors.green
    } else if (delta < 0) {
      return theme.colors.red
    } else {
      return theme.colors.gray
    }
  }
  calculateIconName = delta => {
    if (delta > 0) {
      return "up arrow"
    } else if (delta < 0) {
      return "down arrow"
    } else {
      return "ban"
    }
  }
  render() {
    const { coin, rank, requestCoinInfo, removeFromWatchList } = this.props
    const { moveCursor } = this.state

    return (
      <ItemContainer
        onMouseDown={e => this.setState({ moveCursor: true })}
        onMouseUp={e => this.setState({ moveCursor: false })}
        moveCursor={moveCursor}
      >
        <Rank>{rank}</Rank>
        <CoinIcon>
          <CoinLogo symbol={coin.symbol} />
        </CoinIcon>
        <Name>
          <div>{coin.name}</div>
          <div>{coin.symbol}</div>
        </Name>
        <Price>
          <Statistic size="mini" horizontal>
            <Statistic.Value>${formatNumber(coin.price_usd)}</Statistic.Value>
            <Statistic.Label>USD</Statistic.Label>
          </Statistic>
        </Price>
        <Deltas>
          <DeltaStat color={this.calculateDeltaColor(coin.percent_change_1h)}>
            <Icon
              name={this.calculateIconName(coin.percent_change_1h)}
              size="small"
            />
            1h
          </DeltaStat>
          <DeltaStat color={this.calculateDeltaColor(coin.percent_change_24h)}>
            <Icon
              name={this.calculateIconName(coin.percent_change_24h)}
              size="small"
            />
            1d
          </DeltaStat>
          <DeltaStat color={this.calculateDeltaColor(coin.percent_change_7d)}>
            <Icon
              name={this.calculateIconName(coin.percent_change_7d)}
              size="small"
            />
            7d
          </DeltaStat>
        </Deltas>
        <Controls>
          <Icon
            size="large"
            name="info circle"
            style={{ color: theme.colors.inverted }}
            onMouseDown={e => e.stopPropagation()}
            onClick={e => requestCoinInfo(coin.symbol)}
          />
          <Icon
            size="large"
            name="remove circle"
            style={{ color: theme.colors.red }}
            onMouseDown={e => e.stopPropagation()}
            onClick={e => removeFromWatchList(coin.symbol)}
          />
        </Controls>
      </ItemContainer>
    )
  }
}
