const Complaint = require('../models/Complaint');
const User = require('../models/User');

// @desc    Get complaints
// @route   GET /api/complaints
// @access  Private
const getComplaints = async (req, res) => {
  try {
    let complaints;

    // Logic: If Admin -> Get ALL. If Student -> Get ONLY theirs.
    if (req.user.role === 'admin') {
      complaints = await Complaint.find().populate('user', 'name email');
    } else {
      complaints = await Complaint.find({ user: req.user.id });
    }

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new complaint
// @route   POST /api/complaints
// @access  Private (Student)
const createComplaint = async (req, res) => {
  const { title, description, category, severity } = req.body;

  if (!title || !description || !category) {
    return res.status(400).json({ message: 'Please add all fields' });
  }

  try {
    const complaint = await Complaint.create({
      user: req.user.id, // Comes from the auth middleware
      title,
      description,
      category,
      severity: severity || 'Low'
    });

    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single complaint by ID
// @route   GET /api/complaints/:id
// @access  Private
const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Security: Ensure student can't view someone else's complaint
    if (req.user.role !== 'admin' && complaint.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update complaint status (Admin only)
// @route   PUT /api/complaints/:id
// @access  Private (Admin)
const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body; // e.g., "In Progress" or "Resolved"

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Update the status
    complaint.status = status;
    
    // If resolved, we could add a "resolvedAt" timestamp here if we wanted
    const updatedComplaint = await complaint.save();

    res.status(200).json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upvote a complaint (Standout Feature)
// @route   PUT /api/complaints/:id/upvote
// @access  Private
const upvoteComplaint = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);
        if(!complaint) return res.status(404).json({message: 'Not Found'});

        complaint.upvotes = complaint.upvotes + 1;
        await complaint.save();
        res.status(200).json(complaint);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// @desc    Add a comment to a complaint
// @route   POST /api/complaints/:id/comment
// @access  Private
const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    const comment = {
      user: req.user.id,
      name: req.user.name,
      text,
      role: req.user.role // Important to show different colors for Admin vs Student
    };

    complaint.comments.push(comment);

    await complaint.save();
    res.status(201).json(complaint.comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Don't forget to export it!
module.exports = {
  getComplaints,
  createComplaint,
  getComplaintById,
  updateComplaintStatus,
  upvoteComplaint,
  addComment // <--- Add this
};

