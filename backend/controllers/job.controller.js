const CatchAsyncError = require("../middleware/catchAsyncErrors");
const ApplicationModel = require("../models/application.model");
const JobModel = require("../models/job.model");
const { createJob, getAllJobsService } = require("../services/job.service");
const ErrorHandler = require("../utils/ErrorHandler");

//upload job
const uploadJob = CatchAsyncError(async (req, res, next) => {
  try {
    const data = req.body;

    createJob(data, res, next);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//edit job
const editJob = CatchAsyncError(async (req, res, next) => {
  try {
    const data = req.body;
    const jobId = req.params.id;
    const job = await JobModel.findByIdAndUpdate(
      jobId,
      {
        $set: data,
      },
      {
        new: true,
      }
    );
    res.status(201).json({
      success: true,
      job,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//get single course ---publice listing
const getSingleJob = CatchAsyncError(async (req, res, next) => {
  try {
    const jobId = req.params.id;

    const job = await JobModel.findById(jobId);
    //   .select(
    //     "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
    //   )
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//get all jobs ---public listing
const getAllJobs = CatchAsyncError(async (req, res, next) => {
  try {
    const jobs = await JobModel.find();
    //   .select(
    //     "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
    //   );
    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//get all courses --- only for admin
const getAllJobsForRecruiter = CatchAsyncError(async (req, res, next) => {
  try {
    getAllJobsService(res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

//delete job --- only for recruiter
const deleteJob = CatchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await JobModel.findById(id);
    if (!job) {
      return next(new ErrorHandler("User not found", 404));
    }
    await JobModel.deleteOne({ id });
    res.status(200).json({
      success: true,
      message: "Job deleted Successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const applyForJob = CatchAsyncError(async (req, res, next) => {
  try {
    const data = req.body;
    const jobId = req.params.id;

    // check whether applied previously
    // find job
    // check count of active applications < limit
    // check user had < 10 active applications && check if user is not having any accepted jobs (user id)
    // store the data in applications
    let applicationExists = await ApplicationModel.findOne({
      userId: user.id,
      jobId: jobId,
      status: {
        $nin: ["deleted", "accepted", "cancelled"],
      },
    });

    if (applicationExists) {
      return next(
        new ErrorHandler("You have already applied for this job", 400)
      );
    }

    const job = await JobModel.findById(jobId);
    if (!job) {
      return next(new ErrorHandler("Job does not exist", 404));
    }
    const applicationsCount = await ApplicationModel.countDocuments({
      jobId: jobId,
      status: {
        $nin: ["rejected", "deleted", "cancelled", "finished"],
      },
    });
    if (applicationCount > 10) {
      return next(
        new ErrorHandler(
          "You have 10 active applications. Hence you cannot apply.",
          400
        )
      );
    }
    // const acceptedApplicationsCount = await ApplicationModel.countDocuments({
    //     userId: user.id,
    //     status: "accepted",
    //   })
    const application = new ApplicationModel({
      userId: user._id,
      recruiterId: job.userId,
      jobId: job._id,
      status: "applied",
      sop: data.sop,
    });
    await application.save();
    res.status(200).json({
      success: true,
      message: "Job application successful",
      application,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// recruiter gets applications for a particular job [pagination] [todo: test: done]
const getApplicationsForSingleJob = CatchAsyncError(async (req, res, next) => {
  try {
    const jobId = req.params.id;
    const user = req.user;
    // const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    // const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
    // const skip = page - 1 >= 0 ? (page - 1) * limit : 0;
    let findParams = {
      jobId: jobId,
      recruiterId: user._id,
    };
    let sortParams = {};

    if (req.query.status) {
      findParams = {
        ...findParams,
        status: req.query.status,
      };
    }
    const applications = await ApplicationModel.find(findParams)
      .collation({ locale: "en" })
      .sort(sortParams);

    res.status(200).json({
      success: true,
      message: "Applications list for single Job",
      applications,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// recruiter/applicant gets all his applications [pagination]
const getAllApplications = CatchAsyncError(async (req, res, next) => {
  try {
    const user = req.user;

    // const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    // const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
    // const skip = page - 1 >= 0 ? (page - 1) * limit : 0;

    const applications = await ApplicationModel.aggregate([
      {
        $lookup: {
          from: "jobapplicantinfos",
          localField: "userId",
          foreignField: "userId",
          as: "jobApplicant",
        },
      },
      { $unwind: "$jobApplicant" },
      {
        $lookup: {
          from: "jobs",
          localField: "jobId",
          foreignField: "_id",
          as: "job",
        },
      },
      { $unwind: "$job" },
      {
        $lookup: {
          from: "recruiterinfos",
          localField: "recruiterId",
          foreignField: "userId",
          as: "recruiter",
        },
      },
      { $unwind: "$recruiter" },
      {
        $match: {
          [user.type === "recruiter" ? "recruiterId" : "userId"]: user.id,
        },
      },
      {
        $sort: {
          dateOfApplication: -1,
        },
      },
    ]);
    res.status(200).json({
      success: true,
      message: "Job applications list",
      applications,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// update status of application: [Applicant: Can cancel, Recruiter: Can do everything] [todo: test: done]
const updateApplicationStatus = CatchAsyncError(async (req, res, next) => {
  try {
    const user = req.user;
    const id = req.params.id;
    const status = req.body.status;
    // "applied", // when a applicant is applied
    // "shortlisted", // when a applicant is shortlisted
    // "accepted", // when a applicant is accepted
    // "rejected", // when a applicant is rejected
    // "deleted", // when any job is deleted
    // "cancelled", // an application is cancelled by its author or when other application is accepted
    // "finished", // when job is over
    if (user.role === "recruiter") {
      if (status === "accepted") {
        // get job id from application
        // get job info for maxPositions count
        // count applications that are already accepted
        // compare and if condition is satisfied, then save
        const applicationExists = await ApplicationModel.findOne({
          _id: id,
          recruiterId: user.id,
        });
        if (!applicationExists) {
          return next(new ErrorHandler("Application not found", 400));
        }
        const jobExists = await JobModel.findOne({
          _id: application.jobId,
          userId: user.id,
        });
        if (!jobExists) {
          return next(new ErrorHandler("Job not found", 400));
        }

        const activeApplicationCount = await ApplicationModel.countDocuments({
          recruiterId: user._id,
          jobId: job._id,
          status: "accepted",
        });
        if (activeApplicationCount < jobExists.maxPositions) {
          applicationExists.status = status;
          applicationExists.dateOfJoining = req.body.dateOfJoining;
          await applicationExists.save();
          await ApplicationModel.updateMany(
            {
              _id: {
                $ne: applicationExists._id,
              },
              userId: applicationExists.userId,
              status: {
                $nin: [
                  "rejected",
                  "deleted",
                  "cancelled",
                  "accepted",
                  "finished",
                ],
              },
            },
            {
              $set: {
                status: "cancelled",
              },
            },
            { multi: true }
          );

          if (status === "accepted") {
            await JobModel.findOneAndUpdate(
              {
                _id: job._id,
                userId: user._id,
              },
              {
                $set: {
                  acceptedCandidates: activeApplicationCount + 1,
                },
              }
            );
          }
        }
      } else {
        const application = await ApplicationModel.findOneAndUpdate(
          {
            _id: id,
            recruiterId: user._id,
            status: {
              $nin: ["rejected", "deleted", "cancelled"],
            },
          },
          {
            $set: {
              status: status,
            },
          }
        );

        if (!application) {
          return next(
            new ErrorHandler("Application status cannot be updated", 400)
          );
        }
        if (status === "finished") {
          res.status(200).json({
            success: true,
            message: `Job ${status} successfully`,
          });
        } else {
          res.status(200).json({
            success: true,
            message: `Application ${status} successfully`,
          });
        }
      }
    } else {
      if (status === "cancelled") {
        console.log(id);
        console.log(user._id);
        const application = await ApplicationModel.findOneAndUpdate(
          {
            _id: id,
            userId: user._id,
          },
          {
            $set: {
              status: status,
            },
          }
        );
        if (!application) {
          return next(new ErrorHandler("Something went wrong", 400));
        }
        if (application) {
          res.status(200).json({
            success: true,
            message: `Application ${status} successfully`,
          });
        }
      } else {
        return next("You don't have permissions to update job status", 401);
      }
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// get a list of final applicants for current job : recruiter
// get a list of final applicants for all his jobs : recuiter

const getListOfApplicants = CatchAsyncError(async (req, res, next) => {
  try {
    const user = req.user;
    let findParams = {
      recruiterId: user.id,
    };
    if (req.query.jobId) {
      findParams = {
        ...findParams,
        jobId: new mongoose.Types.ObjectId(req.query.jobId),
      };
    }
    if (req.query.status) {
      if (Array.isArray(req.query.status)) {
        findParams = {
          ...findParams,
          status: { $in: req.query.status },
        };
      } else {
        findParams = {
          ...findParams,
          status: req.query.status,
        };
      }
    }
    let sortParams = {};

    if (!req.query.asc && !req.query.desc) {
      sortParams = { _id: 1 };
    }

    if (req.query.asc) {
      if (Array.isArray(req.query.asc)) {
        req.query.asc.map((key) => {
          sortParams = {
            ...sortParams,
            [key]: 1,
          };
        });
      } else {
        sortParams = {
          ...sortParams,
          [req.query.asc]: 1,
        };
      }
    }

    if (req.query.desc) {
      if (Array.isArray(req.query.desc)) {
        req.query.desc.map((key) => {
          sortParams = {
            ...sortParams,
            [key]: -1,
          };
        });
      } else {
        sortParams = {
          ...sortParams,
          [req.query.desc]: -1,
        };
      }
    }
    const applications = await ApplicationModel.aggregate([
      {
        $lookup: {
          from: "jobapplicantinfos",
          localField: "userId",
          foreignField: "userId",
          as: "jobApplicant",
        },
      },
      { $unwind: "$jobApplicant" },
      {
        $lookup: {
          from: "jobs",
          localField: "jobId",
          foreignField: "_id",
          as: "job",
        },
      },
      { $unwind: "$job" },
      { $match: findParams },
      { $sort: sortParams },
    ]);
    res.status(200).json({
      success: true,
      message: "Job applications list",
      applications,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = {
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
};
