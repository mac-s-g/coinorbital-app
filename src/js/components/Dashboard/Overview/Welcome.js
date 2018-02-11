import React from "react"

import { project_info } from "./../../../constants"

export default () => (
  <div>
    <p>Welcome to {project_info.name}!</p>
    <p>Looks like you're just getting started.</p>
    <p>
      Get the ball rolling by opening a wallet and logging a couple
      transactions.
    </p>
  </div>
)
