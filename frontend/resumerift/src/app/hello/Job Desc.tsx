// pages/job-desc.tsx

import { useState } from 'react';
import { Button, Container, CssBaseline, TextField, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100vh',
    background: '#001f3f',
    color: 'black',
    fontWeight: 'bold',
  },
  leftContainer: {
    width: '50%',
    padding: theme.spacing(2),
  },
  rightContainer: {
    width: '50%',
    padding: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(2, 0),
  },
}));

const JobDesc = () => {
  const classes = useStyles();
  const [jobDescription, setJobDescription] = useState('');

  const handleJobDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJobDescription(event.target.value);
  };

  const handleJobDescSubmit = () => {
    // Handle job description submission logic
  };

  return (
    <>
      <CssBaseline />
      <Container component="main" className={classes.root}>
        <div className={classes.leftContainer}>
          <Button variant="contained" color="primary" className={classes.button}>
            Upload Resume
          </Button>
        </div>
        <div className={classes.rightContainer}>
          <Typography variant="h5">Please provide a job description</Typography>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            multiline
            rows={5}
            value={jobDescription}
            onChange={handleJobDescChange}
          />
          <Button variant="contained" color="primary" className={classes.button} onClick={handleJobDescSubmit}>
            Submit
          </Button>
        </div>
      </Container>
    </>
  );
};

export default JobDesc;
