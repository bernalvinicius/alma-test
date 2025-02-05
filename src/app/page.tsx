'use client';

import React, { useState, useEffect } from 'react';
import { Button, Grid, Modal, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { authenticateUser, setUser } from '@/redux/slices/userSlice';
import {
  Container,
  Logo,
  StyledButtonPrimary,
  StyledButtonSecondary,
  ModalContent,
} from './HomeStyles';

const Home: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const [openModal, setOpenModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleNavigate = (route: string): void => {
    if (route === '/leads' && !isAuthenticated) {
      setOpenModal(true);
    } else {
      router.push(route);
    }
  };

  const handleLogin = () => {
    dispatch(setUser({ username, password }));
    dispatch(authenticateUser());

    router.push('/leads');
    setOpenModal(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/leads');
    }
  }, [isAuthenticated, router]);

  return (
    <Container>
      <Logo>
        <Image
          src="/alma-logo.png"
          width={90}
          height={30}
          style={{ objectFit: 'contain' }}
          alt="logo"
        />
      </Logo>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <StyledButtonPrimary
            variant="contained"
            onClick={() => handleNavigate('/assessment')}
            color="primary"
          >
            Go to Assessment
          </StyledButtonPrimary>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StyledButtonSecondary
            variant="contained"
            onClick={() => handleNavigate('/leads')}
            color="secondary"
          >
            Go to Leads
          </StyledButtonSecondary>
        </Grid>
      </Grid>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <ModalContent>
          <Typography variant="h6" gutterBottom>
            Please Login
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" fullWidth onClick={handleLogin}>
            Login
          </Button>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Home;
