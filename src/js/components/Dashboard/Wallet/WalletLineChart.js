import React, { Component } from "react"
import PropTypes from "prop-types"
import { Button, Header, Icon, Loader, List } from "semantic-ui-react"
import Styled from "styled-components"
import moment from "moment"

import SubHeader from "./../SubHeader"
import Line from "./../../Charts/Line"

import formatNumberForDisplay from "./../../../helpers/formatNumberForDisplay"
import round from "./../../../helpers/round"

import { theme } from "./../../../constants"

const MS_PER_SECOND = 1000
const HISTO_AGGREGATE = 1
const HIST_EXPIRATION_MS = 1000 * 60 //60s

const DEFAULT_WIDTH = 700
const DEFAULT_HEIGHT = 300

const WalletLineChart = Styled.div`
  margin-top: 2em;
  display: inline-block;
`

const LineChartComponent = Styled.div`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  position: relative;

  & .xAxis text.recharts-cartesian-axis-tick-value {
    font-size: 11px;
    transform: translate(0px, 4px);
  }

  & .loader {
    top: ${props => props.height / 3}px !important;
  }
`

const ChartControls = Styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 1000;
`

const ToolTipComponent = Styled.div`
  padding: 4px 7px;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray};
  border-radius: 3px;
`

const ToolTipSubHeader = Styled.div`
  font-size: 10px;
  color: ${theme.colors.gray};
`

const ToolTipLabel = Styled.span`
  color: ${theme.colors.dark_gray};
`

const ToolTipValue = Styled.span`
  color: ${theme.colors.blue};
`

export default class extends Component {
  static defaultProps = {
    height: DEFAULT_HEIGHT,
    width: DEFAULT_WIDTH
  }

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    coins: PropTypes.object,
    wallet: PropTypes.object,
    fetchTimeSeries: PropTypes.func
  }

  state = {
    chart_type: "week"
  }

  chartTypes = {
    year: {
      type: "day",
      limit: 366 / 2,
      aggregate: 2
    },
    month: {
      type: "hour",
      limit: 24 * 30 / 6,
      aggregate: 6
    },
    week: {
      type: "hour",
      limit: 24 * 7
    },
    day: {
      type: "minute",
      limit: 60 * 24 / 15,
      aggregate: 15
    }
  }

  constructor(props) {
    super(props)
    this.init(props, this.state.chartType)
  }

  init = (props, chartType = "week") => {
    this.state.chartType = chartType
    this.tsFilter = {
      symbol: props.wallet.symbol,
      aggregate: HISTO_AGGREGATE,
      ...this.chartTypes[chartType]
    }
    this.tsFilterKey = JSON.stringify(this.tsFilter)
    this.fetchTime = Date.now()
    props.fetchTimeSeries(this.tsFilter, this.tsFilterKey)
  }

  componentWillReceiveProps(props) {
    if (props.wallet.symbol !== this.props.wallet.symbol || this.isExpired()) {
      this.init(props, this.state.chartType)
    }
  }

  shouldComponentUpdate(props) {
    return (
      props.wallet.symbol !== this.props.wallet.symbol ||
      !this.isLoaded() ||
      this.isExpired()
    )
  }

  isExpired = () => {
    return this.fetchTime < Date.now() - HIST_EXPIRATION_MS
  }

  isLoaded = () => {
    const { time_series } = this.props.coins
    return (
      time_series[this.tsFilterKey] && !!time_series[this.tsFilterKey].result
    )
  }

  formatForChart = data =>
    data.map(datum => ({
      ...datum,
      date: moment(datum.time * MS_PER_SECOND).format("MMM D"),
      time: moment(datum.time * MS_PER_SECOND).format("h:mm a")
    }))

  render() {
    const { coins, wallet } = this.props
    const { time_series } = coins
    const { tsFilterKey } = this
    const series = this.isLoaded() ? time_series[this.tsFilterKey].result : []

    return (
      <WalletLineChart>
        <SubHeader>{coins.by_symbol[wallet.symbol].name} Trendline</SubHeader>
        <LineChartComponent height={DEFAULT_HEIGHT} width={DEFAULT_WIDTH}>
          <Button.Group as={ChartControls} size="mini" compact>
            {Object.keys(this.chartTypes).map(type => (
              <Button
                key={type}
                active={type === this.state.chartType}
                onClick={() => {
                  this.init(this.props, type)
                }}
              >
                {type}
              </Button>
            ))}
          </Button.Group>
          {!this.isLoaded() ? (
            <Loader active inline="centered" />
          ) : (
            <Line
              height={DEFAULT_HEIGHT}
              width={DEFAULT_WIDTH}
              data={this.formatForChart(time_series[this.tsFilterKey].result)}
              lines={[
                {
                  type: "monotone",
                  dataKey: "close",
                  name: "price",
                  dot: false,
                  isAnimationActive: false,
                  stroke: theme.colors.blue,
                  fill: theme.colors.blue,
                  fillOpacity: 0.2,
                  strokeWidth: "2px"
                },
                {
                  type: "monotone",
                  dataKey: "transactions",
                  name: "transactions",
                  dot: true,
                  isAnimationActive: false,
                  stroke: theme.colors.gold,
                  fill: theme.colors.white,
                  fillOpacity: 0,
                  strokeWidth: "2px"
                }
              ]}
              dataKeyX="date"
              tooltip={({ payload, label, ...rest }) => (
                <ToolTipComponent>
                  <Header as="h4">
                    {label}
                    <ToolTipSubHeader>
                      {payload[0] ? payload[0].payload.time : null}
                    </ToolTipSubHeader>
                  </Header>
                  <List>
                    {payload.map(line => (
                      <List.Item
                        key={line.name}
                        name={line.name}
                        style={{
                          display: line.value == 0 ? "none" : "block"
                        }}
                      >
                        <ToolTipLabel>{line.name}: </ToolTipLabel>
                        <ToolTipValue>
                          ${formatNumberForDisplay(round(line.value, 2))}
                        </ToolTipValue>
                      </List.Item>
                    ))}
                  </List>
                </ToolTipComponent>
              )}
            />
          )}
        </LineChartComponent>
      </WalletLineChart>
    )
  }
}
