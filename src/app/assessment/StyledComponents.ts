import styled from 'styled-components';
import {
  Box,
  Container,
  Paper,
  TextField,
  Typography,
  Button,
} from '@mui/material';
import Image from 'next/image';

export const BackgroundBox = styled.div`
  height: 300px;
  background-color: #d9dea5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledBox = styled(Box)`
  background-color: #f9f9f9;
`;

export const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledPaper = styled(Paper)`
  padding: 24px;
  margin-top: 32px;
  box-shadow: none;
  max-width: 500px;
`;

export const StyledTextField = styled(TextField)`
  margin-top: 16px;
`;

export const StyledTypography = styled(Typography)`
  color: #000;
  text-align: center;
  font-weight: 700;
`;

export const StyledButton = styled(Button)`
  background-color: #000;
`;

export const StyledImage = styled(Image)`
  object-fit: contain;
`;
