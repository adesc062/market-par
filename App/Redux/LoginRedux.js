import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['username', 'password'],
  loginSuccess: ['username'],
  loginFailure: ['error'],
  logout: null,
  changeFund: ['fund'],
  changeFundasdas1: (fund) => ({ type: 'CHANGE_FUND_1', total: fund })
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  username: null,
  error: null,
  fetching: false,
  fund1: 'xD',
  fund2: '',
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state) => state.merge({ fetching: true })

// we've successfully logged in
export const success = (state, { username }) =>
  state.merge({ fetching: false, error: null, username })

// we've had a problem logging in
export const failure = (state, { error }) =>
  state.merge({ fetching: false, error })

// we've logged out
export const logout = (state) => INITIAL_STATE

// changing fund1
//export const fund1 = (state, action) =>
 // state.merge({ fund1: 'sdsa' })

/*
export const fund1 = (state = INITIAL_STATE, action) => {
  return { ...state, fund1: 'asdas' }
} */
export const fund = (state, { fund }) => state.merge({ fund1: fund })


/* ------------- Hookup Reducers To Types ------------- */

export const HANDLERS = {
                          [Types.LOGIN_REQUEST]: request,
                          [Types.LOGIN_SUCCESS]: success,
                          [Types.LOGIN_FAILURE]: failure,
                          [Types.LOGOUT]: logout,
                          [Types.CHANGE_FUND]: fund
                        }

export const reducer = createReducer(INITIAL_STATE, HANDLERS)

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (loginState) => loginState.username !== null
