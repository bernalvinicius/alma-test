'use client';

import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormControl,
  FormLabel,
  Typography,
  Box,
  Container,
} from '@mui/material';
import { validationSchema } from './validationSchema';
import type { FormData } from './validationSchema';
import {
  StyledBox,
  StyledContainer,
  StyledPaper,
  StyledTextField,
  StyledTypography,
  StyledButton,
  StyledImage,
  BackgroundBox,
} from './StyledComponents';
import Image from 'next/image';

const Assessment = () => {
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
    <StyledBox>
      <BackgroundBox>
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
      </BackgroundBox>

      <StyledContainer maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 3,
          }}
        >
          <Box>
            <StyledImage
              src="/icon-magnifier.png"
              width={50}
              height={80}
              alt="icon"
            />
          </Box>
          <StyledTypography variant="h5">
            Want to understand your visa options?
          </StyledTypography>
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

        <StyledPaper elevation={3}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <StyledTextField
              fullWidth
              label="First Name"
              {...register('firstName')}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              margin="normal"
            />
            <StyledTextField
              fullWidth
              label="Last Name"
              {...register('lastName')}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              margin="normal"
            />
            <StyledTextField
              fullWidth
              label="Email"
              type="email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              margin="normal"
            />
            <StyledTextField
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
                flexDirection: 'column',
                marginTop: 3,
              }}
            >
              <Box>
                <StyledImage
                  src="/icon-magnifier.png"
                  width={50}
                  height={80}
                  alt="icon"
                />
              </Box>
              <StyledTypography variant="h5">
                Visa categories of interest?
              </StyledTypography>
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
                flexDirection: 'column',
                marginTop: 3,
              }}
            >
              <Box>
                <StyledImage
                  src="/icon-magnifier.png"
                  width={50}
                  height={80}
                  alt="icon"
                />
              </Box>
              <StyledTypography variant="h5">
                How can we help you?
              </StyledTypography>
            </Box>

            <StyledTextField
              fullWidth
              label="Additional Comments"
              placeholder="What is your current status and when does it expire? What is your past immigration history? Are you looking for long-term permanent residency or short-term employment visa or both? Are there any timeline considerations?"
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

            <StyledButton
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Submit
            </StyledButton>
          </form>
        </StyledPaper>
      </StyledContainer>
    </StyledBox>
  );
};

export default Assessment;
