import React, { Component } from "react"
import Styled from "styled-components"
import { Container, Icon, Image, Statistic } from "semantic-ui-react"

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
  color: #aaa;
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
    color: #aaa;
  }
`

const CurrencyIcon = Styled.div`
  width: 44px;
`

const Price = Styled.div`
  width: 160px;
`

const Controls = Styled.div`
  float: right;
  & > .icon {
    cursor: pointer;
  }
`

export default class extends Component {
  state = { moveCursor: false }
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
