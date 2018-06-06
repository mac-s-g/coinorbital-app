import React, { Component } from "react"
import Styled from "styled-components"
import { Button, Container, Divider, Segment } from "semantic-ui-react"

import Header from "./Header/"
import Footer from "./Footer"

import ContactMe from "./../Modal/ContactMe"
import Donate from "./../Modal/Donate"
import Roadmap from "./../Modal/Roadmap"
import LogoName from "./../Logo/Name"
import CoinLineChart from "./../Charts/CoinLineChart"

import SampleTransactions from "./SampleTransactions"

import { theme } from "./../../constants"

const SegmentContainer = Styled.div`
  padding: 4em 0em 8em 0em !important;
`
const SegmentHeader = Styled.div`
  calc(2rem - .14285714em) 0 1rem;
  font-size: 2em;
  color: rgba(0, 0, 0, 0.87);
`
const SegmentContent = Styled.div`
  font-size: 1.33em;
  padding: 1em 0em;
`

const SegmentDivider = Styled.div`
  margin: 4em 0em !important;
`

const Warning = Styled.span`
  color: ${theme.colors.red};
  font-weight: bold;
  font-style: italic;
`

const IndexButton = Styled.a`
  margin: 2px 6px 2px 0px !important;
`

const DemoChart = Styled.div`
  position: relative;
  height: 12em;
  margin: 3em 0 2em 0;
`

const DemoLabel = Styled.div`
  position: absolute;
  left: 0em;
  top: 0em;
  color: ${theme.colors.gray};
`

export default ({ modals, closeModal, ...props }) => (
  <div>
    <Header {...props} />

    {/* index-content class is for scroll function reference */}
    <Segment as={SegmentContainer} vertical class="index-content">
      <Container text>
        <SegmentHeader>Visualize Your Portfolio</SegmentHeader>
        <SegmentContent>
          Cryptocurrency trading involves hundreds of currencies and constant
          price fluctuations. It's not easy to keep up with the value of your
          investments over time.
        </SegmentContent>
        <SegmentContent>
          <LogoName /> lets you visualize your value in a volatile market.
          Compare your transactions with real-time and historical market prices
          to see what's working and what's not.
        </SegmentContent>
        {!!props.coins.by_symbol &&
          !!props.coins.by_symbol["BTC"] && (
            <DemoChart>
              <DemoLabel>Sample Transaction Chart</DemoLabel>
              <CoinLineChart
                chartType="year"
                symbol="BTC"
                coins={props.coins}
                fetchTimeSeries={props.fetchTimeSeries}
                responsive
                transactions={SampleTransactions}
                displayYAxis={false}
              />
            </DemoChart>
          )}
        <Button
          as={IndexButton}
          size="large"
          onClick={e => props.navigateTo("/dashboard")}
        >
          Try the Dashboard
        </Button>
        <Divider as={SegmentDivider} />
        <SegmentHeader>
          <LogoName /> is Free!
        </SegmentHeader>
        <SegmentContent>No Ads. No Fees. Just Free.</SegmentContent>
        <SegmentContent>
          I'm looking for user feedback! If feedback is positive, more features
          will be available in the future. <LogoName /> does not generate
          revenue outside of donations. If you like the project, consider
          supporting development with a donation.
        </SegmentContent>
        <Button as={IndexButton} size="large" onClick={props.requestContactMe}>
          Provide Feedback
        </Button>
        <Button as={IndexButton} size="large" onClick={props.requestDonate}>
          Send a Donation
        </Button>
      </Container>
    </Segment>

    <Footer {...props} />

    {modals.contact_me ? (
      <ContactMe donate={props.requestDonate} close={closeModal} />
    ) : null}
    {modals.donate ? <Donate close={closeModal} /> : null}
    {modals.roadmap ? (
      <Roadmap contactMe={props.requestContactMe} close={closeModal} />
    ) : null}
  </div>
)
