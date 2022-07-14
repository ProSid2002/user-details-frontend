import {
  Table,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Checkbox,
} from "@mui/material";
import React, { useState } from "react";

const styles = {
  table: {
    my: 3,
    minWidth: "100%",
    display: "block",
    overflowX: "auto",
    "& thead th": {
      fontWeight: "600",
      color: "#ffffff",
      backgroundColor: "primary.main",
    },
    "& tbody td": {
      fontWeight: 400,
    },
    "& tbody tr:hover": {
      backgroundColor: "#f5f5fc",
    },
  },
};

const useTable = (records, headCells, selected, setSelected, selectedTrue) => {
  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();

  const TblContainer = (props) => (
    <Table sx={styles.table}>{props.children}</Table>
  );
  const TblHead = (props) => {
    const handleSortRequest = (cellId) => {
      const isAsc = orderBy === cellId && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(cellId);
    };

    const isTrue = (value) => value.checked === true;

    return (
      <TableHead>
        <TableRow>
          <TableCell>
            <Checkbox
              style={{ color: "#fff" }}
              checked={selected.every(isTrue)}
              indeterminate={
                selectedTrue.length > 0 && selectedTrue.length < records.length
              }
              onChange={(e) =>
                setSelected(
                  selected.map((item) => {
                    item.checked = e.target.checked;
                    return item;
                  })
                )
              }
            />
          </TableCell>
          {headCells.map((item) => (
            <TableCell
              key={item.id}
              sortDirection={orderBy === item.id ? order : false}
            >
              {item.disableSorting ? (
                item.label
              ) : (
                <TableSortLabel
                  active={orderBy === item.id}
                  direction={orderBy === item.id ? order : "asc"}
                  onClick={() => {
                    handleSortRequest(item.id);
                  }}
                >
                  {item.label}
                </TableSortLabel>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const TblPagination = () => (
    <TablePagination
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      component="div"
      count={records.length}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (orderBy !== "id") {
      a = a.item;
      b = b.item;
    }
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const recordsAfterPagingAndSorting = () => {
    const temp = records.map((item, index) => ({ item: item, id: index + 1 }));
    return stableSort(temp, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      (page + 1) * rowsPerPage
    );
  };

  return { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting };
};

export default useTable;
