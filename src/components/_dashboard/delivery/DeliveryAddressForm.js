import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import backFill from '@iconify/icons-eva/arrow-back-fill';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  TextField,
  Select,
  OutlinedInput,
  MenuItem,
  useTheme,
  Chip
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import toast from 'react-hot-toast';
// components
import Page from '../../Page';
import Scrollbar from '../../Scrollbar';
import {
  updateDeliveryAddressApi,
  getDeliveryApi,
  getDeliveryAddressApi
} from '../../../apis/Delivery';
import { getCitiesApi } from '../../../apis/Admin';

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(10, 0)
}));

function getStyles(userId, selectedUserId, theme) {
  return {
    fontWeight:
      userId !== selectedUserId
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

DeliveryForm.propTypes = {
  mode: PropTypes.oneOf(['edit', 'create']).isRequired
};
export default function DeliveryForm() {
  const theme = useTheme();
  const { id: deliveryId } = useParams();
  const navigate = useNavigate();

  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [delivery, setDelivery] = useState({});

  useEffect(() => {
    getDeliveryAddress();
  }, []);

  const formSchema = Yup.object().shape({
    name: Yup.string().required('کاربر را انتخاب کنید'),
    address: Yup.string().required('آدرس فروشگاه الزامی است'),
    cityId: Yup.string().required('شهر را انتخاب کنید'),
    areaId: Yup.string().required('محله را انتخاب کنید')
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      cityId: '',
      areaId: ''
    },
    validationSchema: formSchema,
    onSubmit: (data) => sentDataToserver(data)
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, setValues } = formik;

  const getDeliveryAddress = async () => {
    try {
      const {
        data: {
          status,
          message,
          data: { delivery: deliveryData, address: deliveryAddress, cities }
        }
      } = await getDeliveryAddressApi(deliveryId);

      if (status) {
        setCities(cities);
        setDelivery(delivery);
        const { name } = deliveryData;
        if (deliveryAddress) {
          const { address, cityId, areaId } = deliveryAddress;
          await handleCityChange(cityId, cities);
          setValues({ cityId, areaId, name, address });
        } else {
          setValues({ name });
        }
      } else {
        toast.error(message);
        navigate('/dashboard/delivery');
      }
    } catch (err) {
      toast.error('مشکل در برقراری ارتباط با سرور');
      console.log(err);
      // navigate('/dashboard/delivery');
    }
  };

  const handleCityChange = (cityId, cities) =>
    new Promise((resolve) => {
      const newAreas = cities.filter((c) => c.id === cityId);
      setAreas(newAreas[0].areas);
      setValues({ cityId });
      resolve();
    });

  const sentDataToserver = async (formData) => {
    try {
      const {
        data: { status, message }
      } = await updateDeliveryAddressApi(deliveryId, formData);
      if (status) {
        toast.success(message);
        navigate('/dashboard/delivery');
      } else {
        toast.error(message);
      }
    } catch (err) {
      throw new Error('sentDataToserver has error!');
    }
  };

  return (
    <Page title={`${deliveryId} آدرس فروشگاه`}>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {`${deliveryId} آدرس فروشگاه`}
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/delivery"
            startIcon={<Icon icon={backFill} />}
          >
            برگشت به لیست فروشندگان
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <Container maxWidth="sm">
              <ContentStyle>
                <FormikProvider value={formik}>
                  <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                      <TextField
                        fullWidth
                        autoComplete="name"
                        type="text"
                        label="نام فروشگاه"
                        {...getFieldProps('name')}
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                      />

                      <Select
                        input={<OutlinedInput label="انتخاب شهر" />}
                        labelId="user-label"
                        id="demo-multiple-name"
                        autoComplete="cityId"
                        // {...getFieldProps('cityId')}
                        onChange={(e) => handleCityChange(e.target.value, cities)}
                        value={values.cityId}
                        name="cityId"
                        error={Boolean(touched.cityId && errors.cityId)}
                        helperText={touched.cityId && errors.cityId}
                      >
                        {cities.map((city) => (
                          <MenuItem
                            key={city.id}
                            value={city.id}
                            style={getStyles(city.id, values.cityId, theme)}
                          >
                            {city.title || <Chip label="بدون نام" />}
                          </MenuItem>
                        ))}
                      </Select>

                      <Select
                        input={<OutlinedInput label="انتخاب دسته بندی" />}
                        labelId="category-label"
                        id="demo-multiple-name"
                        {...getFieldProps('areaId')}
                        error={Boolean(touched.areaId && errors.areaId)}
                        helperText={touched.areaId && errors.areaId}
                      >
                        {areas.map((area) => (
                          <MenuItem
                            key={area.id}
                            value={area.id}
                            style={getStyles(area.id, values.areaId, theme)}
                          >
                            {area.title}
                          </MenuItem>
                        ))}
                      </Select>

                      <TextField
                        fullWidth
                        autoComplete="address"
                        type="text"
                        label="آدرس"
                        {...getFieldProps('address')}
                        error={Boolean(touched.address && errors.address)}
                        helperText={touched.address && errors.address}
                      />

                      <LoadingButton
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        loading={isSubmitting}
                      >
                        ویرایش آدرس
                      </LoadingButton>
                    </Stack>
                  </Form>
                </FormikProvider>
              </ContentStyle>
            </Container>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
