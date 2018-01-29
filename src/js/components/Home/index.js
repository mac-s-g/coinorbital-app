import React, { Component } from "react"
import Styled from "styled-components"
import { Button, Container, Divider, Segment } from "semantic-ui-react"

import Header from "./Header"
import Footer from "./Footer"

import { project_info } from "./../../constants"

const SegmentContainer = Styled.div`
  padding: 8em 0em 10em 0em !important;
`
const SegmentHeader = Styled.div`
  calc(2rem - .14285714em) 0 1rem;
  font-size: 2em;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.87);
`
const SegmentContent = Styled.div`
  font-size: 1.33em;
  padding: 1em 0em;
`

const SegmentDivider = Styled.div`
  margin: 4em 0em !important;
`

export default props => (
  <div>
    <Header {...props} />

    <Segment as={SegmentContainer} vertical>
      <Container text>
        <SegmentHeader>Visualize Your Portfolio</SegmentHeader>
        <SegmentContent>
          Cryptocurrency trading involves hundreds of currencies and constant
          price fluctuations. It's tough to keep up with the value of your
          investments.
        </SegmentContent>
        <SegmentContent>
          Track the value of your investments by logging transactions.
          Transactions are plotted against market prices to help you measure
          your value over time.
        </SegmentContent>
        <Button
          as="a"
          size="large"
          onClick={e => props.navigateTo("/dashboard")}
        >
          Try the Dashboard
        </Button>
        <Divider as={SegmentDivider} />
        <SegmentHeader>Protect Your Privacy</SegmentHeader>
        <SegmentContent>
          The only one with your information should be you.{" "}
          <i>{project_info.name}</i> stores everything locally. None of your
          data is stored or processed remotely.
        </SegmentContent>
      </Container>
    </Segment>

    <Footer />
  </div>
)
