const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Links this complaint to the Student who created it
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: ['Academic', 'Infrastructure', 'Mess', 'Hostel', 'Wi-Fi', 'Other']
  },
  severity: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Low'
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved', 'Rejected'],
    default: 'Pending'
  },
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: { type: String },
      text: { type: String, required: true },
      role: { type: String }, // 'student' or 'admin'
      date: { type: Date, default: Date.now }
    }
  ],
  upvotes: {
    type: Number,
    default: 0
  }
  // We can add 'image' field later when we handle file uploads
}, {
  timestamps: true
});

module.exports = mongoose.model('Complaint', complaintSchema);