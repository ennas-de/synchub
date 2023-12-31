import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux"; // Import useDispatch
import CollaborationDetail from "../../../../components/Collaboration/CollaborationDetail";
import {
  joinCollaborationRoom,
  leaveCollaborationRoom,
  deleteCollaborationById,
} from "../../../../redux/features/collaboration/collaboration.actions";
import { useSocket } from "../../../../contexts/SocketContext";

const CollaborationDetailPage = () => {
  const dispatch = useDispatch(); // Get the dispatch function
  const socket = useSocket(); // Use the useSocket hook to get the socket instance
  const params = useParams();

  // Additional functionalities for joining, leaving, and deleting collaboration
  const handleJoinCollaborationRoom = (roomId, userId) => {
    // Dispatch the action to join the collaboration room
    dispatch(joinCollaborationRoom({ roomId, userId }));
  };

  const handleLeaveCollaborationRoom = (roomId, userId) => {
    // Dispatch the action to leave the collaboration room
    dispatch(leaveCollaborationRoom({ roomId, userId }));
  };

  const handleDeleteCollaboration = (collaborationId) => {
    // Dispatch the action to delete the collaboration
    dispatch(deleteCollaborationById(collaborationId));
  };

  return (
    <div>
      {/* Render the CollaborationDetail component and pass the additional functionalities */}
      <CollaborationDetail
        teamId={params.teamId}
        subteamId={params.subteamId}
        collaborationId={params.collaborationId}
        socketServerUrl={socketServerUrl}
        onJoinCollaboration={handleJoinCollaborationRoom}
        onLeaveCollaboration={handleLeaveCollaborationRoom}
        onDeleteCollaboration={handleDeleteCollaboration}
      />
    </div>
  );
};

export default CollaborationDetailPage;
