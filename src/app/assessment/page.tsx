'use client';

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormControl,
  FormLabel,
  Paper,
  Typography,
  Box,
  Container,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  linkedin: string;
  comments: string;
  visa: string[];
  resume: FileList;
}

const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  linkedin: Yup.string()
    .url('Invalid LinkedIn URL')
    .required('LinkedIn is required'),
  comments: Yup.string().required('This field is required'),
  visa: Yup.array().min(1),
  resume: Yup.mixed(),
});

export default function Assessment() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const resumeFile = watch('resume');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('formData') || '{}');
    Object.keys(savedData).forEach((key) => {
      setValue(key as keyof FormData, savedData[key]);
    });
  }, [setValue]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key as keyof FormData]);
    });

    localStorage.setItem('formData', JSON.stringify(data));

    try {
      // await axios.post('/api/leads', formData);
      console.log('deu certo: ', formData);

      // setSubmitted(true);
      reset();
      localStorage.removeItem('formData');

      router.push('/assessment/thank-you');
    } catch (error) {
      console.error('Submission failed', error);
    }
  };

  const handleClick = () => {
    document.getElementById('resume-upload')?.click();
  };

  return (
    <Box>
      <Box
        sx={{
          height: 300,
          backgroundColor: '#d9dea5',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Container sx={{ textAlign: 'center' }}>
          <Box sx={{ margin: '30px 0' }}>
            <Image
              src="/alma-logo.png"
              width={90}
              height={30}
              style={{ objectFit: 'contain' }}
              alt="logo"
            />
          </Box>
          <Typography
            variant="h2"
            sx={{
              color: '#000',
              textAlign: 'left',
              fontWeight: 700,
              fontSize: { xs: '24px', sm: '32px', md: '60px', lg: '72px' },
              textTransform: 'capitalize',
            }}
          >
            get an assessment
          </Typography>
          <Typography
            variant="h2"
            sx={{
              color: '#000',
              textAlign: 'left',
              fontWeight: 700,
              fontSize: { xs: '24px', sm: '32px', md: '60px', lg: '72px' },
              textTransform: 'capitalize',
            }}
          >
            of your immigration case
          </Typography>
        </Container>
      </Box>

      <Container
        maxWidth="sm"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: 3,
          }}
        >
          <Box>
            <Image
              src="/icon-magnifier.png"
              width={50}
              height={80}
              style={{ objectFit: 'contain' }}
              alt="logo"
            />
          </Box>
          <Typography
            variant="h5"
            sx={{
              color: '#000',
              textAlign: 'center',
              fontWeight: 700,
              lineHeight: '22px',
              marginBottom: 1,
            }}
          >
            Want to understand your visa options?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#000',
              textAlign: 'center',
              fontWeight: 700,
              lineHeight: '16px',
            }}
          >
            Submit the form below and our team of experienced attorneys will
            review your information and send a preliminary assessment of your
            case based on your goals.
          </Typography>
        </Box>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            mt: 5,
            border: 'none',
            boxShadow: 'none',
            maxWidth: '500px',
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="First Name"
              {...register('firstName')}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Last Name"
              {...register('lastName')}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              margin="normal"
            />

            <TextField
              fullWidth
              label="LinkedIn Profile"
              {...register('linkedin')}
              error={!!errors.linkedin}
              helperText={errors.linkedin?.message}
              margin="normal"
            />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                marginTop: 3,
              }}
            >
              <Box>
                <Image
                  src="/icon-magnifier.png"
                  width={50}
                  height={80}
                  style={{ objectFit: 'contain' }}
                  alt="logo"
                />
              </Box>
              <Typography
                variant="h5"
                sx={{
                  color: '#000',
                  textAlign: 'center',
                  fontWeight: 700,
                  lineHeight: '22px',
                  marginBottom: 1,
                }}
              >
                Visa categories of interest?
              </Typography>
            </Box>

            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">
                Visas you're interested in:
              </FormLabel>
              <FormGroup>
                {['O-1', 'EB-1A', 'TN', "I don't Know"].map((visa) => (
                  <FormControlLabel
                    key={visa}
                    control={<Checkbox {...register('visa')} value={visa} />}
                    label={visa}
                  />
                ))}
              </FormGroup>
            </FormControl>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                marginTop: 3,
              }}
            >
              <Box>
                <Image
                  src="/icon-magnifier.png"
                  width={50}
                  height={80}
                  style={{ objectFit: 'contain' }}
                  alt="logo"
                />
              </Box>
              <Typography
                variant="h5"
                sx={{
                  color: '#000',
                  textAlign: 'center',
                  fontWeight: 700,
                  lineHeight: '22px',
                  marginBottom: 1,
                }}
              >
                How can we help you?
              </Typography>
            </Box>

            <TextField
              fullWidth
              label="Additional Comments"
              placeholder="What is your current status and when does it expire? What is your past immigration history? Are you looking for long-term permanent residency or shot-term employment visa or both? Are there any timeline considerations?"
              multiline
              rows={4}
              {...register('comments')}
              error={!!errors.comments}
              helperText={errors.comments?.message}
              margin="normal"
            />

            <Box>
              <input
                type="file"
                id="resume-upload"
                {...register('resume')}
                onChange={(e) => {
                  register('resume').onChange(e);
                }}
                style={{ display: 'none' }}
              />

              <Button
                variant="contained"
                component="span"
                onClick={handleClick}
                sx={{ mt: 2, backgroundColor: '#000' }}
              >
                Upload Resume
              </Button>

              <Typography variant="body2" sx={{ mt: 1 }}>
                {resumeFile?.length > 0 ? resumeFile[0].name : 'No file chosen'}
              </Typography>
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, backgroundColor: '#000' }}
            >
              Submit
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
