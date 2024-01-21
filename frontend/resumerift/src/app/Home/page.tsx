// pages/home.tsx
"use client"
import { useState } from 'react';
import { Button, Container, CssBaseline, Typography, makeStyles } from '@material-ui/core';
import Link from 'next/link';
import Header from '../Header';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'white', // Background color for the page
  },
  title: {
    fontWeight: 'bold',
    fontSize: '3rem', // Bigger font size for the title
    marginBottom: theme.spacing(3), // Add more spacing below the title
  },
  text: {
    fontStyle: 'italic', // Italic text style
    textAlign: 'center', // Center align text
    marginTop: theme.spacing(3), // Add more spacing above the text
    marginBottom: theme.spacing(3), // Add more spacing below the text
  },
  button: {
    margin: theme.spacing(3), // Add more spacing around the button
    backgroundColor: '#ADD8E6', // Light blue background color for the button
    color: 'black', // Black text color for the button
  },
}));

export default function Home() {
  const classes = useStyles();

  const handleUploadResume = () => {
    // Your logic for handling the upload resume button click goes here
    // For now, leave the body of the function blank
  };

  return (
    <>
      <CssBaseline />
      <Header /> {Header}
      <Container component="main" className={classes.root}>
        <Typography variant="h1" className={classes.title}>ResumeRift</Typography>
        <Typography variant="body1" className={classes.text}>
          Input your Resume and a job description, and ResumeRift will generate a new Resume tailored for that job.
        </Typography>
        <Link href="/job-desc">
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleUploadResume} // Attach the event handler to the button click
          >
            Upload Resume
          </Button>
        </Link>
      </Container>
    </>
  );
}
