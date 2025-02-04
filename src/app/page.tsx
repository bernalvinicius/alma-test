'use client';

import { useState, useEffect } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';
import { materialCells } from '@jsonforms/material-renderers';
import axios from 'axios';
import { Button } from '@mui/material';

const schema = {
  type: 'object',
  properties: {
    first_name: { type: 'string', title: 'First Name' },
    last_name: { type: 'string', title: 'Last Name' },
    email: { type: 'string', title: 'Email' },
    linkedin_url: { type: 'string', title: 'LinkedIn URL' },
    visas_of_interest: {
      type: 'array',
      title: 'Visas of Interest',
      items: {
        type: 'string',
        enum: ['O-1', 'EB-1A', 'TN', "I don't Know"],
      },
      uniqueItems: true,
    },
    resume: { type: 'string', format: 'data-url', title: 'Resume / CV' },
    comments: { type: 'string', title: 'Additional Comments' },
  },
  required: [
    'first_name',
    'last_name',
    'email',
    'linkedin_url',
    'visas_of_interest',
    'resume',
  ],
};

const uischema = {
  type: 'VerticalLayout',
  elements: [
    { type: 'Control', scope: '#/properties/first_name' },
    { type: 'Control', scope: '#/properties/last_name' },
    { type: 'Control', scope: '#/properties/email' },
    { type: 'Control', scope: '#/properties/linkedin_url' },
    { type: 'Control', scope: '#/properties/visas_of_interest' },
    { type: 'Control', scope: '#/properties/comments' },
  ],
};

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({});

  const [isClient, setIsClient] = useState(false);

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

  const onSubmit = async () => {
    try {
      await axios.post('/api/leads', formData);
      setSubmitted(true);
    } catch (error) {
      console.error('Submission failed', error);
    }
  };

  if (submitted) {
    return <p>Thank you for submitting your information!</p>;
  }

  return (
    <div
      style={{
        maxWidth: '500px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
      }}
    >
      {isClient && (
        <JsonForms
          schema={schema}
          uischema={uischema}
          data={formData}
          renderers={materialRenderers}
          cells={materialCells}
          onChange={({ data }) => setFormData(data)}
        />
      )}
      <div>
        <label>Resume / CV:</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileUpload}
        />
      </div>
      <Button
        onClick={onSubmit}
        variant="contained"
        color="primary"
        style={{ marginTop: '10px' }}
      >
        Submit
      </Button>
    </div>
  );
}
