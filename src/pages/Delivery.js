import { Icon } from '@iconify/react';
import React, { useEffect } from 'react';
// import { sentenceCase } from 'change-case';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Avatar,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import toast from 'react-hot-toast';
import listFill from '@iconify/icons-eva/list-fill';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { ListHead, ListToolbar, MoreMenu } from '../components/_dashboard/table';
import { getDeliveriesApi, deleteDeliveryApi } from '../apis/Delivery';

import { useTableData } from '../hooks/useTableData';
import YesNoModal from '../components/_dashboard/app/YesNoModal';

//
// import USERLIST from '../_mocks_/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'نام', alignRight: false },
  { id: 'user', label: 'کاربر', alignRight: false },
  { id: 'description', label: 'توضیحات', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

export default function Delivery() {
  const {
    deta: deliveries,
    setDeta: setDeliveries,
    selected,
    filterName,
    handleFilterByName,
    order,
    orderBy,
    handleRequestSort,
    handleSelectAllClick,
    filteredData,
    page,
    rowsPerPage,
    handleRowClick,
    emptyRows,
    isDataNotFound,
    handleChangePage,
    handleChangeRowsPerPage,
    rowsPerPageOptions,
    showDelete,
    handleDeleteModalVisible,
    deleteItemId,
    deleteLoading,
    setDeleteLoading
  } = useTableData();

  useEffect(() => {
    getDeliveriesData();
  }, []);

  const getDeliveriesData = async () => {
    try {
      const { data } = await getDeliveriesApi();
      const {
        status,
        message,
        data: { deliveries }
      } = data;
      if (status) {
        setDeliveries(deliveries);
      } else {
        toast.error(message);
      }
    } catch (err) {
      toast.error('مشکل در برقراری ارتباط با سرور');
    }
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      const {
        data: { status, message }
      } = await deleteDeliveryApi(deleteItemId);
      if (status) {
        toast.success(message);
        setDeliveries((prevDeliveries) => prevDeliveries.filter((d) => d.id !== deleteItemId));
      } else {
        toast.error(message);
      }
      handleDeleteModalVisible();
      setDeleteLoading(false);
    } catch (err) {
      handleDeleteModalVisible();
      setDeleteLoading(false);
      toast.error('خطای سرور');
    }
  };
  return (
    <Page title="فروشندگان">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            فروشندگان
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/delivery/create"
            startIcon={<Icon icon={plusFill} />}
          >
            فروشنده جدید
          </Button>
        </Stack>

        <Card>
          <ListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={deliveries.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        id,
                        name,
                        user: { name: userName, email: userEmail },
                        description,
                        image
                      } = row;
                      const isItemSelected = selected.indexOf(id) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleRowClick(event, id)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={name} src={image} />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">
                            {userName} {userEmail}
                          </TableCell>
                          <TableCell align="left">{description}</TableCell>
                          <TableCell align="right">
                            <MoreMenu
                              editLink={`/dashboard/delivery/${id}`}
                              handleDelete={() => handleDeleteModalVisible(true, id)}
                            >
                              <MenuItem
                                component={RouterLink}
                                to={`/dashboard/delivery/${id}/address`}
                                sx={{ color: 'text.secondary' }}
                              >
                                <ListItemIcon>
                                  <Icon icon={listFill} width={24} height={24} />
                                </ListItemIcon>
                                <ListItemText
                                  primary="آدرس فروشگاه"
                                  primaryTypographyProps={{ variant: 'body2' }}
                                />
                              </MenuItem>
                            </MoreMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isDataNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={deliveries.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <YesNoModal
            open={showDelete}
            onClose={() => handleDeleteModalVisible(false)}
            handleAction={handleDelete}
            message="آیا از حذف این فروشگاه مطمعن هستید"
            actionLoading={deleteLoading}
          />
        </Card>
      </Container>
    </Page>
  );
}
