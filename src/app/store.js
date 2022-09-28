import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/Auth/authSlice';
import postsReducer from '../features/posts/postsSlice';

export default configureStore({
  reducer: {
    posts: postsReducer,
    auth:authSlice,
  },
});
