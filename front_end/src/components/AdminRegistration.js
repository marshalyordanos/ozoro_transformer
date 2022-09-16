import { TextField } from "@mui/material";
import React from "react";
import styled from "styled-components";
import ModalUi from "./ui/ModalUi";
import { useFormik } from "formik";
import * as Yup from "yup";

const AdminRegistration = ({ open, setOpen }) => {
  const [size, setSize] = React.useState(window.innerWidth);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      username: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Required"),
      lastname: Yup.string().required("Required"),
      email: Yup.string().email().required("Required"),
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log("admin", values);
    },
  });
  console.log(formik.errors);
  console.log(formik.touched);

  React.useEffect(() => {
    function handleResize() {
      setSize(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
  }, [size]);

  return (
    <div>
      <ModalUi
        setOpen={setOpen}
        width={size > 900 ? "40vw" : size > 600 ? "60vw" : "90vw"}
        open={open}
      >
        <AdminRegistrationStyle>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col justify-center"
          >
            <p className="text-2xl font-bold text-[#006A66]"> Sign Up</p>
            <div className="input_div">
              <div>
                <TextField
                  color="success"
                  error={formik.errors.firstname && formik.touched.firstname}
                  onBlur={formik.handleBlur}
                  name="firstname"
                  onChange={formik.handleChange}
                  value={formik.values.firstname}
                  sx={{ marginTop: "20px" }}
                  label="Frist name"
                  variant="outlined"
                  size="small"
                />
              </div>
              <div>
                <TextField
                  color="success"
                  error={formik.errors.lastname && formik.touched.lastname}
                  onBlur={formik.handleBlur}
                  name="lastname"
                  onChange={formik.handleChange}
                  value={formik.values.lastname}
                  sx={{ marginTop: "20px" }}
                  label="Last name"
                  variant="outlined"
                  size="small"
                />
              </div>
            </div>
            <div className="input_div ">
              <div>
                <TextField
                  color="success"
                  error={formik.errors.username && formik.touched.username}
                  onBlur={formik.handleBlur}
                  name="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  sx={{ marginTop: "20px" }}
                  label="Username"
                  variant="outlined"
                  size="small"
                />
              </div>
              <div>
                <TextField
                  color="success"
                  error={formik.errors.email && formik.touched.email}
                  onBlur={formik.handleBlur}
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  sx={{ marginTop: "20px" }}
                  type={"email"}
                  label="email"
                  variant="outlined"
                  size="small"
                />
              </div>
            </div>
            <div className="input_div">
              <div>
                <TextField
                  color="success"
                  error={formik.errors.password && formik.touched.password}
                  onBlur={formik.handleBlur}
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  size="small"
                  sx={{ marginTop: "20px" }}
                  label="Password"
                  variant="outlined"
                />
                <p className=" ml-3 self-start text-red-700 text-ml">
                  {" "}
                  {formik.touched.password &&
                    formik.errors.password &&
                    formik.errors.password}
                </p>
              </div>
              <div>
                <TextField
                  color="success"
                  error={
                    formik.errors.confirmPassword &&
                    formik.touched.confirmPassword
                  }
                  onBlur={formik.handleBlur}
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  size="small"
                  sx={{ marginTop: "20px" }}
                  type={"password"}
                  label="Confirm Password"
                  variant="outlined"
                />
                <p className=" ml-3 self-start text-red-700 text-ml">
                  {" "}
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword &&
                    formik.errors.confirmPassword}
                </p>
              </div>
            </div>
            <button
              type="submit"
              className="bg-[#006A66] mt-[20px] mx-2 text-white py-2 px-8 rounded "
            >
              Sign Up
            </button>
          </form>
        </AdminRegistrationStyle>
      </ModalUi>
    </div>
  );
};

const AdminRegistrationStyle = styled.div`
  /* border: 4px solid red; */
  .input_div {
    z-index: 10;
    display: flex;
    justify-content: space-between;
    /* border: 4px solid red; */
    div {
      margin-left: 5px;
    }
  }

  @media screen and (max-width: 600px) {
    input {
      /* height: 200px; */
      /* margin-left: 5px; */
    }
  }
`;

export default AdminRegistration;
