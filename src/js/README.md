## This project uses the Redux framework.

Folders represent the Redux design pattern.

### containers

Containers connect action functions and app state with components via props.
Redux's `Provider` function is the mechanism to pass props to components.

### actions

Components can trigger changes to app state via actions.
Actions dispatch events and associated data to reducers.

### reducers

Reducers are responsible for maintaining the app's state.
Reducers listen to events dispatched by actions and update state when necessary.
State changes are propagated out to components as props via containers.

### store

The store sits between actoins and reducers.
Middleware can be added to the store to listen to dispatched actions and state changes (eg devtools).

### helpers

Helpers are utility javascript functions that may be shared across files.
