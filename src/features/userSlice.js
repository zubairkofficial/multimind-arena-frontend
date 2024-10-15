import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to update user data
export const updateUser = createAsyncThunk(
    "user/updateUser",
    async(userData, { rejectWithValue }) => {
        try {
            const response = await axios.put("/user/update", userData); // Adjust the route as needed
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const getAllUsers = createAsyncThunk(
    'user/',
    async(_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/user/'); // Adjust the route as needed
            return response.data; // Assuming response.data contains the user list
        } catch (error) {
            return rejectWithValue(error.response.data); // Handle errors properly
        }
    }
);

const initialState = {
    user: null,
    users: null,
    loading: false,
    error: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;