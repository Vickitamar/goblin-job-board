const Jobs = require("../models/jobs");

exports.postJob = async (req, res) => {
  try {
    const job = await Jobs.create(req.body);
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getJobs = async (req, res) => {
  const jobs = await Jobs.find();
  res.json(jobs);
};
