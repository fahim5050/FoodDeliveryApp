import { createSlice } from '@reduxjs/toolkit';
import { fetchBranches, fetchOrganization } from '../Utils/Apis';

// Initial state for the slice
const initialState = {
    data: [],
    status: 'idle', // or 'loading', 'succeeded', 'failed'
    error: null,
};

// Create the slice
const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {}, // No manual reducers needed as async thunks handle actions
    extraReducers: (builder) => {
        builder
            // Handle fetchBranches states
            .addCase(fetchBranches.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBranches.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchBranches.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            
            // Handle fetchOrganization states
            .addCase(fetchOrganization.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOrganization.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchOrganization.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

// Export the reducer to be used in the store
export default dataSlice.reducer;
