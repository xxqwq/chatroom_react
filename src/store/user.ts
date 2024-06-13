import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
  nickname: string
  email: string
  phone: string
  location: string
  education: string
  sex: string
  birthday: string
  signature: string
}

const initialState: UserInfo = {
  nickname: '',
  email: '',
  phone: '',
  location: '',
  education: '',
  sex: '',
  birthday: '',
  signature: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: initialState
  },
  reducers: {
    setUserInfo(state, action: PayloadAction<UserInfo>) {
      state.userInfo = action.payload
    },
    clearUserInfo(state) {
      state.userInfo = initialState
    }
  }
}
)

export const { setUserInfo,clearUserInfo } = userSlice.actions
export default userSlice.reducer