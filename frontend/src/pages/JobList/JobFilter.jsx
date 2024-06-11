import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Typography,
} from "@mui/material";

const skills = [
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "Machine Learning",
  "SQL",
  "HTML",
  "CSS",
  "Express",
  "MongoDB",
  "Docker",
  "AWS",
];

const JobFilter = ({ filters, setFilters }) => {
  const handleSkillChange = (event) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      skills: checked
        ? [...prevFilters.skills, name]
        : prevFilters.skills.filter((skill) => skill !== name),
    }));
  };

  const handleSalaryChange = (event, newValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      salary: newValue,
    }));
  };
  console.log("filters", filters);

  return (
    <Box sx={{ width: 300, padding: 2 }}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Skills</FormLabel>
        <FormGroup>
          {skills.map((skill) => (
            <FormControlLabel
              key={skill}
              control={
                <Checkbox
                  checked={filters.skills?.includes(skill)}
                  onChange={handleSkillChange}
                  name={skill}
                />
              }
              label={skill}
            />
          ))}
        </FormGroup>
      </FormControl>
      <FormControl component="fieldset" sx={{ mt: 4 }}>
        <FormLabel component="legend">Salary Range</FormLabel>
        <Slider
          value={filters.salary}
          onChange={handleSalaryChange}
          valueLabelDisplay="auto"
          min={0}
          max={200000}
          step={1000}
        />
        <Typography variant="body2">
          ${filters.salary[0].toLocaleString()} - $
          {filters.salary[1].toLocaleString()}
        </Typography>
      </FormControl>
    </Box>
  );
};

export default JobFilter;
