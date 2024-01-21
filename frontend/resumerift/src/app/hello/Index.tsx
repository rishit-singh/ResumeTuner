// pages/index.tsx

import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

const Header = () => (
  <AppBar position="static" style={{ background: '#001f3f' }}>
    <Toolbar>
      <Typography variant="h6" style={{ marginRight: 'auto', fontWeight: 'bold' }}>
        ResumeRift
      </Typography>
      <Link href="/">
        <Button color="inherit">Home</Button>
      </Link>
      <Link href="/about">
        <Button color="inherit">About</Button>
      </Link>
      <Link href="/login">
        <Button color="inherit">Login</Button>
      </Link>
    </Toolbar>
  </AppBar>
);

export default Header;
