// backend/routes/collaboration.routes.js

const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../utils/validation.js");
const {
  createCollaboration,
  getAllCollaborationsByTeamAndSubteam,
  getCollaborationById,
  updateCollaborationById,
  deleteCollaborationById,
} = require("../controllers/collaboration.controller.js");

// Route: POST /api/collaborations
// Description: Create a new collaboration
router.post("/collaborations", authenticateToken, createCollaboration);

// Route: GET /api/collaborations/:id
// Description: Get a collaboration by ID
router.get("/collaborations/:id", authenticateToken, getCollaborationById);

// Route: GET /api/collaborations
// Description: Get all collaborations
router.get(
  "/collaborations",
  authenticateToken,
  getAllCollaborationsByTeamAndSubteam
);

// Route: PUT /api/collaborations/:id
// Description: Update a collaboration by ID
router.put("/collaborations/:id", authenticateToken, updateCollaborationById);

// Route: DELETE /api/collaborations/:id
// Description: Delete a collaboration by ID
router.delete(
  "/collaborations/:id",
  authenticateToken,
  deleteCollaborationById
);

module.exports = router;