// pages/index.tsx

import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

export default function Header() {
  return (
  <AppBar position="static" style={{backgroundColor:"#2C363F"}}>
    <Toolbar>
        <Typography variant="h4" style={{ marginRight: 'auto', fontWeight: 'bold', fontFamily: "Jockey One"}}>
          ResumeRift
        </Typography>
      </Toolbar>
    </AppBar>); 
}
