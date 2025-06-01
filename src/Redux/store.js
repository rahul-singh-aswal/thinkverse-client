import { configureStore } from '@reduxjs/toolkit';

import authSliceReducer from './Slices/AuthSlice.js';
import courseSliceReducer from './Slices/courseSlice.js';
import razorpaySliceReducer from './Slices/razorpaySlice.js';
import lectureSliceReducer from './Slices/lectureSlices.js';
import statSliceReducer from './Slices/statSlice.js';


const store = configureStore({
  reducer: { auth: authSliceReducer, course: courseSliceReducer, razorpay: razorpaySliceReducer, lecture: lectureSliceReducer, stat: statSliceReducer,},
  devTools: true,
});

export default store;
