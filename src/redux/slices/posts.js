import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/posts`);
  return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/tags`);
  return data;
});

export const fetchRemovePost = createAsyncThunk('posts/fetchTags', async (id) => {
  await axios.delete(`${process.env.REACT_APP_API_URL}/posts/${id}`);
});

export const fetchComments = createAsyncThunk('posts/fetchComments', async (id) => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/comment/${id}`);
  return data;
});

export const fetchNewestPosts = createAsyncThunk('posts/fetchNewestPosts', async () => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/posts/newest`);
  return data;
});

export const fetchPostsFromTags = createAsyncThunk('posts/fetchPostsFromTags', async (id) => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/tags/${id}`);
  return data;
});

// export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
//   const { data } = await axios.get(`http://localhost:4444/posts`);
//   return data;
// });

// export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
//   const { data } = await axios.get(`http://localhost:4444/tags`);
//   return data;
// });

// export const fetchRemovePost = createAsyncThunk('posts/fetchTags', async (id) => {
//   await axios.delete(`http://localhost:4444/posts/${id}`);
// });

// export const fetchComments = createAsyncThunk('posts/fetchComments', async (id) => {
//   const { data } = await axios.get(`http://localhost:4444/comment/${id}`);
//   return data;
// });

// export const fetchNewestPosts = createAsyncThunk('posts/fetchNewestPosts', async () => {
//   const { data } = await axios.get(`http://localhost:4444/posts/newest`);
//   return data;
// });

// export const fetchPostsFromTags = createAsyncThunk('posts/fetchPostsFromTags', async (id) => {
//   const { data } = await axios.get(`http://localhost:4444/tags/${id}`);
//   return data;
// });

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    isActive: false,
    status: 'loading',
  },
  comments: {
    items: [],
    status: 'loading',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.comments.items = [...state.comments.items, action.payload];
    },
  },
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
    // Получение комментов
    [fetchComments.pending]: (state) => {
      state.comments.status = 'loading';
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = 'loaded';
    },
    [fetchComments.rejected]: (state) => {
      state.comments.items = [];
      state.comments.status = 'error';
    },
    // Получение популярных статей
    [fetchNewestPosts.pending]: (state) => {
      state.posts.status = 'loading';
    },
    [fetchNewestPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchNewestPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },
    // Получение статей по тегам
    [fetchPostsFromTags.pending]: (state) => {
      state.posts.status = 'loading';
    },
    [fetchPostsFromTags.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchPostsFromTags.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },
  },
});

export const postsReducer = postsSlice.reducer;

export const { addComment } = postsSlice.actions;
