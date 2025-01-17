import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "requests",
    initialState: null,
    reducers: {
        addRequests: (state,action) => action.payload,
        removeRequest: (state, action) =>{
      const idToRemove = action.payload;
      return state.filter(request => request._id !== idToRemove);
        }
    }
})



export const {addRequests, removeRequest} = requestSlice.actions;

export default requestSlice.reducer;