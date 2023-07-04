import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../utils/axiosReguest";


export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.get("users");
      return data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const postUsers = createAsyncThunk(
  "users/postUsers",
  async (newUsers, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosRequest.post("users", newUsers);
      dispatch(getUsers());
      return response.data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const patchUsers = createAsyncThunk(
  "users/patchUsers",
  async ({ change, id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosRequest.patch(`users/${id}`, change);

      dispatch(getUsers());
      return response.data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const deleteUsers = createAsyncThunk(
  "users/deleteUsers",
  async (id , { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosRequest.delete(`users/${id}`);

      dispatch(getUsers());
      return response.data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
