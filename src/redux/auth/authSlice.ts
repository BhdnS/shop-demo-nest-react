import { createSlice } from '@reduxjs/toolkit'
import { RoleEnum } from '../../types/enums'

interface IInitialState {
  token: string | null
  isAuth: boolean
  role: RoleEnum
}

const initialState: IInitialState = {
  token: null,
  isAuth: false,
  role: RoleEnum.USER,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, { payload }) {
      state.token = payload.token
      state.isAuth = payload.isAuth
      state.role = payload.role
    },
    logOut(state) {
      state.token = null
      state.isAuth = false
      state.role = RoleEnum.USER
    },
    setToken(state, { payload }) {
      state.token = payload
    },
  },
})

export const { setCredentials, logOut, setToken } = authSlice.actions
export default authSlice.reducer
