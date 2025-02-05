'use client';

import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { authenticateUser, setUser } from '@/redux/slices/userSlice';

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

    // Após a autenticação, redirecionar para /leads
    router.push('/leads');
    setOpenModal(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/leads');
    }
  }, [isAuthenticated, router]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: 2,
      }}
    >
      <Box sx={{ margin: '30px 0' }}>
        <Image
          src="/alma-logo.png"
          width={90}
          height={30}
          style={{ objectFit: 'contain' }}
          alt="logo"
        />
      </Box>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              height: '150px',
              fontSize: '1.5rem',
              backgroundColor: 'primary.main',
              '&:hover': { backgroundColor: 'primary.dark' },
            }}
            onClick={() => handleNavigate('/assessment')}
          >
            Go to Assessment
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              height: '150px',
              fontSize: '1.5rem',
              backgroundColor: 'secondary.main',
              '&:hover': { backgroundColor: 'secondary.dark' },
            }}
            onClick={() => handleNavigate('/leads')}
          >
            Go to Leads
          </Button>
        </Grid>
      </Grid>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            padding: 4,
            borderRadius: 2,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: 300,
          }}
        >
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
        </Box>
      </Modal>
    </Box>
  );
};

export default Home;
