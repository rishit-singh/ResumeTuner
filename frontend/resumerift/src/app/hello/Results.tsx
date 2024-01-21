// pages/results.tsx

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

const Results = () => {
  const classes = useStyles();
  const [oldResume, setOldResume] = useState('');
  const [newResume, setNewResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  const handleJobDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJobDescription(event.target.value);
  };

  const handleRefresh = () => {
    // Handle resume tuning logic
    // Set the tuned resume to the 'newResume' state
  };

  return (
    <>
      <CssBaseline />
      <Container component="main" className={classes.root}>
        <div className={classes.leftContainer}>
          <Typography variant="h5">Old Resume</Typography>
          {/* Display old resume here */}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            multiline
            rows={5}
            value={jobDescription}
            onChange={handleJobDescChange}
          />
          <Button variant="contained" color="primary" className={classes.button} onClick={handleRefresh}>
            Refresh
          </Button>
        </div>
        <div className={classes.rightContainer}>
          <Typography variant="h5">Tuned Resume</Typography>
          {/* Display tuned resume here */}
          <TextField variant="outlined" margin="normal" fullWidth multiline rows={5} value={newResume} disabled />
        </div>
      </Container>
    </>
  );
};

export default Results;
