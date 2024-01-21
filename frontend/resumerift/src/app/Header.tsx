import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import Image from 'next/image';  // Import Image from 'next/image'

// Import your image
import yourImage from './Logo.webp';

export default function Header() {
  return (
    <AppBar position="static" style={{ backgroundColor: "#2C363F" }}>
      <Toolbar>
        {/* Use the Image component */}
        <Image src={yourImage} alt="Your Alt Text" width={40} height={40} />

        <Typography variant="h4" style={{ marginLeft: '10px', marginRight: 'auto', fontWeight: 'bold', fontFamily: "Jockey One" }}>
          ResumeRift
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
