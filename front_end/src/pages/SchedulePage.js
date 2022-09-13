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
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { data } from "autoprefixer";

/***************************** toast options *********************************************** */
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

/************************************ dummy data for transformaer ********************* */
// const tData =;

const SchedulePage = ({ handleUserOpen }) => {
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
    {
      name: ["wwww", "selam"],
      type: "wwwwwwwww",
      date: "12/10/2017",
      description: "some description",
      id: "akmwwlk",
    },
  ]);
  const [transformerData, setTransformerData] = useState([
    {
      name: "Mark1",
      location: "nole",
      status: "Scheduled",
      priority: "high",
      id: "13232jn23ssda23jn23",
    },
    {
      name: "new Transformer",
      location: "nole",
      status: "non scheduled",
      priority: "high",
      id: "13232jn23sjnkjsda23jn23",
    },
    {
      name: "transformer 4",
      location: "nole",
      status: "Scheduled",
      priority: "high",
      id: "13232jn23qq23sjnkjsda23jn23",
    },
    {
      name: "trenasformer 3",
      location: "nole",
      status: "Scheduled",
      priority: "high",
      id: "13232jn3223sjnkjsda23jn23",
    },
    {
      name: "Mark1",
      location: "nole",
      status: "scheduled",
      priority: "high",
      id: "13232jn2323jn2ds3",
    },
  ]);
  const [transformerSearch, setTransformerSearch] = useState("");
  const [scheduleSearch, setScheduleSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchingTrans, setIsSearchingTrans] = useState(false);

  const [scheduleSearchedData, setScheduleSearchedData] = useState([]);
  const [transformerSearchedData, setTransformerSearchedData] = useState([]);

  /****************************************** search transdormer and schedule */

  const scheduleSearchHandler = (event) => {
    const search = event.target.value.trim().toLowerCase();
    const regx = new RegExp(search, "g");
    let newData;

    if (search === "") {
      setIsSearching(false);
      newData = [...scheduleData];
    } else {
      setIsSearching(true);
      newData = scheduleData.filter((row) => regx.test(row.type.toLowerCase()));
    }
    setScheduleSearchedData(newData);
  };
  const transformerSearchHandler = (event) => {
    const search = event.target.value.trim().toLowerCase();
    const regx = new RegExp(search, "g");
    let newData;

    if (search === "") {
      setIsSearchingTrans(false);
      newData = [...transformerData];
    } else {
      setIsSearchingTrans(true);
      newData = transformerData.filter((row) =>
        regx.test(row.name.toLowerCase())
      );
    }
    setTransformerSearchedData(newData);
  };

  /***********************************************  delete functoin for the schedule *********************** */
  const handleScheduleDelete = () => {
    if (selectedSchedule.length > 0) {
      let datas = scheduleData;
      selectedSchedule.forEach((v) => {
        datas = datas.filter((data) => data.id !== v.id);
      });
      // console.log("delete", datas, selectedSchedule);
      setSceduleData(datas);
    } else {
      toast.error("first Select  ", toastOption);
    }
    // setSceduleData();
  };
  const handleTransformerDelete = () => {
    if (selectedTransformer.length > 0) {
      let datas = transformerData;
      selectedTransformer.forEach((v) => {
        datas = datas.filter((data) => data.id !== v.id);
      });
      setTransformerData(datas);
    } else {
      toast.error("first Select  ", toastOption);
    }
    // setSceduleData();
  };

  /********************************************** handle besic data {name, type,description } **************** */
  const handleBasicDataChange = (e) => {
    setBasicValue({ ...basicData, [e.target.name]: e.target.value });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  /********************************************** handle date change **************** */
  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };

  /********************************************** delete name **************** */

  const deleteName = (id) => {
    const newNames = names.filter((name) => id !== name);
    // console.log(newNames, names);
    setNames(newNames);
  };

  /********************************************** submit function  **************** */

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
    } else if (selectedTransformer.length === 0) {
      toast.error("Please selecet Transformer first", toastOption);
      setTabChanger("t");
      window.scrollTo({ top: 500, left: 0, behavior: "smooth" });
    } else {
      const data = {
        name: names,
        type: type,
        description: description,
        transformerData: selectedTransformer.map((tr) => tr.id),
        date: dateValue.$D + "/" + dateValue.$m + "/" + dateValue.$y,
      };
      setSceduleData([data, ...scheduleData]);
      setBasicValue({ name: "", description: "", type: "" });
      setNames([]);
      setTabChanger("s");
      setSelectedTransformer([]);

      window.scrollTo({ top: 500, left: 0, behavior: "smooth" });
    }
  };
  // console.log("data", selectedTransformer);

  /********************************************** transformer select **************** */

  const handleSelectAllClickTransfomer = (event) => {
    if (event.target.checked) {
      const newSelected = transformerData;
      setSelectedTransformer(newSelected);
      return;
    }
    setSelectedTransformer([]);
  };

  const handleSelectClickTransFormer = (event, row) => {
    // console.log(":;;;;;;;");
    if (!event.target.checked) {
      const newSelected = selectedTransformer?.filter((n) => n.id !== row.id);
      setSelectedTransformer([...newSelected]);
      return;
    }
    setSelectedTransformer([...selectedTransformer, row]);
  };

  /********************************************** schedule  **************** */

  const handleSelectAllClickSchedule = (event) => {
    if (event.target.checked) {
      const newSelected = scheduleData;
      setSelectedSchedule(newSelected);
      return;
    }
    setSelectedSchedule([]);
  };

  const handleSelectClickSchedule = (event, row) => {
    // console.log(":;;;;;;;");
    if (!event.target.checked) {
      const newSelected = selectedSchedule?.filter((n) => n.id !== row.id);
      setSelectedSchedule([...newSelected]);
      return;
    }
    setSelectedSchedule([...selectedSchedule, row]);
  };
  return (
    <SchedulePageStyle>
      <NavBar handleOpen={handleUserOpen} type={"view"} />
      <div className="con">
        <div className="top__con">
          <div className="name__type flex mt-[5vh] w-[90vw] mx-auto justify-between">
            <div className="  text-[#006A66]">
              <p className=" text-xl mb-2">Maintenance Personnel</p>
              <div className="input__field flex justify-between items-center border-[1px] px-2 rounded-lg border-[#006A66] w-[40vw]">
                <input
                  name="name"
                  value={basicData.name}
                  onChange={handleBasicDataChange}
                  className="input__field rounded py-3 px-4 w-[90%] outline-none  "
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
            <div className="forMobile hidden w-[90vw] mx-auto ">
              <div className="flex justify-center  flex-wrap w-[90vw]">
                {names.length > 0 &&
                  names.map((n, i) => (
                    <div key={i} className="">
                      <FilterConditions
                        closFilterCondition={deleteName}
                        name={n}
                      />
                    </div>
                  ))}
              </div>
            </div>

            <div className=" text-[#006A66]">
              <p className="text-xl mb-2">Type</p>
              <div className=" input__field flex justify-between items-center border-[1px] px-2 rounded-lg border-[#006A66] w-[40vw]">
                <input
                  name="type"
                  value={basicData.type}
                  onChange={handleBasicDataChange}
                  className="input__field rounded py-3 px-4 w-[90%] outline-none  "
                  type={"text"}
                />
              </div>
            </div>
          </div>
          <div className="forDesktop w-[90vw] mx-auto ">
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
          <div className=" date__desc flex my-[3vh] w-[90vw] mx-auto justify-between">
            <div className=" text-xl text-[#006A66]">
              <p className=" mb-2">Date</p>
              <div className=" ">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    className="input__field date w-[40vw] border-[1px solid red] "
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
              <div className="input__field border-[1px] px-1 rounded-lg border-[#006A66] w-[40vw]">
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
          <div className="table__header flex items-center justify-between">
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
            <div>
              {tabChanger == "s" && (
                <div>
                  <input
                    className=" border-[1px] px-3 py-[1px] rounded border-[lightgray] "
                    placeholder="search"
                    // value={transformerSearch}
                    onChange={scheduleSearchHandler}
                  />
                  <IconButton
                    sx={{ height: 36 }}
                    onClick={handleScheduleDelete}
                  >
                    <RemoveCircleOutlineIcon sx={{ color: "#006A66" }} />
                  </IconButton>
                </div>
              )}
              {tabChanger == "t" && (
                <div>
                  <input
                    onChange={transformerSearchHandler}
                    // value={scheduleSearch}
                    className=" border-[1px] px-3 py-[1px] rounded border-[lightgray] "
                    placeholder="search"
                  />
                  <IconButton
                    sx={{ height: 36 }}
                    onClick={handleTransformerDelete}
                  >
                    <RemoveCircleOutlineIcon sx={{ color: "#006A66" }} />
                  </IconButton>
                </div>
              )}
            </div>
          </div>
          <div className="table w-[90vw] mx-auto ">
            {tabChanger == "s" ? (
              <ScheduleTable1
                selected={selectedSchedule}
                setSelected={setSelectedSchedule}
                handleSelectClick={handleSelectClickSchedule}
                handleSelectAllClick={handleSelectAllClickSchedule}
                rows={isSearching ? scheduleSearchedData : scheduleData}
              />
            ) : (
              <TransformerTable
                selected={selectedTransformer}
                setSelected={setSelectedTransformer}
                handleSelectClick={handleSelectClickTransFormer}
                handleSelectAllClick={handleSelectAllClickTransfomer}
                rows={
                  isSearchingTrans ? transformerSearchedData : transformerData
                }
              />
            )}

            {/* <ScheduleTable
              headers={["No", "Maintenance Personnel", "Type", "Date"]}
              datas={scheduleData}
            /> */}
          </div>
        </div>
      </div>{" "}
      {/* <Terminal /> */}
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

  @media screen and (max-width: 800px) {
    .name__type,
    .date__desc {
      margin: 0px auto;
      display: block;
      width: 90vw;
      .input__field,
      input {
        width: 90vw;
      }
    }

    .forMobile {
      display: flex;
      width: 90vw;
    }
    .forDesktop {
      display: none;
    }

    .rating__input__div {
      width: 90vw;
      margin: auto;
    }
    .rating__input__div__sm {
      width: 40vw;
      margin: auto;
    }
    .rating__body {
      display: block;
    }
    .rating_display {
      width: 90vw;
      margin: auto;
    }
  }
  @media screen and (max-width: 600px) {
    .table__header {
      display: flex;
      flex-direction: column-reverse;
      align-items: flex-start;
    }
  }
`;

export default SchedulePage;
