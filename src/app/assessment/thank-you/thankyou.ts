import styled from 'styled-components';
import { Box, Button, Container, Typography } from '@mui/material';

export const StyledContainer = styled(Container)`
  text-align: center;
`;

export const StyledBox = styled(Box)`
  margin: 50px 0;
`;

export const StyledTitle = styled(Typography)`
  color: #000;
  text-align: center;
  font-weight: 700;
  font-size: 32px;
  text-transform: capitalize;
`;

export const StyledSubtitle = styled(Typography)`
  color: #000;
  text-align: center;
  font-weight: 700;
  font-size: 24px;
`;

export const StyledButton = styled(Button)`
  text-transform: capitalize;
  font-weight: bold;
  background-color: #000;
  width: 300px;
  margin-top: 16px;
`;
