import React from "react"
import Styled from "styled-components"
import { Input } from "semantic-ui-react"
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"

const InputComponent = Styled.div`
  & > div:not(.label),
    > div > .react-datepicker-wrapper,
    > div > .react-datepicker-wrapper > .react-datepicker__input-container,
    > div > .react-datepicker-wrapper > .react-datepicker__input-container > input {
    ${props => (props.stretch ? "width: 100%;" : null)}
  }
`

export default ({
  selected,
  onChange,
  fluid,
  showTimeSelect,
  dateFormat,
  timeFormat,
  timeInterval,
  minDate,
  maxDate
}) => (
  <Input as={InputComponent} stretch={!!fluid} fluid={!!fluid}>
    <DatePicker
      selected={selected}
      onChange={onChange}
      showTimeSelect={!!showTimeSelect}
      dateFormat={!!dateFormat ? dateFormat : "MM/DD/YYYY"}
      timeFormat={!!timeFormat ? timeFormat : "HH:mm"}
      timeInterval={!!timeInterval ? timeInterval : 15}
      minDate={!!minDate ? minDate : null}
      maxDate={!!maxDate ? maxDate : null}
    />
  </Input>
)
