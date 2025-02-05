import styled from 'styled-components';
import { Box, ListItem, Drawer } from '@mui/material';

export const DrawerContainer = styled(Drawer)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const LogoContainer = styled(Box)`
  margin: 20px 10px;
`;

export const StyledListItem = styled(ListItem)`
  a {
    color: inherit;
    text-decoration: none;
  }
`;

export const AvatarContainer = styled(Box)`
  padding: 2rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
`;

export const MainContent = styled.main`
  margin-left: 200px;
  padding: 20px;
`;
