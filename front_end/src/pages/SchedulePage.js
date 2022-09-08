import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IconButton, TextField } from "@mui/material";
import dayjs from "dayjs";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import FilterConditions from "../components/FilterConditions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Description } from "@mui/icons-material";
import ScheduleTable1 from "../components/ScheduleTable1";
import TransformerTable from "../components/TransformerTable";
import Terminal from "../components/Terminal";

const toastOption = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
  // progress: undefined
};

const tData = [
  {
    name: "Mark1",
    location: "nole",
    priority: "high",
    id: "13232jn23ssda23jn23",
  },
  {
    name: "Mark1",
    location: "nole",
    priority: "high",
    id: "13232jn2323jn23",
  },
  {
    name: "Mark1",
    location: "nole",
    priority: "high",
    id: "13232jn2323jn2ds3",
  },
];

const SchedulePage = () => {
  const [selectedTransformer, setSelectedTransformer] = React.useState([]);

  const [selectedSchedule, setSelectedSchedule] = React.useState([]);

  const [tabChanger, setTabChanger] = useState("s");
  const [basicData, setBasicValue] = useState({
    name: "",
    type: "",
    description: "",
  });
  const [names, setNames] = useState([]);

  const [value, setValue] = React.useState("one");
  const [dateValue, setDateValue] = React.useState(
    dayjs("2014-08-18T21:11:54")
  );

  const [scheduleData, setSceduleData] = useState([
    {
      name: ["betty", "selam"],
      type: "some type",
      date: "12/10/2017",
      description: "some description",
      id: "akmlk",
    },
  ]);
  const [transformerData, setTransformerData] = useState(tData);

  useEffect(() => {}, []);

  const handleBasicDataChange = (e) => {
    setBasicValue({ ...basicData, [e.target.name]: e.target.value });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };
  const deleteName = (id) => {
    const newNames = names.filter((name) => id !== name);
    console.log(newNames, names);
    setNames(newNames);
  };

  const submitScheduleHandler = () => {
    const { name, description, type } = basicData;
    const uniqueName = names.filter((name) => name === basicData.name);
    if (names.length === 0) {
      toast.error("Please provide name", toastOption);
    } else if (!dateValue) {
      toast.error("Please provide valid value", toastOption);
    } else if (!type) {
      toast.error("Please provide valid type", toastOption);
    } else if (!description) {
      toast.error("Please provide valid description", toastOption);
    } else {
      const data = {
        name: names,
        type: type,
        description: description,
        date: dateValue.$D + "/" + dateValue.$m + "/" + dateValue.$y,
      };
      setSceduleData([data, ...scheduleData]);
    }
  };
  console.log("data", scheduleData);
  const handleSelectAllClickTransfomer = (event) => {
    if (event.target.checked) {
      const newSelected = transformerData;
      setSelectedTransformer(newSelected);
      return;
    }
    setSelectedTransformer([]);
  };

  const handleSelectClickTransFormer = (event, row) => {
    console.log(":;;;;;;;");
    if (!event.target.checked) {
      const newSelected = selectedTransformer?.filter((n) => n.id !== row.id);
      setSelectedTransformer([...newSelected]);
      return;
    }
    setSelectedTransformer([...selectedTransformer, row]);
  };
  const handleSelectAllClickSchedule = (event) => {
    if (event.target.checked) {
      const newSelected = scheduleData;
      setSelectedSchedule(newSelected);
      return;
    }
    setSelectedSchedule([]);
  };

  const handleSelectClickSchedule = (event, row) => {
    console.log(":;;;;;;;");
    if (!event.target.checked) {
      const newSelected = selectedSchedule?.filter((n) => n.id !== row.id);
      setSelectedSchedule([...newSelected]);
      return;
    }
    setSelectedSchedule([...selectedSchedule, row]);
  };
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
                  onClick={() => {
                    const uniqueName = names.filter(
                      (name) => name === basicData.name
                    );
                    if (!basicData.name) {
                      toast.error("Name must be provide name", toastOption);
                    } else if (uniqueName.length > 0) {
                      toast.error("Name must be unique", toastOption);
                    } else {
                      setNames([basicData.name, ...names]);
                    }
                  }}
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </div>
            </div>

            <div className=" text-[#006A66]">
              <p className="text-xl mb-2">Type</p>
              <div className="flex justify-between items-center border-[1px] px-2 rounded-lg border-[#006A66] w-[40vw]">
                <input
                  name="type"
                  value={basicData.type}
                  onChange={handleBasicDataChange}
                  className=" rounded py-3 px-4 w-[90%] outline-none  "
                  type={"text"}
                />
              </div>
            </div>
          </div>
          <div className=" w-[90vw] mx-auto ">
            <div className=" w-[40vw]">
              {names.length > 0 &&
                names.map((n, i) => (
                  <div key={i}>
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
                  name="description"
                  value={basicData.description}
                  onChange={handleBasicDataChange}
                  rows="5"
                  cols="33"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="w-[90vw] flex mx-auto m-5 justify-end">
            <button
              onClick={submitScheduleHandler}
              className="bg-[#006A66] mx-2 text-white py-2 px-8 rounded "
            >
              Submit
            </button>
          </div>
        </div>
        <div className="w-[90vw] mx-auto">
          <div>
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
            <div></div>
          </div>
          <div className="table w-[90vw] mx-auto ">
            {tabChanger == "s" ? (
              <ScheduleTable1
                selected={selectedSchedule}
                setSelected={setSelectedSchedule}
                handleSelectClick={handleSelectClickSchedule}
                handleSelectAllClick={handleSelectAllClickSchedule}
                rows={scheduleData}
              />
            ) : (
              <TransformerTable
                selected={selectedTransformer}
                setSelected={setSelectedTransformer}
                handleSelectClick={handleSelectClickTransFormer}
                handleSelectAllClick={handleSelectAllClickTransfomer}
                rows={transformerData}
              />
            )}

            {/* <ScheduleTable
              headers={["No", "Maintenance Personnel", "Type", "Date"]}
              datas={scheduleData}
            /> */}
          </div>
        </div>
      </div>{" "}
      <Terminal />
      <ToastContainer />
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
