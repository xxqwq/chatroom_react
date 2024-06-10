import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
  reducer: {
    // counter:counterReduer
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
