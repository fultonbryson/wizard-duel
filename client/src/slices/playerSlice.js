import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api";

export const createPlayer = createAsyncThunk(
  "player/createPlayer",
  async (playerName, thunkAPI) => {
    const response = await axios.post(API_URL + "/player", {
      player_name: playerName,
    });

    const player = { ...response.data };

    return player;
  }
);

const initialState = {
  player_id: 0,
  player_name: "",
  player_match_id: 0,
  player_health_total: 0,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPlayer.fulfilled, (state, action) => {
      const data = action.payload;
      state.player_name = data.player_name;
    });
  },
});

export default playerSlice.reducer;
