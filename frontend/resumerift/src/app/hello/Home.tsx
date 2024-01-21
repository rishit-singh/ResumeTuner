// pages/home.tsx

import { useState } from 'react';
import { Button, Container, CssBaseline,Typography, makeStyles } from '@material-ui/core';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: '#001f3f',
    color: 'black',
    fontWeight: 'bold',
  },
  button: {
    margin: theme.spacing(2),
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Container component="main" className={classes.root}>
        <Typography variant="h3">ResumeRift</Typography>
        <Link href="/job-desc">
          <Button variant="contained" color="primary" className={classes.button}>
            Upload Resume
          </Button>
        </Link>
      </Container>
    </>
  );
};

export default Home;
