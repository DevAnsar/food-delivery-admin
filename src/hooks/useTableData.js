import { useState } from 'react';
import { getComparator, applySortFilter } from '../utils/tableFn';

const rowsPerPageOptions = [5, 10, 25];

function useTableData(initData) {
  const [deta, setDeta] = useState(initData || []);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('id');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = deta.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleRowClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - deta.length) : 0;

  const filteredData = applySortFilter(deta, getComparator(order, orderBy), filterName);

  const isDataNotFound = filteredData.length === 0;

  const handleDeleteModalVisible = (status = false, itemId = null) => {
    if (status) {
      setShowDelete(true);
      setDeleteItemId(itemId);
    } else {
      setShowDelete(false);
      setDeleteItemId(null);
    }
  };
  return {
    deta,
    setDeta,
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
  };
}
export { useTableData };
