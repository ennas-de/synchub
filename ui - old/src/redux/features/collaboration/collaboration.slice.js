// frontend/src/features/collaboration/collaboration.slice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  createCollaboration,
  getAllCollaborations,
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
  error: null,
};

const collaborationSlice = createSlice({
  name: "collaboration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create a new collaboration
      .addCase(createCollaboration.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCollaboration.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.collaborations.push(action.payload);
      })
      .addCase(createCollaboration.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Get all collaborations for a specific team and subteam
      .addCase(getAllCollaborations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCollaborations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.collaborations = action.payload;
      })
      .addCase(getAllCollaborations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Get a single collaboration by ID
      .addCase(getCollaborationById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCollaborationById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedCollaboration = action.payload;
      })
      .addCase(getCollaborationById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Update a collaboration by ID
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
        state.error = action.error.message;
      })
      // Delete a collaboration by ID
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
        state.error = action.error.message;
      });
            // Join a collaboration room
      .addCase(joinCollaborationRoom.pending, (state) => {
        state.status = "loading";
      })
.addCase(joinCollaborationRoom.fulfilled, (state, action) => {
        state.status = "succeeded";
        const roomId = action.payload.roomId;
        const userId = action.payload.userId;

        // Find the collaboration in state.collaborations by roomId
        const collaboration = state.collaborations.find(
          (collab) => collab._id === roomId
        );

        if (collaboration) {
          // Add the user ID to the collaboration's users set
          collaboration.users.add(userId);
        }
      })
      .addCase(joinCollaborationRoom.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Leave a collaboration room
      .addCase(leaveCollaborationRoom.pending, (state) => {
        state.status = "loading";
      })
       .addCase(leaveCollaborationRoom.fulfilled, (state, action) => {
        state.status = "succeeded";
        const roomId = action.payload.roomId;
        const userId = action.payload.userId;

        // Find the collaboration in state.collaborations by roomId
        const collaboration = state.collaborations.find(
          (collab) => collab._id === roomId
        );

        if (collaboration) {
          // Remove the user ID from the collaboration's users set
          collaboration.users.delete(userId);
        }
      })
      .addCase(leaveCollaborationRoom.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default collaborationSlice.reducer;