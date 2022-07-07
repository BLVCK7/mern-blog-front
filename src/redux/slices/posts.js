import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

// export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
//   const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/posts`);
//   return data;
// });

// export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
//   const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/tags`);
//   return data;
// });

// export const fetchRemovePost = createAsyncThunk('posts/fetchTags', async (id) => {
//   await axios.delete(`${process.env.REACT_APP_API_URL}/posts/${id}`);
// });

// export const fetchGetPost = createAsyncThunk('posts/fetchGetPost', async (id) => {
//   await axios.get(`${process.env.REACT_APP_API_URL}/posts/${id}`);
// });

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get(`http://localhost:4444/posts`);
  return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get(`http://localhost:4444/tags`);
  return data;
});

export const fetchRemovePost = createAsyncThunk('posts/fetchTags', async (id) => {
  await axios.delete(`http://localhost:4444/posts/${id}`);
});

export const fetchGetPost = createAsyncThunk('posts/fetchGetPost', async (id) => {
  const { data } = await axios.get(`http://localhost:4444/posts/${id}`);
  return data;
});

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    // Получение статей
    [fetchPosts.pending]: (state) => {
      state.posts.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },
    // Получение тегов
    [fetchTags.pending]: (state) => {
      state.tags.status = 'loading';
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = 'error';
    },
    // Удаление поста
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg);
    },
    // Получение статьи и комментов
    [fetchGetPost.pending]: (state) => {
      state.posts.status = 'loading';
    },
    [fetchGetPost.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchGetPost.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },
  },
});

export const postsReducer = postsSlice.reducer;
