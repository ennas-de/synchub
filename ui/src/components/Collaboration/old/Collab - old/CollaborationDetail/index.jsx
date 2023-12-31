// frontend/src/features/collaboration/components/CollaborationDetail.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { saveAs } from "file-saver";
// import CodeEditor from "./CodeEditor";
import { useSocket } from "./../../../contexts/SocketContext";
import {
  getCollaborationById,
  updateCollaborationById,
} from "./../../../redux/features/collaboration/collaboration.actions";

const CollaborationDetail = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const { teamId, subteamId, collaborationId } = useParams();
  const socket = useSocket(); // Use the useSocket hook to get the socket instance
  const [collaboration, setCollaboration] = useState(null);

  useEffect(() => {
    // Fetch the details of the selected collaboration
    dispatch(getCollaborationById(collaborationId))
      .unwrap()
      .then((data) => {
        setCollaboration(data);

        // Join the collaboration room using Socket.io
        socket.emit("joinRoom", { roomId: data._id });
      })
      .catch((error) => {
        console.log("Failed to fetch collaboration:", error);
      });

    // Cleanup Socket.io listeners on unmount
    return () => {
      // Leave the collaboration room when the component unmounts
      if (collaboration) {
        socket.emit("leaveRoom", { roomId: collaboration._id });
      }
    };
  }, [dispatch, collaborationId, socket]);

  const handleCodeUpdate = (newCode) => {
    // Update the code in the collaboration and save it to the backend
    if (collaboration) {
      dispatch(
        updateCollaborationById({
          id: collaboration._id,
          content: newCode,
        })
      )
        .unwrap()
        .then((data) => {
          console.log("Collaboration updated successfully.");
        })
        .catch((error) => {
          console.log("Failed to update collaboration:", error);
        });

      // Emit the code update to the server for real-time synchronization
      socket.emit("codeUpdate", { roomId: collaboration._id, code: newCode });
    }
  };

  const handleSaveCode = () => {
    // Save the code to local storage for later retrieval
    if (collaboration) {
      localStorage.setItem("savedCode", collaboration.content);
      console.log("Code saved!");
    }
  };

  const handleDownloadCode = () => {
    // Download the collaboration code as a file
    if (collaboration) {
      const blob = new Blob([collaboration.content], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(blob, "collaboration_code.txt");
    }
  };

  return (
    <div>
      {collaboration ? (
        <>
          <h2>{collaboration.name}</h2>
          {/* <CodeEditor
            code={collaboration.content}
            onCodeUpdate={handleCodeUpdate}
          /> */}
          <button onClick={handleSaveCode}>Save Code</button>
          <button onClick={handleDownloadCode}>Download Code</button>
        </>
      ) : (
        <p>Loading collaboration details...</p>
      )}
    </div>
  );
};

export default CollaborationDetail;
