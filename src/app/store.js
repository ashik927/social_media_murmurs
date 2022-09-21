import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/posts/todosSlice';
import postsReducer from '../features/posts/postsSlice';

export default configureStore({
  reducer: {
    todos: todosReducer,
    posts: postsReducer,
  },
});
