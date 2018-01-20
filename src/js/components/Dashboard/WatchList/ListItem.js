import React, { Component } from "react"
import Styled from "styled-components"
import { Container, Icon, Image, Statistic } from "semantic-ui-react"
import { rgba } from "polished"

import formatNumber from "./../../../helpers/formatNumberForDisplay"
import { theme } from "./../../../constants"

import * as svgs from "./CoinLogos"

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

const CurrencyIcon = Styled.div`
  width: 44px;
`

const Price = Styled.div`
  width: 170px;
  @media (max-width: 861px) {
    display: none !important;
  }
`

const Deltas = Styled.div`
  width: 140px;
  @media (max-width: 991px) {
    display: none !important;
  }
`

const DeltaBadge = Styled.div`
  height: 32px;
  width: 32px;
  border-radius: 32px;
  display: inline-block;
  padding: 4px;
  /*color: ${({ color }) => color};*/
  color: white;
  font-weight: bold;
  border: 1px solid ${({ color }) => color};
  /*box-shadow: 0 1px 2px 0 rgba(34,36,38,.15);*/
  background-color: ${({ color }) => rgba(color, 0.6)};
  text-align: center;
  vertical-align: middle;
  margin-right: 10px;
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
        <CurrencyIcon>
          <CurrencyLogo symbol={coin.symbol} />
        </CurrencyIcon>
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
          <DeltaBadge
            circular
            color={this.calculateDeltaColor(coin.percent_change_1h)}
          >
            1h
          </DeltaBadge>
          <DeltaBadge
            circular
            color={this.calculateDeltaColor(coin.percent_change_24h)}
          >
            1d
          </DeltaBadge>
          <DeltaBadge
            circular
            color={this.calculateDeltaColor(coin.percent_change_7d)}
          >
            7d
          </DeltaBadge>
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

const CurrencyLogo = ({ symbol }) =>
  svgs[symbol.toLowerCase()] ? (
    <Image src={svgs[symbol.toLowerCase()]} />
  ) : (
    <Icon name="image" size="big" color="grey" />
  )
