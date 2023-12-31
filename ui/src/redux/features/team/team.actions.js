import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

// Function to check if the user is a tutor
const isTutor = (user) => user.role === "tutor";

// Async Thunk to create a new team (Only tutors can perform this action)
export const createTeam = createAsyncThunk(
  "team/create",
  async (teamData, { getState }) => {
    const { user } = getState().auth; // Assuming the authenticated user data is available in the auth state
    if (!isTutor(user)) {
      throw new Error("Only tutors can create teams.");
    }

    const response = await API.post("/teams", teamData);
    return response.data;
  }
);

// Async Thunk to get all teams
export const getAllTeams = createAsyncThunk(
  "team/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/teams/");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async Thunk to get a single team by ID
export const getTeamById = createAsyncThunk(
  "team/getById",
  async (teamId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/teams/${teamId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async Thunk to update a team by ID (Only tutors can perform this action)
export const updateTeamById = createAsyncThunk(
  "team/updateById",
  async (teamData, { getState }) => {
    try {
      const { user } = getState().auth;

      // if (!isTutor(user)) {
      //   throw new Error("Only tutors can update teams.");
      // }

      const { id, name, description } = teamData;
      const response = await API.put(`/teams/${id}`, { name, description });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async Thunk to delete a team by ID (Only tutors can perform this action)
export const deleteTeamById = createAsyncThunk(
  "team/deleteById",
  async (teamId, { getState }) => {
    const { user } = getState().auth;
    if (!isTutor(user)) {
      throw new Error("Only tutors can delete teams.");
    }

    const response = await API.delete(`/teams/${teamId}`);
    return response.data;
  }
);
