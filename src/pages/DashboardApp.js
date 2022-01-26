import React, { useEffect, useState } from 'react';
// material
import { Box, Grid, Container, Typography } from '@mui/material';

import toast from 'react-hot-toast';
import { getDashboardApi } from '../apis/Admin';

// components
import Page from '../components/Page';
import {
  AppProviderCount,
  AppOrderCount,
  AppProductCount,
  AppUserCount
} from '../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [dashboard, setDashboard] = useState({
    users: '0',
    providers: '0',
    products: '0',
    orders: '0'
  });
  useEffect(() => {
    getDashboardData();
  }, []);
  const getDashboardData = async () => {
    try {
      const {
        data: { data }
      } = await getDashboardApi();
      setDashboard((prev) => ({ ...prev, ...data }));
    } catch (err) {
      toast.error('خطا در سرور');
    }
  };
  return (
    <Page title="Dashboard | Detal-Admin">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">سلام. به پنل مدیریت خوش آمدید</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppUserCount count={dashboard.users} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppProviderCount count={dashboard.providers} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppProductCount count={dashboard.products} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppOrderCount count={dashboard.orders} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
