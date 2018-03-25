import { keyframes } from "styled-components"

export default keyframes`
  0% {transform: scale(1);}
  20% {transform: scale(1.15);}
  100% {transform: scale(1);}
`

/* example usage */
/*
const Example = Styled.div`
    & i.icon, i.image {
      opacity: 1 !important;
      animation: ${Pulse} 300ms ease-out;
    }
  }
`
*/
