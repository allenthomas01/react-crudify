import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useLocation } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import axios from "axios";

interface Column {
  id: "index" | "name" | "email" | "phone" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: readonly Column[] = [
  { id: "index", label: "Index", minWidth: 100 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 100 },
  {
    id: "phone",
    label: "Phone",
    minWidth: 170,
    align: "right",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "right",
  },
];

interface Admin {
  id: number;
  userID: number;
  name: string;
  email: string;
  phone: string;
}

export default function ShowAllUsers() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState<Admin[]>([]);
  const [totalItems, setTotalItems] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    fetchAdministrators(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRowsPerPage = +event.target.value;
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    fetchAdministrators(0, newRowsPerPage);
  };

  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    const skip = currentPage * rowsPerPage;
    const take = rowsPerPage;

    const API_URL = import.meta.env.VITE_API_URL;
    const TOKEN = import.meta.env.VITE_TOKEN;

    try {
      const response = await axios({
        method: "get",
        url: API_URL,
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
        params: {
          skip,
          take,
          sortBy: "id",
          sortOrder: "ASC",
        },
      });

      const { items, totalItems } = response.data;
      console.log(response);
      const filteredItems = items
        .map((item: any) => ({
          id: item.id,
          userID: item["admin.userID"],
          name: item["admin.name"],
          email: item.email,
          phone: item.phone,
        }));

      setRows(filteredItems);
      
    } catch (error) {
      console.error("Error fetching administrators:", error);
    }
  };

  const fetchAdministrators = (currentPage: number, rowsPerPage: number) => {
    fetchData(currentPage, rowsPerPage);
  };

  const handleDialogOpen = (userID: number) => {
    
    setOpenDialog(true);
  };

  const handleDelete = () => {
    
    setOpenDialog(false);
  };

  const handleCancel = () => {
    setOpenDialog(false);
  };

  const viewDetails = (row: Admin) => {
    navigate(`/user/${row.id}`, { state: { row, id: row.id } });
  };

  React.useEffect(() => {
    if (location.pathname === "/user") {
      fetchAdministrators(page, rowsPerPage);
    }
  }, [location.pathname, page, rowsPerPage]);

  return (
    <Paper sx={{ width: "100vw", overflow: "hidden", padding: 0 }}>
      <TableContainer sx={{ width: "100%", height: "100%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row, index) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>

                <TableCell
                  onClick={() => viewDetails(row)}
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  {row.name}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() => handleDialogOpen(row.userID)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={totalItems}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={openDialog} onClose={handleCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this record?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
