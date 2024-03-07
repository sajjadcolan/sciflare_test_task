import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import axios from "axios";

export default function EditUserModal({ openmodal, setOpenModal, data, i }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    border: "none",
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpenModal(false);
  console.log(data, "propscheck");
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: data?.name ?? "",
      designation: data?.designation ?? "",
      email: data?.email ?? "",
      mobileno: data?.mobileno ?? "",
      age: data?.age ?? "",
      location: data?.location ?? "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("selectDate is required"),
      mobileno: Yup.number().required("mobileno is required"),
      designation: Yup.string().required("designation is required"),
      email: Yup.string().required("email is required"),
      age: Yup.number().required("age is required"),
      location: Yup.string().required("location is required"),
    }),
    onSubmit: (val) => {
      handleClose();
      const body = {
        name: val?.name,
        mobileno: val?.mobileno,
        designation: val?.designation,
        email: val?.email,
        age: val?.age,
        location: val?.location,
      };
      const path = `https://crudcrud.com/api/b1214a26aed141f4bc6180cd6e9a8314/users${
        data?._id && `/${data?._id}`
      }`;

      axios
        .put(path, body, {
          headers: {
            "Content-Type": "application/json",
            charset: "utf-8",
            Accept: "*/*",
            "Cache-Control": "no-cache",
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });

      formik.resetForm();
    },
  });
  console.log(formik.values, data?.data?.name, "value check");
  return (
    <div>
      <Modal
        open={openmodal}
        onClose={setOpenModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter User Details
          </Typography>
          <div className="modal-fields-wrapper">
            <div className="modal-input">
              <TextField
                // formik={formik}
                id="name"
                label="Name"
                name="name"
                helperText={formik.touched.name ? formik.errors.name : null}
                error={formik.touched.name ? formik.errors.name : null}
                value={formik?.values?.name}
                onChange={formik.handleChange}
              />
            </div>
            <div className="modal-input">
              <TextField
                formik={formik}
                id="designation"
                label="Designation"
                name="designation"
                helperText={
                  formik.touched.designation ? formik.errors.designation : null
                }
                error={
                  formik.touched.designation ? formik.errors.designation : null
                }
                value={formik.values.designation}
                onChange={formik.handleChange}
              />
            </div>
            <div className="modal-input">
              <TextField
                formik={formik}
                id="email"
                label="Email"
                helperText={formik.touched.email ? formik.errors.email : null}
                error={formik.touched.email ? formik.errors.email : null}
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </div>
            <div className="modal-input">
              <TextField
                formik={formik}
                id="mobileno"
                label="Mobile No"
                helperText={
                  formik.touched.mobileno ? formik.errors.mobileno : null
                }
                error={formik.touched.mobileno ? formik.errors.mobileno : null}
                value={formik.values.mobileno}
                onChange={formik.handleChange}
              />
            </div>
            <div className="modal-input">
              <TextField
                formik={formik}
                id="age"
                label="Age"
                helperText={formik.touched.age ? formik.errors.age : null}
                error={formik.touched.age ? formik.errors.age : null}
                value={formik.values.age}
                onChange={formik.handleChange}
              />
            </div>
            <div className="modal-input">
              <TextField
                formik={formik}
                id="location"
                label="Location"
                helperText={
                  formik.touched.location ? formik.errors.location : null
                }
                error={formik.touched.location ? formik.errors.location : null}
                value={formik.values.location}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className="modal-btn-wrapper">
            <Button
              variant="contained"
              style={{ padding: "10px 35px" }}
              onClick={formik.handleSubmit}
              type="submit"
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              style={{ padding: "5px 35px" }}
              onClick={() => handleClose()}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
