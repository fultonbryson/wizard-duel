import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  player_id: 0,
  player_name: "",
  player_match_id: 0,
  player_health_total: 0,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    createPlayer: (state, action) => {
      const data = action.payload;
      state.player_name = data.player_name;
      state.player_id = data.id;
    },
    setPlayerMatchId: (state, action) => {
      const data = action.payload;
      state.player_match_id = data;
    },
  },
});

export const { createPlayer, setPlayerMatchId } = playerSlice.actions;

export default playerSlice.reducer;
