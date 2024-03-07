import { React, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CreateUserModal from "../createmodal";
import { GoEye } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "axios";
import EditUserModal from "../editModal";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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

  {
    label: "Action",
    name: "action",
  },
];

export default function CustomizedTables() {
  const [tabledata, setTabledata] = useState([]);
  const [openmodal, setOpenModal] = useState(false);
  const [selectdata, setSelectdata] = useState([]);
  useEffect(() => {
    axios
      .get("https://crudcrud.com/api/b1214a26aed141f4bc6180cd6e9a8314/users/")
      .then((res) => {
        console.log(res?.data, "hello");
        setTabledata(res?.data);
      });
  }, []);
  return (
    <>
      <CreateUserModal />
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              {column.map((columnn, i) => (
                <StyledTableCell>{columnn.label}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>

          {tabledata == "" ||
          tabledata == undefined ||
          tabledata == null ||
          tabledata?.length === 0 ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={column?.length}>
                  There are no records to display
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {tabledata?.map((data, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell>{data.name}</StyledTableCell>
                  <StyledTableCell>{data.mobileno}</StyledTableCell>
                  <StyledTableCell>{data.designation}</StyledTableCell>
                  <StyledTableCell>{data.email}</StyledTableCell>
                  <StyledTableCell>{data.age}</StyledTableCell>
                  <StyledTableCell
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "50%",
                    }}
                  >
                    <FaRegEdit
                      onClick={(e) => {
                        setSelectdata(data);
                        console.log(e, "dattaaa");
                        setOpenModal(true);
                      }}
                    />
                    <RiDeleteBinLine />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      <EditUserModal
        // formik={formik}
        data={selectdata}
        openmodal={openmodal}
        setOpenModal={setOpenModal}
      />
    </>
  );
}
