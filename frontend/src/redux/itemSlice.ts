import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  const response = await axios.get("http://localhost:3000/api/item");
  return response.data;
});

export const fetchItemById = createAsyncThunk(
    "items/fetchItemById",
    async (id: string, { rejectWithValue }) => {
      try {
        const response = await axios.get(`http://localhost:3000/api/item/${id}`);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.response.data);
      }
    }
  );

export const addItem = createAsyncThunk(
  "items/addItem",
  async (item: { name: string; description: string; price: number }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3000/api/item", item);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateItem = createAsyncThunk(
  "items/updateItem",
  async (payload: { id: string; item: { name: string; description: string; price: number } }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/item/${payload.id}`, payload.item);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteItem = createAsyncThunk("items/deleteItem", async (id: string) => {
  await axios.delete(`http://localhost:3000/api/item/${id}`);
  return id;
});

const itemSlice = createSlice({
    name: "items",
    initialState: {
      items: [] as { id: string; name: string; description: string; price: number }[],
      currentItem: null as { id: string; name: string; description: string; price: number } | null, // Add currentItem state
      status: "idle",
      error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchItems.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchItems.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.items = action.payload;
        })
        .addCase(fetchItems.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message || "Failed to fetch items";
        })
        .addCase(fetchItemById.fulfilled, (state, action) => {
          state.currentItem = action.payload; // Set the currentItem state
        })
        .addCase(addItem.fulfilled, (state, action) => {
          state.items.push(action.payload);
        })
        .addCase(updateItem.fulfilled, (state, action) => {
          const index = state.items.findIndex((item) => item.id === action.payload.id);
          if (index !== -1) {
            state.items[index] = action.payload;
          }
        })
        .addCase(deleteItem.fulfilled, (state, action) => {
          state.items = state.items.filter((item) => item.id !== action.payload);
        });
    },
  });
  
  export default itemSlice.reducer;