import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPlaces } from "../../helpers/api";

export const getPlaces = createAsyncThunk("search/getPlaces", async (text) => {
    let response = await fetchPlaces(text);
    return response;
});

export const searchSlice = createSlice({
    name: "search",
    initialState: {
        value: 0,
        predictions: [],
        selectedPlace: null,
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(getPlaces.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.predictions = [];
            })
            .addCase(getPlaces.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.predictions = action.payload.predictions;
            })
            .addCase(getPlaces.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
                state.predictions = [];
            });
    },
});

// Action creators are generated for each case reducer function
export const {} = searchSlice.actions;

export default searchSlice.reducer;
