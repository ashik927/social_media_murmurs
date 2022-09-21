import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

export const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    addPost: (state, action) => {
      const post = {
        id: uuid(),
        text: action.payload,
      };


      return [...state, post];
    },
    updatePost: (state, action) => {
      const { id, text } = action.payload;

      const post = state.find((post) => post.id === id);
      post.text = text;
    },
    deletePost: (state, action) => {
      return state.filter((post) => post.id !== action.payload);
    },
  },
});

export const { addPost, updatePost, deletePost } = postsSlice.actions;

export default postsSlice.reducer;
