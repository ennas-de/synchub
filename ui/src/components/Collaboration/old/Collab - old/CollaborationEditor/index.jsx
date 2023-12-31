// frontend/src/features/collaboration/components/CollaborationEditor.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Editor } from "react-live";
import {
  createCollaboration,
  getCollaborationById,
  updateCollaborationById,
} from "../collaboration.slice"; // Update the path accordingly
import { useSocket } from "../../contexts/SocketContext";

const CollaborationEditor = () => {
  const { teamId, subteamId, collaborationId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); // Update this line
  const [content, setContent] = useState("");

  // Use the useSocket hook to get the socket instance
  const socket = useSocket();

  useEffect(() => {
    if (collaborationId) {
      // Fetch the collaboration content if editing an existing collaboration
      dispatch(getCollaborationById(collaborationId))
        .unwrap()
        .then((data) => {
          setContent(data.content);
          // Join the collaboration room using Socket.io
          socket.emit("joinRoom", { roomId: data._id });
        })
        .catch((error) => {
          console.log("Failed to fetch collaboration:", error);
        });
    }
    // Cleanup Socket.io listeners on unmount
    return () => {
      // Leave the collaboration room when the component unmounts
      if (collaborationId) {
        socket.emit("leaveRoom", { roomId: collaborationId });
      }
    };
  }, [collaborationId, dispatch, socket]);

  const handleCodeChange = (newCode) => {
    setContent(newCode);
    // Emit the code update to the server for real-time synchronization
    socket.emit("codeUpdate", { roomId: collaborationId, code: newCode });
  };

  const handleSaveProgress = () => {
    if (collaborationId) {
      // Update the existing collaboration content
      dispatch(updateCollaborationById({ id: collaborationId, content }))
        .unwrap()
        .then(() => {
          console.log("Collaboration updated successfully.");
        })
        .catch((error) => {
          console.log("Failed to update collaboration:", error);
        });
    } else {
      // Create a new collaboration
      dispatch(
        createCollaboration({
          teamId,
          subteamId,
          userId: user.id,
          content,
        })
      )
        .unwrap()
        .then(() => {
          console.log("Collaboration created successfully.");
        })
        .catch((error) => {
          console.log("Failed to create collaboration:", error);
        });
    }
  };

  return (
    <div>
      <h2>Collaboration Editor</h2>
      <Editor
        value={content}
        onChange={handleCodeChange}
        // Add other editor configurations here
        theme="vs-dark" // Example: Using a dark theme
      />
      <button onClick={handleSaveProgress}>
        {collaborationId ? "Save Progress" : "Create Collaboration"}
      </button>
    </div>
  );
};

export default CollaborationEditor;
