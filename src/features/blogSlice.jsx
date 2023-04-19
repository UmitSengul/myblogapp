import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: true,
    allBlogs: [],
    likes: [],
    categories: [],
    blog: [],
    comments: [],
}


/* export const getBlog= createAsyncThunk("getBlog", async (thunkAPI,{rejectWithValue}) => {
    const response = await fetch('http://32171.fullstack.clarusway.com/api/blogs')
    const data = await response.json()
    return data
})
 */
const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {

    allBlogs: (state, action) => {
      state.loading = false;
      state.allBlogs = action.payload
    },
    setBlog: (state, action) => {
      state.loading = false;
      state.blog = action.payload
    },

    deleteBlog: (state, action) => {
      state.loading = false;
      state.blog ={}
      state.allBlogs=state["allBlogs"].filter(blog=>blog.id!==action.payload)
    },
    updateBlog: (state, action) => {
      state.loading = false;
      state.allBlogs[state.allBlogs.findIndex(obj => obj.id === action.payload.id)] = action.payload.data
    },

    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  }
},



);

export const {allBlogs, deleteBlog,updateBlog,setBlog,getBlogById,fetchStart,fetchFail} = blogSlice.actions

export default blogSlice.reducer