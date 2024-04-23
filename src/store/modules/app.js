import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    visibleSideBar: false
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        toggleSideBar: (state, payload) => {
            if (payload && payload?.onClose === true) {
                state.visibleSideBar = false
            } else {
                state.visibleSideBar = !state.visibleSideBar
            }
        }
    }
});

export const { toggleSideBar } = appSlice.actions;

export default appSlice.reducer;
