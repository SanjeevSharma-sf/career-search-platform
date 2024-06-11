const express = require("express");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");
const {
  uploadJob,
  editJob,
  getSingleJob,
  getAllJobs,
  getAllJobsForRecruiter,
  deleteJob,
  applyForJob,
  getApplicationsForSingleJob,
  getAllApplications,
  updateApplicationStatus,
  getListOfApplicants,
} = require("../controllers/job.controller");
const jobRouter = express.Router();

jobRouter.post(
  "/create-job",
  isAuthenticated,
  authorizeRoles("recruiter"),
  uploadJob
);
jobRouter.put(
  "/edit-job/:id",
  isAuthenticated,
  authorizeRoles("recruiter"),
  editJob
);
jobRouter.get("/get-job/:id", getSingleJob);
jobRouter.get("/get-jobs", getAllJobs);
jobRouter.get(
  "/get-jobs",
  isAuthenticated,
  authorizeRoles("recruiter"),
  getAllJobsForRecruiter
);

jobRouter.delete(
  "/delete-job",
  isAuthenticated,
  authorizeRoles("recruiter"),
  deleteJob
);
// apply for a job [todo: test: done]
jobRouter.post(
  "/job-application:id",
  isAuthenticated,
  authorizeRoles("applicant"),
  applyForJob
);

jobRouter.get(
  "/jobs/:id/applications",
  isAuthenticated,
  authorizeRoles("recruiter"),
  getApplicationsForSingleJob
);
jobRouter.get("/applications", isAuthenticated, getAllApplications);
jobRouter.put("/applications/:id", isAuthenticated, updateApplicationStatus);
jobRouter.get(
  "/applicants",
  isAuthenticated,
  authorizeRoles("recruiter"),
  getListOfApplicants
);

module.exports = jobRouter;
