import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  match_id: 0,
  match_format: "",
  match_start_health: 0,
};

export const matchSlice = createSlice({
  name: "match",
  initialState,
  reducers: {
    createMatch: (state, action) => {
      const data = action.payload;
      state.match_id = data.id;
      state.match_format = data.match_format;
      state.match_start_health = data.match_start_health;
    },
  },
});

export const { createMatch } = matchSlice.actions;

export default matchSlice.reducer;
