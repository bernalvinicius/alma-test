'use client';

import React from 'react';
import Link from 'next/link';
import {
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import Image from 'next/image';

const Layout = ({ children }) => (
  <>
    <Drawer
      variant="permanent"
      sx={{ flexShrink: 0 }}
      PaperProps={{
        sx: {
          width: 200,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
      }}
    >
      <Box sx={{ margin: '20px 10px' }}>
        <Image
          src="/alma-logo.png"
          width={90}
          height={30}
          style={{ objectFit: 'contain' }}
          alt="logo"
        />
      </Box>
      <List sx={{ flexGrow: 1 }}>
        <ListItem component={Link} href="/leads">
          <ListItemText primary="Leads" />
        </ListItem>
        <ListItem component={Link} href="">
          <ListItemText primary="Settings" />
        </ListItem>
      </List>

      <Box
        sx={{
          padding: 2,
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 1,
        }}
      >
        <Avatar
          sx={{ bgcolor: 'grey.300', width: 32, height: 32, fontSize: 16 }}
        >
          A
        </Avatar>
        <strong>Admin</strong>
      </Box>
    </Drawer>

    <main style={{ marginLeft: '200px', padding: '20px' }}>{children}</main>
  </>
);

export default Layout;
