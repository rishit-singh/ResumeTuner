// pages/job-desc.tsx
"use client"
import Header from '../Header';
import { useState } from 'react';
import { Button, Container, CssBaseline, TextField, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100vh',
    background: 'plain', // Set your desired plain background color here
  },
  leftContainer: {
    width: '50%',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  rightContainer: {
    width: '50%',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: theme.spacing(2, 0),
    width: '80%', // Set your desired width for the buttons
  },
  uploadArea: {
    width: '100%',
    height: '80%',
    backgroundColor: '#ADD8E6', // Light blue background for the uploaded document area
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
}));

export default function JobDesc() {
  const classes = useStyles();
  const [jobDescription, setJobDescription] = useState('');
  const [resumeUploaded, setResumeUploaded] = useState(false);

  const handleJobDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJobDescription(event.target.value);
  };

  const handleJobDescSubmit = () => {
    // Handle job description submission logic
  };

  const handleResumeUpload = () => {
    // Placeholder logic for resume upload
    setResumeUploaded(true);
  };

  return (
    <>
      <CssBaseline />
      <Header /> {Header}
      <Container component="main" className={classes.root}>
        <div className={classes.leftContainer}>
          <div className={classes.uploadArea}>
            {resumeUploaded ? (
              // Display the uploaded resume content here
              <Typography variant="body1">Uploaded Document (PDF)</Typography>
            ) : (
              // Display a message or placeholder when no resume is uploaded
              <Typography variant="body1">No resume uploaded</Typography>
            )}
          </div>
          <Button variant="contained" color="primary" className={classes.button} onClick={handleResumeUpload}>
            Upload Resume
          </Button>
        </div>
        <div className={classes.rightContainer}>
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            Please provide a job description
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            multiline
            rows={5}
            value={jobDescription}
            onChange={handleJobDescChange}
          />
          <Button variant="contained" color="secondary" className={classes.button} onClick={handleJobDescSubmit}>
            Submit
          </Button>
        </div>
      </Container>
    </>
  );
};
