import React from "react"
import Styled from "styled-components"
import { Input } from "semantic-ui-react"
import DayPickerInput from "react-day-picker/DayPickerInput"

import MomentLocaleUtils, {
  formatDate,
  parseDate
} from "react-day-picker/moment"

import "react-day-picker/lib/style.css"

const DatePickerContainer = Styled.div`
  & .DayPickerInput {
    width: 100%;

    & > input {
      width: 100%;
      outline: 0;
      -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
      text-align: left;
      line-height: 1.21428571em;
      font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
      padding: .67857143em 1em;
      background: #fff;
      border: 1px solid rgba(34, 36, 38, 0.15);
      color: rgba(0, 0, 0, 0.87);
      border-radius: .28571429rem;
      -webkit-transition: box-shadow .1s ease,border-color .1s ease;
      transition: box-shadow .1s ease,border-color .1s ease;
      box-shadow: none;
    }
  }
`

export default ({ selected, onChange, minDate, maxDate }) => (
  <DatePickerContainer>
    <DayPickerInput
      value={selected}
      onDayChange={onChange}
      dayPickerProps={{
        selectedDays: selected,
        showOutsideDays: true,
        disabledDays: [
          {
            after: maxDate,
            before: minDate
          }
        ]
      }}
    />
  </DatePickerContainer>
)
