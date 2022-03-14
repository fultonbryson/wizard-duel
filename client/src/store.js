import { configureStore } from "@reduxjs/toolkit";

import playerReducer from "./slices/playerSlice";
import matchReducer from "./slices/matchSlice";

export const store = configureStore({
  reducer: {
    player: playerReducer,
    match: matchReducer,
  },
});
