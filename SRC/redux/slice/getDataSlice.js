import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL, styleConsole } from '../../Util/Constent/Constent'


const getAllTodoData = createAsyncThunk('get Todo', async (userId) => {
    const { data } = await axios.get(`${BASE_URL}todo/get-all-todo/${userId}`)

    // styleConsole("🚀 ~ file: getDataSlice.js:9 ~ getAllTodoData ~ data:", "From Slice", data)

    return data.todo
},
)

const getTodoDataSlice = createSlice({
    name: 'getTodo',
    initialState: {
        data: [],
        isLoading: false,
        isError: null
    },

    extraReducers: (builder) => {
        builder
            .addCase(getAllTodoData.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
                state.isError = null;
            })
            .addCase(getAllTodoData.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getAllTodoData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message;
            });
    },
})

export default getTodoDataSlice.reducer
export { getAllTodoData }