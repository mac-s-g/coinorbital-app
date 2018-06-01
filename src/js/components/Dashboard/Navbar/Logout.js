import React, { Component } from "react"
import { Dropdown, Icon, Image, Menu } from "semantic-ui-react"
import Styled from "styled-components"

const DropdownButton = Styled.div`
  & > * {
    vertical-align: middle;
  }
  & > .profile-name {
    margin-right: 10px;
    display: inline-block;

    & > .profile-name-key {
      font-size: 11px;
      font-style: italic;
      margin-bottom: 2px;
    }
    & > .profile-name-val {
      font-size: 1.07142857rem;
    }

    @media (max-width: 768px) {
      display: none !important;
    }
  }
`

export default class extends Component {
  state = { profile: false }

  async componentWillMount() {
    const { userProfile, getProfile } = this.props.auth
    let profile
    if (!userProfile) {
      this.setState({ profile: await getProfile() })
    } else {
      this.setState({ profile: userProfile })
    }
  }

  render() {
    const { auth, clearUserState, onClick } = this.props
    const { profile } = this.state

    return (
      <Menu.Menu position="right">
        <Dropdown
          item
          icon={
            profile.name ? (
              <DropdownButton>
                <div class="profile-name">
                  <div class="profile-name-key">logged in as:</div>
                  <div class="profile-name-val">{profile.name}</div>
                </div>
                <Image size="mini" circular src={profile.picture} inline />
              </DropdownButton>
            ) : null
          }
        >
          <Dropdown.Menu style={{ marginTop: 0 }}>
            <Dropdown.Item
              icon="log out"
              content="Log Out"
              onClick={() => {
                clearUserState()
                auth.logout()
              }}
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    )
  }
}
