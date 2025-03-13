"use client";

import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

export default function Layout({ children }) {
  return (
    <html lang="fr">
      <head>
        <title>Ticket Place</title>
      </head>
      <body>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">TAPAKILA</Typography>
          </Toolbar>
        </AppBar>
        {children}
      </body>
    </html>
  );
}