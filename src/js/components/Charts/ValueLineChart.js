import React, { Component } from "react"
import PropTypes from "prop-types"
import { Button, Header, Icon, Loader, List, Message } from "semantic-ui-react"
import Styled from "styled-components"
import moment from "moment"
import { ReferenceDot, ReferenceLine, Label } from "recharts"

import Line from "./Line"

import formatNumberForDisplay from "./../../helpers/formatNumberForDisplay"
import round from "./../../helpers/round"

import { theme } from "./../../constants"

const MS_PER_SECOND = 1000
const HISTO_AGGREGATE = 1
const HIST_EXPIRATION_MS = 1000 * 30 //30s

const DEFAULT_WIDTH = 700
const DEFAULT_HEIGHT = 300

const TIME_IDX_FORMAT = "YYYY-MM-DD H:mm:ss"

const LineChartComponent = Styled.div`
  height: ${props => (props.responsive ? "100%" : `${props.height}px`)};
  width: ${props => (props.responsive ? "100%" : `${props.width}px`)};
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
  top: -24px;
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
    width: DEFAULT_WIDTH,
    responsive: false,
    loader: true,
    color: theme.colors.blue,
    orientationY: "right",
    currentPriceLine: false
  }

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    responsive: PropTypes.bool,
    coins: PropTypes.object.isRequired,
    wallets: PropTypes.object.isRequired,
    fetchTimeSeries: PropTypes.func.isRequired,
    color: PropTypes.string,
    orientationY: PropTypes.string
  }

  state = {
    chartType: "week"
  }

  forceUpdate = false
  tsFilterKeys = []
  transactions = {}

  chartTypes = {
    year: {
      type: "day",
      limit: 365,
      aggregate: 1
    },
    month: {
      type: "hour",
      limit: 24 * 30 / 4,
      aggregate: 4
    },
    week: {
      type: "hour",
      limit: 24 * 7
    },
    day: {
      type: "minute",
      limit: 60 * 24 / 10,
      aggregate: 10
    }
  }

  constructor(props) {
    let transactions = {}
    super(props)
    //fetch historical coin values
    this.init(props, props.chartType ? props.chartType : this.state.chartType)
    //prepare transaction snowball
    for (const [name, wallet] of Object.entries(props.wallets)) {
      if (!transactions[wallet.symbol]) {
        transactions[wallet.symbol] = wallet.transactions
      } else {
        transactions[wallet.symbol].concat(wallet.transactions)
      }
    }
    this.prepareTransactionSnowball(transactions)
  }

  componentWillReceiveProps(props) {
    if (this.isExpired()) {
      this.init(props, this.state.chartType)
    }
  }

  shouldComponentUpdate(props) {
    const update = !this.isLoaded() || this.isExpired() || this.forceUpdate
    this.forceUpdate = false
    return update
  }

  init = (props, chartType = "week") => {
    const { wallets } = props
    this.state.chartType = chartType
    this.tsFilterKeys = []
    this.fetchTime = Date.now()
    let tsFilter, tsFilterKey

    for (const [name, wallet] of Object.entries(wallets)) {
      //query for historical coin prices
      tsFilter = {
        symbol: wallet.symbol,
        aggregate: HISTO_AGGREGATE,
        ...this.chartTypes[chartType]
      }
      tsFilterKey = JSON.stringify(tsFilter)
      if (this.tsFilterKeys.indexOf(tsFilterKey) === -1) {
        this.tsFilterKeys.push(tsFilterKey)
        props.fetchTimeSeries(tsFilter, tsFilterKey)
      }
    }
  }

  prepareTransactionSnowball = transactions_by_coin => {
    for (const [symbol, txs] of Object.entries(transactions_by_coin)) {
      let sorted = txs.sort(
        (a, b) =>
          new Date(!!a.time_transacted ? a.time_transacted : a.time_recorded) -
          new Date(!!b.time_transacted ? b.time_transacted : b.time_recorded)
      )

      this.transactions[symbol] = {}
      let aggr = 0
      for (let tx of sorted) {
        //store rolling aggr by time
        let time = moment(
          !!tx.time_transacted ? tx.time_transacted : tx.time_recorded
        ).format(TIME_IDX_FORMAT)
        aggr += (tx.type === "received" ? 1 : -1) * tx.quantity
        this.transactions[symbol][time] = aggr
      }
    }
  }

  isExpired = () => {
    return this.fetchTime < Date.now() - HIST_EXPIRATION_MS
  }

  isLoaded = () => {
    const { time_series } = this.props.coins
    let loaded = true
    for (let key of this.tsFilterKeys) {
      loaded &= time_series[key] && !!time_series[key].result
    }
    return loaded
  }

  fetchSuccess = series => this.isLoaded() && !!series && !!series.length

  formatForChart = series_set =>
    Object.keys(series_set).reduce((acc, symbol) => {
      let tx_times = Object.keys(this.transactions[symbol])
      let tx_time_ptr = -1
      return series_set[symbol].map((val, idx) => {
        let tx_timestamp = moment(val.time * MS_PER_SECOND)
        let tx_timestamp_idx = tx_timestamp.format(TIME_IDX_FORMAT)
        while (
          !!tx_times[tx_time_ptr + 1] &&
          tx_timestamp > moment(tx_times[tx_time_ptr + 1])
        ) {
          tx_time_ptr++
        }
        let tx_value = !!tx_times[tx_time_ptr]
          ? this.transactions[symbol][tx_times[tx_time_ptr]] * val.close
          : 0
        if (acc[idx]) {
          return {
            ...acc[idx],
            value: tx_value + acc[idx].value
          }
        } else {
          return {
            timestamp: tx_timestamp,
            date: moment(val.time * MS_PER_SECOND).format("MMM D"),
            time: moment(val.time * MS_PER_SECOND).format("h:mm a"),
            value: tx_value
          }
        }
      })
    }, [])

  render() {
    const {
      tsFilterKeys,
      isLoaded,
      formatForChart,
      fetchSuccess,
      chartTypes,
      init,
      state,
      props
    } = this
    const {
      coins,
      width,
      height,
      responsive,
      color,
      orientationY,
      animate = false,
      timeControl = true,
      displayYAxis = true,
      displayXAxis = true,
      loader = true,
      wallets
    } = props
    const { time_series } = coins
    const { expanded, chartType } = state

    let series
    try {
      series = isLoaded()
        ? formatForChart(
            tsFilterKeys.reduce(
              (acc, key) => ({
                ...acc,
                [JSON.parse(key).symbol]: time_series[key].result
              }),
              {}
            )
          )
        : null
    } catch (e) {}

    return (
      <LineChartComponent height={height} width={width} responsive={responsive}>
        {fetchSuccess(series) && timeControl ? (
          <Button.Group as={ChartControls} size="mini" compact>
            {Object.keys(chartTypes).map(type => (
              <Button
                key={type}
                active={type === chartType}
                onClick={() => {
                  this.forceUpdate = true
                  init(props, type)
                }}
              >
                {type}
              </Button>
            ))}
          </Button.Group>
        ) : null}
        {fetchSuccess(series) ? (
          <Line
            height={height}
            width={width}
            responsive
            displayXAxis={displayXAxis}
            displayYAxis={displayYAxis}
            orientationY={orientationY}
            data={series}
            lines={[
              {
                type: "monotone",
                dataKey: "value",
                name: "value",
                dot: false,
                isAnimationActive: animate,
                animationEasing: "ease-out",
                animationDuration: 800,
                stroke: color,
                fill: color,
                fillOpacity: 0.2,
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
        ) : !isLoaded() ? (
          loader ? (
            <Loader active inline="centered" />
          ) : (
            <div />
          )
        ) : (
          <Message
            style={{ marginTop: "2em" }}
            icon="ban"
            header="Fetch Error"
            content={`An error occurred while loading historical data.`}
          />
        )}
      </LineChartComponent>
    )
  }
}
