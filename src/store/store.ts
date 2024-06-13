import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';

export default configureStore({
  reducer: {
    user: userReducer
  },
});

// import { createSlice } from '@reduxjs/toolkit'
// export const counterSlice = createSlice({
//   name: 'counter',
//   initialState: {
//     count: 0,
//   },
//   reducers: {
//     increment: (state) => {
//       state.count += 1
//     },
//   },
// })

// export const { increment } = counterSlice.actions

// export default counterSlice.reducer
