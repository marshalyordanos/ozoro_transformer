import { AccountCircle } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Icon from "../components/icons/Icon";
import { useFormik } from "formik";
import * as Yup from "yup";

const LoginPage = ({ setOpen }) => {
  const [size, setSize] = useState(window.innerWidth);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(20, "Must BE  20 Characters or less")
        .required("Required"),
      password: Yup.string()
        .max(20, "Must BE  20 Characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      navigate("/home");
    },
  });

  const navigate = useNavigate();
  useEffect(() => {
    function handleResize() {
      setSize(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
  }, [size]);
  return (
    <LoginPageStyle>
      {size > 800 ? (
        <div className="left_side ">
          <div className="p-5 self-start justify-items-start">
            <Icon fill={"white"} width={80} height={80} />
          </div>
          <div className="p-5 w-[30vw] mt-[7vh] mx-auto">
            <img src="/img/login_side.png" />
          </div>
        </div>
      ) : (
        <div className="login_tablete_bg">
          <img src="/img/login_tablate.png" />
        </div>
      )}
      {size < 800 && (
        <div className=" mx-auto mt-2 mb-4">
          <img src="/img/mobile_logo.png" />
          <p className="text-3xl text-white">Welcome!</p>
        </div>
      )}
      <div className="login_right self-center mx-auto">
        <form
          onSubmit={formik.handleSubmit}
          className={`flex flex-col w-[40vw] border-[1px] border-[#ebebeb] bg-white  px-10 pb-8 pt-8 rounded-lg shadow-[4px_4px_4px_4px_lightgray] mx-auto `}
        >
          <p className="my-5 text-3xl text-[#006a66] mx-auto  ">Login</p>
          <TextField
            placeholder="username"
            color="success"
            fullWidth
            name={"username"}
            error={formik.errors.username && formik.touched.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            sx={{ marginTop: "20px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <p className=" self-start text-red-700 text-ml">
            {" "}
            {formik.touched.username &&
              formik.errors.username &&
              formik.errors.username}
          </p>
          <TextField
            type="password"
            placeholder="password"
            color="success"
            fullWidth
            name="password"
            sx={{ marginTop: "20px" }}
            onChange={formik.handleChange}
            error={formik.errors.password && formik.touched.password}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <p className=" self-start text-red-700 text-ml">
            {" "}
            {formik.touched.password &&
              formik.errors.password &&
              formik.errors.password}
          </p>
          <Link
            className="my-5 hover:underline text-lg text-[#006a66] hover:text-sky-600 "
            to="#forgotpassword"
          >
            Forgot Password?
          </Link>
          <button
            type="submit"
            // onClick={() => navigate("/home")}
            className="bg-[#006A66] max-w-[200px] text-white py-3 px-10 mx-auto rounded "
          >
            Login
          </button>
          <p
            className="my-5 hover:underline text-lg text-[#006a66] mx-auto hover:text-sky-600 "
            onClick={() => setOpen(true)}
          >
            Not registered yet?
          </p>
        </form>
      </div>
    </LoginPageStyle>
  );
};

const LoginPageStyle = styled.div`
  display: flex;

  .left_side {
    height: 100vh;
    width: 50vw;
    background-color: #006a66;
    img {
      width: 100%;
    }
  }
  .login_right {
    padding: 10px;
  }
  .login_tablete_bg {
    img {
      position: absolute;
      z-index: -10;
      height: 100vh;
      width: 100vw;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
  @media screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: -20px;
    justify-content: center;
    /* align-items: center; */
    height: 100vh;
    form {
      box-shadow: 4px 4px 4px 4px #004a48;
      width: 80vw;
      align-items: center;
      justify-content: center;
      /* padding-bottom: 0px; */
      height: 60vh;
      min-height: 400px;
    }
  }
`;

export default LoginPage;
