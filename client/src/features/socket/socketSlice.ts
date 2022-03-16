import { createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import { RootState } from "../../app/store";

interface SocketState {
  socket: Socket | null;
}

const initialState: SocketState = {
  socket: null,
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
});

export const { setSocket } = socketSlice.actions;

export const selectSocket = (state: RootState) => state.mySocket.socket;

export default socketSlice.reducer;
