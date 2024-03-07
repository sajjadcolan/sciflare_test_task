import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Checkbox, TablePagination } from "@mui/material";
import { Fragment } from "react";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import "./homeStyles.css";
import { useLocation, useNavigate } from "react-router";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import CreateUserModal from "../createmodal";

function CustomizedTables({
  rows = [],
  columns,
  onDelete,
  handleChange,
  paginationStatus,
  dataLoading = false,
  subscriptionData,
  //   navigatepath = "",
  ...props
}) {
  const [size, setSize] = useState(0);
  const [page, setPage] = useState(5);
  const paginationRowsOptions = [5, 10, 20, 50, 100];

  //   const navigate = useNavigate();
  //   const location = useLocation();
  //   const pathname = location.pathname.split("/")[2];

  const startIndex = size * page + 1;
  const endIndex = Math.min((size + 1) * page, rows?.length);
  const totalEntries = rows?.length;

  const handlePerRowsChange = async (event) => {
    setPage(+event.target.value);
    setSize(0);
  };

  const handlePageChange = async (event, newPage) => {
    setSize(newPage);
  };
  const row = [
    {
      type: "date",
      id: "date",
      name: "Date of Interaction ",
      important: true,
      label: "Date of Interaction ",
    },
  ];

  const column = [
    {
      label: "Date of Interaction",
      name: "dateOfInteraction",
      //   selector: (row) => moment(row?.dateOfInteraction).format("YYYY-MM-DD"),
    },
    {
      label: "Client Name",
      name: "clientName",
      selector: (row) => row?.personDetails[0]?.fullname,
    },
    {
      label: "Feedback",
      name: "feedback",
      selector: (row) => row.feedBackType,
    },
    {
      label: "Final Status",
      name: "finalstatus",
      selector: (row) => row.finalStatusType,
    },
    {
      label: "Attempts",
      name: "totalattempt",
      selector: (row) => row.attempts,
    },
    // {
    //   label: "Action",
    //   name: "action",
    //   selector: (row) => (
    //     <div
    //       style={{
    //         display: "flex",
    //         alignItems: "center",
    //         // justifyContent: "center",
    //         gap: "10px",
    //         cursor: "pointer",
    //       }}
    //     >
    //       <IoIosInformationCircleOutline />
    //       <GoEye onClick={() => openModal(row)} />
    //       <FaRegEdit />
    //       <RiDeleteBinLine />
    //     </div>
    //   ),
    // },
  ];
  return (
    <>
      <div>
        <h1>Employee Data Table</h1>
        <CreateUserModal />
      </div>

      <Paper elevation={0}>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <div>
                  {column.map((columnn, i) => (
                    <TableCell>{columnn.label}</TableCell>
                  ))}
                </div>
              </TableRow>
            </TableHead>
            {/* {/ ## table has empty data ## /} */}
            {row == "" ||
            row == undefined ||
            row == null ||
            row?.length === 0 ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={column?.length}>
                    There are no records to display
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {row?.map((data, i) => (
                  <TableRow key={i}>
                    <TableCell>{data.name}</TableCell>;
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
        {paginationStatus && (
          <div
            className="pagination-info"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p style={{ paddingTop: "10px", fontSize: "14px" }}>
              Showing {startIndex} to {endIndex} of {totalEntries} entries
            </p>
            <TablePagination
              rowsPerPageOptions={paginationRowsOptions}
              component="div"
              count={rows?.length || 0}
              rowsPerPage={page}
              page={size}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handlePerRowsChange}
              className="pagination-text"
            />
          </div>
        )}
      </Paper>
    </>
  );
}

export default CustomizedTables;
