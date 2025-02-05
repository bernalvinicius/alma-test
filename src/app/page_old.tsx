'use client';

import { useState, useEffect } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';
import { materialCells } from '@jsonforms/material-renderers';
import axios from 'axios';
import { Button } from '@mui/material';
import Image from 'next/image';

const schema = {
  type: 'object',
  properties: {
    first_name: { type: 'string', title: 'First Name' },
    last_name: { type: 'string', title: 'Last Name' },
    email: { type: 'string', title: 'Email' },
    linkedin_url: { type: 'string', title: 'LinkedIn / Personal Website URL' },
    // visas_of_interest: {
    //   type: 'array',
    //   title: 'Visas of Interest',
    //   items: {
    //     type: 'string',
    //     enum: ['O-1', 'EB-1A', 'TN', "I don't Know"],
    //   },
    //   uniqueItems: true,
    // },
    resume: { type: 'string', format: 'data-url', title: 'Resume / CV' },
    comments: { type: 'string', title: 'Additional Comments' },
  },
  required: ['first_name', 'last_name', 'email', 'linkedin_url', 'resume'],
};

const uischema = {
  type: 'VerticalLayout',
  elements: [
    { type: 'Control', scope: '#/properties/first_name' },
    { type: 'Control', scope: '#/properties/last_name' },
    { type: 'Control', scope: '#/properties/email' },
    { type: 'Control', scope: '#/properties/linkedin_url' },
    // { type: 'Control', scope: '#/properties/visas_of_interest' },
    // { type: 'Control', scope: '#/properties/comments' },
  ],
};

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({});
  const [isClient, setIsClient] = useState(false);

  const [isFirstTimeFormInitiated, setIsFirstTimeFormInitiated] =
    useState(false);
  const [isAccessed, setIsAccessed] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({ ...prev, resume: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = [
      'first_name',
      'last_name',
      'email',
      'linkedin_url',
      'resume',
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors[field] = 'This field is required';
      }
    });

    return Object.keys(errors).length === 0;
  };

  const onSubmit = async () => {
    !isAccessed && setIsAccessed(true);

    if (validateForm()) {
      try {
        await axios.post('/api/leads', formData);
        setSubmitted(true);
      } catch (error) {
        console.error('Submission failed', error);
      }
    }
  };

  if (submitted) {
    return <p>Thank you for submitting your information!</p>;
  }

  return (
    <div>
      <div
        style={{
          height: '300px',
          backgroundColor: '#d9dea5',
        }}
      >
        <div
          style={{
            // border: '1px solid red',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <div>
            <div
              style={{
                margin: '30px 0',
              }}
            >
              <Image
                src="/alma-logo.png"
                width={90}
                height={30}
                objectFit="contain"
                alt="logo"
              />
            </div>
            <div>
              <span
                style={{
                  display: 'block',
                  color: '#000',
                  textAlign: 'left',
                  fontSize: '66px', // 40px celular
                  fontWeight: '700',
                  lineHeight: '74px', // 40px celular
                  textTransform: 'capitalize',
                }}
              >
                get an assessment
              </span>
              <span
                style={{
                  display: 'block',
                  color: '#000',
                  textAlign: 'left',
                  fontSize: '66px', // 40px celular
                  fontWeight: '700',
                  lineHeight: '74px', // 40px celular
                  textTransform: 'capitalize',
                }}
              >
                of your immigration case
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: 'white',
        }}
      >
        <div
          style={{
            padding: '20px',
            maxWidth: '600px',
            margin: '0 auto',
            //  padding: 20px;
            //  max-width: 600px;
            //  margin: 0 auto;
          }}
        >
          <div
            style={{
              // margin: '30px 0',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Image
              src="/icon-magnifier.png"
              width={50}
              height={80}
              objectFit="contain"
              alt="logo"
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                margin: '10px 0',
              }}
            >
              <span
                style={{
                  display: 'block',
                  color: '#000',
                  textAlign: 'center',
                  fontSize: '22px', // 40px celular
                  fontWeight: '700',
                  lineHeight: '22px', // 40px celular
                }}
              >
                Want to understand your visa options?
              </span>
            </div>
            <div>
              <span
                style={{
                  display: 'block',
                  color: '#000',
                  textAlign: 'center',
                  fontSize: '16px', // 40px celular
                  fontWeight: '700',
                  lineHeight: '16px', // 40px celular
                }}
              >
                Submit the form below and our team of experienced attorneys will
                review your information and send a preliminary assessment of
                your case based on your goals.
              </span>
            </div>
          </div>
          {/* // form */}
          <div
            style={{
              maxWidth: '400px',
              margin: 'auto',
              padding: '20px',
            }}
          >
            {isClient && (
              <JsonForms
                schema={schema}
                uischema={uischema}
                data={formData}
                renderers={materialRenderers}
                cells={materialCells}
                // onChange={({ data }) => setFormData(data)}
                onChange={(e) => {
                  setFormData(e.data);
                  if (!isFirstTimeFormInitiated) {
                    // REMARK: A rough way to prevent first time render
                    // triggering the setIsAccessed() too early.
                    setIsFirstTimeFormInitiated(true);
                    return;
                  }
                  !isAccessed && setIsAccessed(true);
                }}
                // REMARK: Manipulate this with custom flags to hide the errors.
                validationMode={
                  isAccessed ? 'ValidateAndShow' : 'ValidateAndHide'
                }
              />
            )}
            <div
              style={{
                // margin: '30px 0',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Image
                src="/icon-magnifier.png"
                width={50}
                height={80}
                objectFit="contain"
                alt="logo"
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  margin: '10px 0',
                }}
              >
                <span
                  style={{
                    display: 'block',
                    color: '#000',
                    textAlign: 'center',
                    fontSize: '22px', // 40px celular
                    fontWeight: '700',
                    lineHeight: '22px', // 40px celular
                  }}
                >
                  Visa categories of interest?
                </span>
              </div>
            </div>
            {/* <div>
              <label>Resume / CV:</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                style={{
                  borderColor: formErrors.resume ? 'red' : '',
                  borderWidth: formErrors.resume ? '2px' : '',
                }}
              />
              {formErrors.resume && (
                <span style={{ color: 'red' }}>{formErrors.resume}</span>
              )}
            </div> */}
            <Button
              onClick={onSubmit}
              variant="contained"
              color="primary"
              style={{ marginTop: '10px' }}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// want to understand your visa options?

// submit the form below and our team of experienced attorneys will review your information and send a preliminary assessment of your case based on your goals.

// visa categories of interest?

// how can we help you?

// What is your current status and when does it expire? What is your past immigration history? Are you looking for long-term permanent residency or shot-term employment visa or both? Are there any timeline considerations?
