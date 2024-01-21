// components/Header.tsx
import React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: '#001f3f', // Dark-blue background color for the header
  },
  title: {
    flexGrow: 1, // Allows the title to take up all available space
    fontWeight: 'bold',
  },
  navLink: {
    marginLeft: theme.spacing(2),
    color: 'white', // Font color for the navigation links
    fontWeight: 'bold',
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          ResumeRift
        </Typography>
        <div>
          <Link href="/about">
            <Button color="inherit" className={classes.navLink}>About</Button>
          </Link>
          <Link href="/home">
            <Button color="inherit" className={classes.navLink}>Home</Button>
          </Link>
          <Link href="/login">
            <Button color="inherit" className={classes.navLink}>Login</Button>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

