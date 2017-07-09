import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import Finance from '../Utils/Finance'

/* ------------- Types and Action Creators ------------- */

const finishRequestFunction = () => {
  return (dispatch, getState) => {
    dispatch(finishRequestStart())
    return Finance.getResults(2000, 'AAPL', 'MSFT')
  }
}

const { Types, Creators } = createActions({
  loginRequest: ['username', 'password'],
  loginSuccess: ['username'],
  loginFailure: ['error'],
  logout: null,
  changeFund: ['fund'],
  changeFund2: ['fund'],
  finishRequest: finishRequestFunction,
  finishRequestStart: null,
  finishRequestEnd: null,
  randomizeYear: null,
  selectYear: ['year']
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  username: null,
  error: null,
  fetching: false,
  year: 2000,
  fund1: '',
  fund2: ''
})

/* ------------- Reducers ------------- */

// we're attempting to login
// export const request = (state) => state.merge({ fetching: true })

// we've successfully logged in
export const success = (state, { username }) =>
  state.merge({ fetching: false, error: null, username })

// we've had a problem logging in
export const failure = (state, { error }) =>
  state.merge({ fetching: false, error })

// we've logged out
export const logout = (state) => INITIAL_STATE

export const fund = (state, { fund }) => state.merge({ fund1: fund })
export const fund2 = (state, { fund }) => state.merge({ fund2: fund })
export const request = (state) => state.merge({ fetching: true })
export const requestEnd = (state) => state.merge({ fetching: false })
export const year = (state, action) => {
  switch (action.type) {
    case 'RANDOMIZE_YEAR':
      return state.merge({fund1: '', fund2: '', year: Math.floor(Math.random() * (2015 - 1980 + 1) + 1980)})
    case 'SELECT_YEAR':
      return state.merge({fund1: '', fund2: '', year: action.year})
    default:
      return state
  }
}
/* ------------- Hookup Reducers To Types ------------- */

export const HANDLERS = {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGOUT]: logout,
  [Types.CHANGE_FUND]: fund,
  [Types.CHANGE_FUND2]: fund2,
  [Types.FINISH_REQUEST_START]: request,
  [Types.FINISH_REQUEST_END]: requestEnd,
  [Types.RANDOMIZE_YEAR]: year,
  [Types.SELECT_YEAR]: year
}

export const reducer = createReducer(INITIAL_STATE, HANDLERS)

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (loginState) => loginState.username !== null
