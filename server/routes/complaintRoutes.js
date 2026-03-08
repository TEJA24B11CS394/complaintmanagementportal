const express = require('express');
const router = express.Router();
const {
  getComplaints,
  createComplaint,
  getComplaintById,
  updateComplaintStatus,
  upvoteComplaint
} = require('../controllers/complaintController');

const { protect, adminOnly } = require('../middleware/authMiddleware');
const { addComment } = require('../controllers/complaintController');
// Route: /api/complaints/
router.route('/')
  .get(protect, getComplaints)     // Students see theirs, Admin sees all
  .post(protect, createComplaint); // Anyone logged in can post

// Route: /api/complaints/:id
router.route('/:id')
  .get(protect, getComplaintById)   // View details
  .put(protect, adminOnly, updateComplaintStatus); // ONLY Admin can update status

// Route: /api/complaints/:id/upvote
router.put('/:id/upvote', protect, upvoteComplaint);
router.post('/:id/comment', protect, addComment);

module.exports = router;