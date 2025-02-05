'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Layout from './Layout';
import LeadsTable from './LeadsTable';

const Leads = () => {
  const router = useRouter();

  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  return (
    <Layout>
      <h2>Leads</h2>
      <LeadsTable />
    </Layout>
  );
};

export default Leads;
