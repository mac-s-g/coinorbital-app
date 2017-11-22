import React from 'react'
import Styled from 'styled-components'

import ChartsIndex from './charts/'

import { constants } from './../../constants'

const { project_info } = constants;

const Container = Styled.div`
  font-family: 'arial';
`

const Main = () => (
  <Container>
    <h1>{project_info.name}</h1>
    <ChartsIndex />
  </Container>
)

export default Main
