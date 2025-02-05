import styled from 'styled-components';
import { Button, Box } from '@mui/material';

export const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 2rem;
`;

export const Logo = styled(Box)`
  margin: 30px 0;
`;

export const StyledButtonPrimary = styled(Button)`
  height: 150px;
  width: 100%;
  font-size: 1.5rem;
  background-color: '#1976d2';
  &:hover {
    background-color: #1565c0;
  }
`;

export const StyledButtonSecondary = styled(Button)`
  height: 150px;
  width: 100%;
  font-size: 1.5rem;
  background-color: #9c27b0;
  &:hover {
    background-color: #7b1fa2;
  }
`;

export const ModalContent = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 4rem;
  border-radius: 2px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 300px;
`;
