import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";

const JobCard = ({ job }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {job.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {job.jobType}
        </Typography>
        <Typography variant="body2">
          <strong>Salary:</strong> ${job.salary.toLocaleString()}
        </Typography>
        <Typography variant="body2">
          <strong>Duration:</strong> {job.duration} months
        </Typography>
        <Typography variant="body2">
          <strong>Rating:</strong> {job.rating}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          <strong>Skills:</strong>
        </Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", mt: 1 }}>
          {job.skillsets.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              icon={<WorkIcon />}
              variant="outlined"
            />
          ))}
        </Stack>
        <Typography variant="body2" sx={{ mt: 2 }}>
          <strong>Recommendations:</strong>
        </Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", mt: 1 }}>
          {job.recommendations.map((recommendation, index) => (
            <Chip key={index} label={recommendation} color="primary" />
          ))}
        </Stack>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default JobCard;
