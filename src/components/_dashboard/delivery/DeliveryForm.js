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
  getDeliveryApi,
  updateDeliveryApi,
  createDeliveryApi,
  getFormDataApi
} from '../../../apis/Delivery';

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
export default function DeliveryForm({ mode }) {
  const theme = useTheme();
  const { id: deliveryId } = useParams();
  const navigate = useNavigate();
  const [delivery, setDelivery] = useState(null);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (mode === 'edit') getDeliveryData();
    getFormData();
  }, []);

  const formSchema = Yup.object().shape({
    userId: Yup.number().required('کاربر را انتخاب کنید'),
    categoryId: Yup.number().required('دسته فروشگاه را انتخاب کنید'),
    name: Yup.string().required('نام فروشگاه را وارد کنید'),
    deliveryTime: Yup.string().required('مدت زمان تحوبل سفارش الزامی است'),
    description: Yup.string()
  });
  const formik = useFormik({
    initialValues: {
      userId: '',
      categoryId: '',
      name: '',
      deliveryTime: '',
      description: ''
    },
    validationSchema: formSchema,
    onSubmit: (data) => sentDataToserver(data)
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, setValues } = formik;

  const getDeliveryData = async () => {
    try {
      const {
        data: {
          status,
          message,
          data: { delivery }
        }
      } = await getDeliveryApi(deliveryId);

      if (status) {
        setDelivery(delivery);
        const { name, description, deliveryTime, categoryId, userId } = delivery;
        setValues({ name, description, deliveryTime, categoryId, userId });
      } else {
        toast.error(message);
        navigate('/dashboard/delivery');
      }
    } catch (err) {
      toast.error('مشکل در برقراری ارتباط با سرور');
      navigate('/dashboard/delivery');
    }
  };

  const getFormData = async () => {
    try {
      const {
        data: {
          status,
          message,
          data: { users, categories }
        }
      } = await getFormDataApi();

      if (status) {
        setUsers(users);
        setCategories(categories);
      } else {
        toast.error(message);
        navigate('/dashboard/delivery');
      }
    } catch (err) {
      toast.error('مشکل در برقراری ارتباط با سرور');
      navigate('/dashboard/delivery');
    }
  };

  const sentDataToserver = async (formData) => {
    try {
      const {
        data: { status, message }
      } =
        mode === 'edit'
          ? await updateDeliveryApi(delivery.id, formData)
          : await createDeliveryApi(formData);
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
    <Page title={mode === 'edit' ? 'ویرایش فروشنده' : 'ایجاد فروشنده جدید'}>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {mode === 'edit' ? 'ویرایش فروشنده' : 'ایجاد فروشنده جدید'}
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
                        input={<OutlinedInput label="انتخاب کاربر" />}
                        labelId="user-label"
                        id="demo-multiple-name"
                        {...getFieldProps('userId')}
                        error={Boolean(touched.userId && errors.userId)}
                        helperText={touched.userId && errors.userId}
                      >
                        {users.map((user) => (
                          <MenuItem
                            key={user.id}
                            value={user.id}
                            style={getStyles(user.id, values.userId, theme)}
                          >
                            {user.name || <Chip label="بدون نام" />} |{' '}
                            {user.email || <Chip label="بدون ایمیل" />} |{' '}
                            {user.mobile || <Chip label="بدون موبایل" />}
                          </MenuItem>
                        ))}
                      </Select>

                      <Select
                        input={<OutlinedInput label="انتخاب دسته بندی" />}
                        labelId="category-label"
                        id="demo-multiple-name"
                        {...getFieldProps('categoryId')}
                        error={Boolean(touched.categoryId && errors.categoryId)}
                        helperText={touched.categoryId && errors.categoryId}
                      >
                        {categories.map((category) => (
                          <MenuItem
                            key={category.id}
                            value={category.id}
                            style={getStyles(category.id, values.categoryId, theme)}
                          >
                            {category.title}
                          </MenuItem>
                        ))}
                      </Select>

                      <TextField
                        fullWidth
                        autoComplete="description"
                        type="text"
                        label="توضیحات فروشگاه"
                        {...getFieldProps('description')}
                        error={Boolean(touched.description && errors.description)}
                        helperText={touched.description && errors.description}
                      />

                      <TextField
                        fullWidth
                        autoComplete="deliveryTime"
                        type="text"
                        label="زمان تحویل سفارش"
                        {...getFieldProps('deliveryTime')}
                        error={Boolean(touched.deliveryTime && errors.deliveryTime)}
                        helperText={touched.deliveryTime && errors.deliveryTime}
                      />

                      <LoadingButton
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        loading={isSubmitting}
                      >
                        {mode === 'edit' ? 'ویرایش فروشنده' : 'ایجاد فروشنده جدید'}
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
