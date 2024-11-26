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
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

interface Column {
  id: "id" | "name" | "email" | "phone" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: readonly Column[] = [
  { id: "id", label: "Id", minWidth: 100 },
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
  id:number,
  userID: number;
  fullName: string;
  email: string;
  phone: string;
}

export default function ShowAllUsers() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState<Admin[]>([]);
  const [totalItems, setTotalItems] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [recordToDelete, setRecordToDelete] = React.useState<number | null>(
    null
  );
  const [deletedRecords, setDeletedRecords] = React.useState<Set<number>>(
    new Set()
  );
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

  const fetchAdministrators = async (
    currentPage: number,
    rowsPerPage: number
  ) => {
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
      //
      console.log("API Response:", response.data);

      const { items, totalItems } = response.data;

      const filteredItems = items.filter(
        (admin: Admin) => !deletedRecords.has(admin.userID)
      );
   

  
      setRows(filteredItems);
      setTotalItems(totalItems - deletedRecords.size);
    } catch (error) {
      console.log("Error fetching administrators:", error);
    }
  };

  const handleDelete = () => {
    if (recordToDelete !== null) {
      setDeletedRecords((prev) => new Set(prev.add(recordToDelete)));
      setRows((prevRows) =>
        prevRows.filter((row) => row.userID !== recordToDelete)
      );
      setTotalItems((prevTotal) => prevTotal - 1);
    }
    setOpenDialog(false);
  };

  const handleCancel = () => {
    setOpenDialog(false);
  };

  const handleDialogOpen = (userID: number) => {
    setRecordToDelete(userID);
    setOpenDialog(true);
  };

  const viewDetails = (row: Admin) => {
    navigate(`/admin/${row.id}`, { state: {row,id:row.id} });
  };

  React.useEffect(() => {
    if (location.pathname === "/admin/administrators") {
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
            {rows.map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.userID}>
                <TableCell>{row.userID}</TableCell>
                <TableCell
                  onClick={() => viewDetails(row)}
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  {row.fullName}
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
