'use client';

'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { Avatar, List, ListItemText } from '@mui/material';
import Image from 'next/image';
import {
  DrawerContainer,
  LogoContainer,
  StyledListItem,
  AvatarContainer,
  MainContent,
} from './LayoutStyles';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <DrawerContainer
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
      <LogoContainer>
        <Image
          src="/alma-logo.png"
          width={90}
          height={30}
          style={{ objectFit: 'contain' }}
          alt="logo"
        />
      </LogoContainer>
      <List sx={{ flexGrow: 1 }}>
        <StyledListItem component={Link} href="/leads">
          <ListItemText primary="Leads" />
        </StyledListItem>
        <StyledListItem component={Link} href="">
          <ListItemText primary="Settings" />
        </StyledListItem>
      </List>

      <AvatarContainer>
        <Avatar
          sx={{ bgcolor: 'grey.300', width: 32, height: 32, fontSize: 16 }}
        >
          A
        </Avatar>
        <strong>Admin</strong>
      </AvatarContainer>
    </DrawerContainer>

    <MainContent>{children}</MainContent>
  </>
);

export default Layout;
