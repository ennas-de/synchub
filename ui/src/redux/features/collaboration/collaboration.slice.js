// frontend/src/features/collaboration/collaboration.slice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  createCollaboration,
  getAllCollaborationsByTeamAndSubteam,
  getCollaborationById,
  updateCollaborationById,
  deleteCollaborationById,
  joinCollaborationRoom,
  leaveCollaborationRoom,
} from "./collaboration.actions";

// Initial state for the collaboration slice
const initialState = {
  collaborations: [],
  selectedCollaboration: null,
  status: "idle",
  message: null,
};

const collaborationSlice = createSlice({
  name: "collaboration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCollaboration.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCollaboration.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.collaborations.push(action.payload);
      })
      .addCase(createCollaboration.rejected, (state, action) => {
        console.log(action);

        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(getAllCollaborationsByTeamAndSubteam.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getAllCollaborationsByTeamAndSubteam.fulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.collaborations = action.payload;
        }
      )
      .addCase(
        getAllCollaborationsByTeamAndSubteam.rejected,
        (state, action) => {
          state.status = "failed";
          state.message = action.payload;
        }
      )
      .addCase(getCollaborationById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCollaborationById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedCollaboration = action.payload;
      })
      .addCase(getCollaborationById.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(updateCollaborationById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCollaborationById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.collaborations = state.collaborations.map((collaboration) =>
          collaboration._id === action.payload._id
            ? action.payload
            : collaboration
        );
      })
      .addCase(updateCollaborationById.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(deleteCollaborationById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCollaborationById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.collaborations = state.collaborations.filter(
          (collaboration) => collaboration._id !== action.payload._id
        );
      })
      .addCase(deleteCollaborationById.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(joinCollaborationRoom.pending, (state) => {
        state.status = "loading";
      })
      .addCase(joinCollaborationRoom.fulfilled, (state, action) => {
        state.status = "succeeded";
        const roomId = action.payload.roomId;
        const userId = action.payload.userId;

        const collaboration = state.collaborations.find(
          (collab) => collab._id === roomId
        );

        if (collaboration) {
          collaboration.users.add(userId);
        }
      })
      .addCase(joinCollaborationRoom.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })

      .addCase(leaveCollaborationRoom.pending, (state) => {
        state.status = "loading";
      })
      .addCase(leaveCollaborationRoom.fulfilled, (state, action) => {
        state.status = "succeeded";
        const roomId = action.payload.roomId;
        const userId = action.payload.userId;

        const collaboration = state.collaborations.find(
          (collab) => collab._id === roomId
        );

        if (collaboration) {
          collaboration.users.delete(userId);
        }
      })
      .addCase(leaveCollaborationRoom.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
  },
});

export default collaborationSlice.reducer;
