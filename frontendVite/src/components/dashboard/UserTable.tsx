/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersFetch } from "./../../redux/state/userState"; // Import your action creator
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import EditIcon from "@mui/icons-material/Edit";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { RootState } from "../../redux/store/store";
import { LockOutlinedIcon } from '@mui/icons-material/LockOutlined';

interface User {
  emp_id: number;
  username: string;
  fname: string;
  lname: string;
  position_sh_name: string;
  email: string;
  section_name: string;
  dept_name: string;
  reg_date: Date;
}

function createUser(
  emp_id: number,
  username: string,
  fname: string,
  lname: string,
  position_sh_name: string,
  email: string,
  section_name: string,
  dept_name: string,
  reg_date: Date,
):User{
  return{
    emp_id,
    username,
   fname,
    lname,
    position_sh_name,
    email,
    section_name,
    dept_name,
    reg_date
  }
 
}



function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof User;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "username",
    numeric: false,
    disablePadding: true,
    label: "username",
  },
  {
    id: "fname",
    numeric: true,
    disablePadding: false,
    label: "First Name",
  },
  {
    id: "lname",
    numeric: true,
    disablePadding: false,
    label: "Last Name",
  },
  {
    id: "position_sh_name",
    numeric: true,
    disablePadding: false,
    label: "Position",
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "E-Mail",
  },
  {
    id: "section_name",
    numeric: true,
    disablePadding: false,
    label: "Section",
  },
  {
    id: "reg_date",
    numeric: true,
    disablePadding: false,
    label: "Created",
  },
  
  {
    id: "dept_name",
    numeric: true,
    disablePadding: false,
    label: "Department",
  },
  
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof User
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  onRequestFilter: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    onRequestFilter,
  } = props;
  const createSortHandler =
    (property: keyof User) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow style={{ backgroundColor: "#25476A" }}>
        <TableCell
          padding="checkbox"
          style={{ color: "#ffffff" }} // Change text color to white
        >
          <Checkbox
            style={{ color: "#ffffff" }}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ color: "#ffffff" }} // Change text color to white
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="right" style={{ color: "#ffffff" }}>
          Actions
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export default function UserTable() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("calories");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filter, setFilter] = React.useState("");
  const [editableRowId, setEditableRowId] = React.useState<number | null>(null);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof User
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = userData.map((user) => user.emp_id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

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

  const handleDoubleClick = (event: React.MouseEvent<unknown>, id: number) => {
    setEditableRowId(id);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const handleRequestFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.toLowerCase();
    const filteredData = userData.filter((user: User) =>
      user.username.toLowerCase().includes(inputValue) ||
      user.fname.toLowerCase().includes(inputValue) ||
      user.lname.toLowerCase().includes(inputValue) ||
      user.position_sh_name.toLowerCase().includes(inputValue) ||
      user.email.toLowerCase().includes(inputValue) ||
      user.section_name.toLowerCase().includes(inputValue) ||
      user.dept_name.toLowerCase().includes(inputValue) ||
      user.reg_date.toLowerCase().includes(inputValue)
    );
    setFilter(inputValue);
    setPage(0); // Reset to the first page when filtering
  };

  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.userReducer.users);

  useEffect(() => {
    dispatch(getUsersFetch());
  }, [dispatch]);

  const filteredRows = filter
    ? userData.filter((user: User) =>
        user.username.toLowerCase().includes(filter.toLowerCase())
      )
    : userData;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(filteredRows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, filteredRows]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, marginTop: 8 }} elevation={10}>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}
        >
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Users
          </Typography>
          <InputBase
             sx={{ borderBottom: 1 }}
            placeholder="Search…"
            onChange={handleRequestFilter}
            inputProps={{ "aria-label": "search" }}
          />
        </Toolbar>

        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={filteredRows.length}
              onRequestFilter={handleRequestFilter}
            />
            <TableBody>
              {visibleRows.map((user: User) => (
                <TableRow
                  key={user.emp_id}
                  hover
                  onDoubleClick={(event) =>
                    handleDoubleClick(event, user.emp_id)
                  }
                  role="checkbox"
                  aria-checked={isSelected(user.emp_id)}
                  tabIndex={-1}
                  selected={isSelected(user.emp_id)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      onClick={(event) => handleClick(event, user.emp_id)}
                      checked={isSelected(user.emp_id)}
                      inputProps={{
                        "aria-labelledby": `enhanced-table-checkbox-${user.emp_id}`,
                      }}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row" padding="none">
                    {user.username}
                  </TableCell>
                  <TableCell align="right">{user.fname}</TableCell>
                  <TableCell align="right">{user.lname}</TableCell>
                  <TableCell align="right">{user.position_sh_name}</TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell align="right">{user.section_name}</TableCell>
                  <TableCell align="right">{user.reg_date}</TableCell>
                  <TableCell align="right">{user.dept_name}</TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
