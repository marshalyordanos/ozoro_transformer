import React, { useState } from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ScheduleTable from "../components/ScheduleTable";
import { IconButton, TextField } from "@mui/material";
import dayjs from "dayjs";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import FilterConditions from "../components/FilterConditions";

const SchedulePage = () => {
  const [tabChanger, setTabChanger] = useState("s");
  const [basicData, setBasicValue] = useState({
    name: "",
  });
  const [names, setNames] = useState([]);

  const [value, setValue] = React.useState("one");
  const [dateValue, setDateValue] = React.useState(
    dayjs("2014-08-18T21:11:54")
  );
  const handleBasicDataChange = (e) => {
    setBasicValue({ ...basicData, [e.target.name]: e.target.value });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleDateChange = (newValue) => {
    setValue(newValue);
  };
  const deleteName = (id) => {
    const newNames = names.filter((name) => id !== name);
    console.log(newNames, names);
    setNames(newNames);
  };
  console.log(names);
  return (
    <SchedulePageStyle>
      <NavBar type={"view"} />
      <div className="">
        <div className="">
          <div className="flex mt-[5vh] w-[90vw] mx-auto justify-between">
            <div className="  text-[#006A66]">
              <p className=" text-xl mb-2">Maintenance Personnel</p>
              <div className="flex justify-between items-center border-[1px] px-2 rounded-lg border-[#006A66] w-[40vw]">
                <input
                  name="name"
                  value={basicData.name}
                  onChange={handleBasicDataChange}
                  className=" rounded py-3 px-4 w-[90%] outline-none  "
                  type={"text"}
                />
                <IconButton
                  onClick={() => setNames([basicData.name, ...names])}
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </div>
            </div>

            <div className=" text-[#006A66]">
              <p className="text-xl mb-2">Type</p>
              <div className="flex justify-between items-center border-[1px] px-2 rounded-lg border-[#006A66] w-[40vw]">
                <input
                  className=" rounded py-3 px-4 w-[90%] outline-none  "
                  type={"text"}
                />

                <AddCircleOutlineIcon />
              </div>
            </div>
          </div>
          <div className=" w-[90vw] mx-auto ">
            <div className=" w-[40vw]">
              {names.length > 0 &&
                names.map((n) => (
                  <div>
                    <FilterConditions
                      closFilterCondition={deleteName}
                      name={n}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="flex my-[3vh] w-[90vw] mx-auto justify-between">
            <div className=" text-xl text-[#006A66]">
              <p className=" mb-2">Date</p>
              <div className=" ">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    className="date w-[40vw] border-[1px solid red] "
                    inputFormat="MM/DD/YYYY"
                    value={dateValue}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
            </div>
            <div className=" text-xl text-[#006A66]">
              <p className=" mb-2">Description</p>
              <div className=" border-[1px] px-1 rounded-lg border-[#006A66] w-[40vw]">
                <textarea
                  className=" rounded-lg py-2 px-4 w-[100%] outline-none  "
                  id="story"
                  name="story"
                  rows="5"
                  cols="33"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="w-[90vw] flex mx-auto m-5 justify-end">
            <button className="bg-[#006A66] mx-2 text-white py-2 px-8 rounded ">
              Temporary Submit
            </button>
          </div>
        </div>
        <div className="w-[90vw] mx-auto">
          <div className="tab flex">
            <p
              onClick={() => setTabChanger("s")}
              className={`${
                tabChanger === "s" && "active"
              } text-lg cursor-pointer py-1 px-4 hover:text-white hover:bg-[#79a4a2]`}
            >
              Schedule
            </p>
            <p
              onClick={() => setTabChanger("t")}
              className={`${
                tabChanger === "t" && "active"
              } text-lg cursor-pointer py-1 px-4 hover:text-white hover:bg-[#79a4a2]`}
            >
              Transformer
            </p>
          </div>
          <div className="table w-[90vw] mx-auto ">
            <ScheduleTable />
          </div>
        </div>
      </div>
    </SchedulePageStyle>
  );
};

const SchedulePageStyle = styled.div`
  .active {
    background-color: #006a66;
    color: white;
  }

  .date {
    border: none;
  }
`;

export default SchedulePage;
