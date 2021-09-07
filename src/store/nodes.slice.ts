import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { getFetch } from "../api/api";
import { API_PATH } from "../utils/constants";

export interface INodes {
  title: string;
  image: string;
  description: string;
}

export interface INodeState {
  nodes: INodes[];
  listNodes: INodes[];
  status: "idle" | "loading" | "failed";
}

const initialState: INodeState = {
  nodes: [],
  listNodes: [],
  status: "idle",
};

export const getNodesAsync = createAsyncThunk("nodes/getNodes", async () => {
  const response = await getFetch(API_PATH.nodes);
  return response;
});

export const nodesSlice = createSlice({
  name: "nodes",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateNodes: (state, action: any) => {
      state.listNodes = state.listNodes.concat(
        state.nodes.filter((item) => item.title === action.payload)
      );

      state.nodes.splice(
        state.nodes.findIndex((item) => item.title === action.payload),
        1
      );
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getNodesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNodesAsync.fulfilled, (state, action: any) => {
        state.status = "idle";
        state.nodes = action.payload;
      });
  },
});
export const { updateNodes } = nodesSlice.actions;
export const selectNodes = (state: RootState) => state.nodes.nodes;
export const selectListNodes = (state: RootState) => state.nodes.listNodes;

export default nodesSlice.reducer;
