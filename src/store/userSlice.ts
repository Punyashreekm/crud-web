import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { User, UserState } from '../types';

const API_Base_URL = 'http://localhost:3000/users';

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
};

// Async Thunks
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get<User[]>(API_Base_URL);
    return response.data;
});

export const addUser = createAsyncThunk('users/addUser', async (user: Omit<User, 'id'>) => {
    const response = await axios.post<User>(API_Base_URL, user);
    return response.data;
});

export const updateUser = createAsyncThunk('users/updateUser', async (user: User) => {
    const { id, ...data } = user;
    const response = await axios.put<User>(`${API_Base_URL}/${id}`, data);
    return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id: string | number) => {
    await axios.delete(`${API_Base_URL}/${id}`);
    return id;
});

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Users
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch users';
            })
            // Add User
            .addCase(addUser.fulfilled, (state, action) => {
                state.users.push(action.payload);
            })
            // Update User
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.users.findIndex((u) => u.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            // Delete User
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter((u) => u.id !== action.payload);
            });
    },
});

export default userSlice.reducer;
