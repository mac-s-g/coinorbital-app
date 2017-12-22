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
        <SegmentHeader>Visualize your Value</SegmentHeader>
        <SegmentContent>
          Track the value of your crypto portfolio by logging snapshots of your
          transactions. Transactions are plotted against market data to help you
          measure your value over time.
        </SegmentContent>
        <Button
          as="a"
          size="large"
          onClick={e => props.navigateTo("/dashboard")}
        >
          Try the Dashboard
        </Button>
        <Divider as={SegmentDivider} />
        <SegmentHeader>Privacy is Paramount</SegmentHeader>
        <SegmentContent>
          <i>{project_info.name}</i> doesn't get in your way. User activity and
          profile information is all stored locally. We don't store, process, or
          share any data that you use to track your coins.
        </SegmentContent>
      </Container>
    </Segment>

    <Footer />
  </div>
)
