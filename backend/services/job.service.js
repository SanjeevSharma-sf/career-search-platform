const CatchAsyncError = require("../middleware/catchAsyncErrors");
const JobModel = require("../models/job.model");

//create course
const createJob = CatchAsyncError(async (data, res) => {
  const job = await JobModel.create(data);
  res.status(201).json({
    success: true,
    job,
  });
});

//get all courses service
const getAllJobsService = async (res) => {
  const jobs = await JobModel.find().sort({ createdAt: -1 });
  res.status(201).json({
    success: true,
    jobs,
  });
};

module.exports = {
  createJob,
  getAllJobsService,
};
