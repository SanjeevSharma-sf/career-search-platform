import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { fetchJobs } from "../features/jobs/jobsSlice";
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  Container,
  Grid,
} from "@mui/material";
import { jobs as jobsArray } from "../../tempData/jobs";
import { fetchJobs } from "../../redux/jobSlice";
import JobCard from "./JobCard";
import JobFilter from "./JobFilter";

const JobList = () => {
  const dispatch = useDispatch();
  //   const jobs = useSelector((state) => state.jobs.jobs);
  // const jobStatus = useSelector((state) => state.jobs.status);
  const jobStatus = "succeeded";
  //   const error = useSelector((state) => state.jobs.error);
  //   const jobs = jobsArray;
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    skills: ["JavaScript", "React", "Node.js", "Python", "Java"],
    salary: [0, 200000],
  });
  useEffect(() => {
    setJobs(jobsArray);
  }, [jobsArray]);

  console.log("jobsArray", jobs);

  //   useEffect(() => {
  //     if (jobStatus === "idle") {
  //       dispatch(fetchJobs());
  //     }
  //   }, [jobStatus, dispatch]);

  let content;

  if (jobStatus === "loading") {
    content = <Typography>Loading...</Typography>;
  } else if (jobStatus === "succeeded") {
    content =
      jobs?.length > 0 &&
      jobs?.map((job) => (
        <Card key={job._id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h5">{job.title}</Typography>
            <Typography variant="body2">{job.description}</Typography>
            <Typography variant="h6">Recommendations:</Typography>
            <List>
              {job.recommendations.map((rec, index) => (
                <ListItem key={index}>{rec}</ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      ));
  } else if (jobStatus === "failed") {
    // content = <Typography>{error}</Typography>;
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          {" "}
          {/* Adjust the grid size as per your layout */}
          {/* Render JobFilter component on the left */}
          <JobFilter filters={filters} setFilters={setFilters} />
        </Grid>
        <Grid item xs={12} sm={8}>
          {" "}
          {/* Adjust the grid size as per your layout */}
          <Typography variant="h4" component="h1" gutterBottom>
            Job Listings
          </Typography>
          <Grid container spacing={3}>
            {jobs.map((job, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <JobCard job={job} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default JobList;
