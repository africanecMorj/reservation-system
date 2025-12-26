import mongoose from "mongoose";

const dashboardSchema = new mongoose.Schema({
  ownerEmail: String,
  name: String,
  invitedUsers: Array,
  ranges: Array,
  createdAt: Date
});

export default mongoose.model("dashboard", dashboardSchema);
