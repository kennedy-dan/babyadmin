import axios from '../../utils/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';


export const getLoca = createAsyncThunk(`customer/getLoc`, async (data) => {
    const response = await axios.get('admin/delivery-locations');
    return response.data;
});

export const delLoca = createAsyncThunk(`customer/delLoca`, async (data) => {
    const response = await axios.delete(`admin/delivery-locations/${data?.id}`);
    return response.data;
});

export const updLoca = createAsyncThunk(`customer/updLoca`, async (data) => {
    const response = await axios.patch(`admin/delivery-locations/${data?.id}`, data?.data);
    return response.data;
});


const initialState = {
    getadmincarts: {
        results: null,
        isLoading: true,
    },

    loca: {
        results: null,
        isLoading: true,
    },
}

export const locationSlice = createSlice({
    name: 'location',
    initialState,
    extraReducers: (builder) => {

    builder
        .addCase(getLoca.pending, (state) => {
            state.loca.isLoading = true;
        })
        .addCase(getLoca.fulfilled, (state, { payload }) => {
            state.loca.isLoading = false;
            state.loca.results = payload;
        })
        .addCase(getLoca.rejected, (state) => {
            state.loca.isLoading = true;
        })
    }
})
export default locationSlice.reducer;
