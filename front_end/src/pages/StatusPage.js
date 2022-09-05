import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import NavBar from "../components/NavBar";
import OilBarrelIcon from "@mui/icons-material/OilBarrel";
import {
  Avatar,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import OpacityIcon from "@mui/icons-material/Opacity";
import Battery90Icon from "@mui/icons-material/Battery90";
import LightIcon from "@mui/icons-material/Light";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import styled from "styled-components";
import ModalUi from "../components/ui/ModalUi";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
export const options1 = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false, //This will do the task
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const label = ["January", "February", "March", "April", "May", "June", "July"];

export const data1 = {
  label,
  datasets: [
    {
      label: "Dataset 1",
      data: [12, 23, 34, 54, 65, 76],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const StatusPage = () => {
  const [labels, setLables] = useState([
    "1h",
    "2h",
    "3h",
    "4h",
    "5h",
    "6h",
    "7h",
  ]);
  const [data, setData] = useState([200, 180, 203, 10, 200, 203, 134]);
  const [title, setTitle] = useState("Voltage chart");
  const [size, setSize] = useState(window.innerWidth);
  const [timeModal, setTimeModal] = useState(false);
  const [max, setMax] = useState(null);
  const [min, setMin] = useState(null);
  const [date1, setDate1] = React.useState(dayjs("2014-08-18T21:11:54"));
  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));
  const fromList = ["a", "d", "c", "d", "e", "f", "g"];
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleFrom = (event) => {
    setFrom(event.target.value);
  };
  const handleTo = (event) => {
    setTo(event.target.value);
  };
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const handleDate1Change = (newValue) => {
    setDate1(newValue);
  };
  useEffect(() => {
    function handleResize() {
      setSize(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
  }, [size]);

  // *********************************************** plot function ************************************
  const plotHandler = (labels, data, title) => {
    setLables(labels);
    setTitle(title);
    setData(data);
    setTimeModal(true);
  };

  return (
    <StatusPageStyle className="">
      {/* ********************************************** navbar *********************************************** */}
      <div
        style={{
          position: "fixed",
          top: 0,
          width: "100vw",
          zIndex: 100,
        }}
      >
        <NavBar type={"view"} />
      </div>

      {/* ******  the body containar ********** */}
      <div className="mx-[5vw] mt-[13vh]">
        <div className="graph_con flex  m-[10px]   justify-between max-w-[1200px] mx-auto">
          {/* ********************************************** line graph *********************************************** */}

          <div
            style={{
              position: size < 902 ? "fixed" : "relative",
              top: size < 902 && 65,
              zIndex: size < 902 && 50,
            }}
            // style={{ position: "sticky", top: 20, zIndex: 100 }}
            className=" line_graph  w-[55vw] bg-white h-[400px] border-[1px] rounded p-2 border-[#006A66]  "
          >
            <Line
              width={600}
              height={400}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: title,
                  },
                },
              }}
              data={{
                labels,
                datasets: [
                  {
                    label: "Dataset 1",
                    data: data,
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                  },
                ],
              }}
            />
            <div className=" flex flex-col  absolute top-0 right-0">
              <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                <InputLabel id="demo-select-small">from</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={from}
                  label="Age"
                  onChange={handleFrom}
                >
                  {fromList.map((v, i) => (
                    <MenuItem key={i} value={v}>
                      {v}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ mx: 1, minWidth: 100 }} size="small">
                <InputLabel id="demo-select-small2">to</InputLabel>
                <Select
                  labelId="demo-select-small2"
                  id="demo-select-small2"
                  value={to}
                  label="Age"
                  onChange={handleTo}
                >
                  {fromList.map((v, i) => (
                    <MenuItem key={i} value={v}>
                      {v}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          {/* ********************************************** temprature container *********************************************** */}

          <div className="doughnut_con  w-[300px]  border-[1px] rounded h-[400px] bg-[#FAFDFB]  ">
            <div className=" doughnut rounded relative w-[100%] h-[290px] p-2  ">
              <Doughnut
                width={600}
                height={400}
                options={options1}
                data={data1}
              />
            </div>
            <div
              style={{ marginTop: size < 603 ? 220 : size < 902 && 420 }}
              className="temprature_con  flex items-center  w-[100%] text-[#D4F7FF]  mt-5 h-[92px] rounded bg-[#006A66]"
            >
              <p className="temp__status hidden text-orange-500">Avarage</p>
              <div className="temp_div1 flex items-center">
                <ThermostatIcon
                  sx={{ fontSize: size < 603 ? 40 : size < 902 ? 80 : 40 }}
                />
                <p>Temprature</p>
                <Avatar
                  sx={{
                    width: size < 603 ? 40 : size < 902 ? 90 : 60,
                    height: size < 603 ? 40 : size < 902 ? 90 : 60,
                    bgcolor: "#D4F7FF",
                    color: "#006A66",
                    fontSize:
                      size < 603 ? "18px" : size < 902 ? "28px" : "23px",
                    marginLeft: 2,
                    marginRight: 2,
                  }}
                >
                  60%
                </Avatar>
              </div>
              <div className="temp_btn">
                <button
                  onClick={() =>
                    plotHandler(
                      ["a", "b", "c", "d", "e", "f", "g"],
                      [3, 8, 5, 9, 3, 5, 6],
                      "Temprature chart"
                    )
                  }
                  className=" rounded border-[1px] py-2 px-5 "
                >
                  Plot
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{ marginTop: size < 603 ? 240 : size < 902 && 440 }}
          // style={{ marginTop: 200 }}
          className="bottem_con flex  text-[#D4F7FF] mt-[30px]  justify-between max-w-[1200px] mx-auto"
        >
          {/* ********************************************** oli level contaner *********************************************** */}

          <div className="oil_con mr-6 flex flex-col items-center  w-[350px] rounded h-[300px] bg-[#006A66] ">
            <p className="oil_status hidden text-orange-600 text-lg p-3">
              Avarage
            </p>

            <h1 className="oil_text mt-4 text-2xl">Oli Level</h1>

            <div className="oil_con2 mt-6 w-[100%] justify-evenly space-x-5 items-center flex ">
              <OilBarrelIcon
                sx={{ fontSize: size < 603 ? 40 : size < 902 ? 80 : 100 }}
              />
              <h1 className="oil_text2 hidden mt-4 text-2xl">Oli Level</h1>

              <Avatar
                sx={{
                  width: size < 603 ? 40 : size < 902 ? 90 : 80,
                  height: size < 603 ? 40 : size < 902 ? 90 : 80,
                  bgcolor: "#D4F7FF",
                  color: "#006A66",
                  fontSize: size < 603 ? "18px" : size < 902 ? "28px" : "23px",
                }}
              >
                60%
              </Avatar>
            </div>
            <p className="oil_status2 text-lg p-3">Avarage</p>
            <div className="oil_btn w-[100%] items-center flex justify-evenly ">
              <button
                onClick={() =>
                  plotHandler(
                    ["monday", "t", "w", "tr", "f", "sater", "sun"],
                    [10, 18, 12, 20, 50, 43, 34],
                    "Oil level chart"
                  )
                }
                className=" border-[1px] py-2 px-8 rounded hover:bg-[#D4F7FF] hover:text-[#006A66] "
              >
                Plot
              </button>
            </div>
          </div>
          {/* ***** valtage, current, humidity ******** */}
          <div className="con_hvc mr-6 w-[500px] rounded h-[300px] bg-[#006A66] ">
            {/* ********************************************** Humidity container *********************************************** */}

            <div className="  border-b-[1px] p-[15px] ">
              <div className="hum_con  flex justify-between items-center">
                <div className=" flex items-center">
                  <OpacityIcon sx={{ fontSize: 40 }} />
                  <p>Humidity</p>
                  <Avatar
                    sx={{
                      width: size < 603 ? 40 : size < 902 ? 60 : 60,
                      height: size < 603 ? 40 : size < 902 ? 60 : 60,
                      bgcolor: "#D4F7FF",
                      color: "#006A66",
                      fontSize: size < 603 ? "18px" : size < 902 ? 23 : 23,
                      marginLeft: 2,
                      marginRight: 2,
                    }}
                  >
                    60%
                  </Avatar>
                </div>
                <div className="">
                  <button
                    onClick={() =>
                      plotHandler(
                        ["1h", "2h", "3h", "4h", "5h", "6h", "7h"],
                        [30, 18, 23, 10, 50, 23, 34],
                        "Humidity chart"
                      )
                    }
                    className="btn rounded border-[1px] py-2 px-5 "
                  >
                    Plot
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-evenly">
              {/* ********************************************** Voltage container *********************************************** */}

              <div className="flex flex-col items-center  border-r-[1px] pr-[12%] py-[10px] h-[209px]">
                <div className="flex flex-col items-center ">
                  <Battery90Icon sx={{ fontSize: 40 }} />
                  <p className="m-2">Voltage</p>
                  <Avatar
                    sx={{
                      width: size < 603 ? 40 : size < 902 ? 60 : 60,
                      height: size < 603 ? 40 : size < 902 ? 60 : 60,
                      bgcolor: "#D4F7FF",
                      color: "#006A66",
                      fontSize: size < 603 ? 18 : size < 902 ? 23 : 23,
                      marginLeft: 2,
                      marginRight: 2,
                    }}
                  >
                    60%
                  </Avatar>
                </div>
                <div>
                  <button
                    onClick={() =>
                      plotHandler(
                        ["1h", "2h", "3h", "4h", "5h", "6h", "7h"],
                        [200, 180, 203, 10, 200, 203, 134],
                        "Voltage chart"
                      )
                    }
                    className="btn m-2  rounded border-[1px] py-2 px-5 "
                  >
                    Plot
                  </button>
                </div>
              </div>

              {/* ********************************************** current container *********************************************** */}

              <div className="flex flex-col items-center  py-[10px] h-[209px]">
                <div className="flex flex-col items-center  ">
                  <LightIcon sx={{ fontSize: 40 }} />
                  <p className="m-2">Current</p>
                  <Avatar
                    sx={{
                      width: size < 603 ? 40 : size < 902 ? 60 : 60,
                      height: size < 603 ? 40 : size < 902 ? 60 : 60,
                      bgcolor: "#D4F7FF",
                      color: "#006A66",
                      fontSize: size < 603 ? 18 : size < 902 ? 23 : 23,
                      marginLeft: 2,
                      marginRight: 2,
                    }}
                  >
                    60%
                  </Avatar>
                </div>
                <div>
                  <button
                    onClick={() =>
                      plotHandler(
                        ["1h", "2h", "3h", "4h", "5h", "6h", "7h"],
                        [2, 1, 3, 4, 1, 5, 6],
                        "Voltage chart"
                      )
                    }
                    className="btn m-2 rounded border-[1px] py-2 px-5 "
                  >
                    Plot
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* ********************************************** summery contanier *********************************************** */}

          <div className="sum_con flex flex-col items-center p-2  w-[350px] rounded h-[300px] bg-[#006A66] ">
            <h1 className=" mt-4 text-2xl">Summery</h1>
            <div className="mt-6 w-[100%] justify-evenly items-center flex ">
              <Avatar
                sx={{
                  width: size < 603 ? 40 : size < 902 ? 80 : 80,
                  height: size < 603 ? 40 : size < 902 ? 80 : 80,
                  bgcolor: "#D4F7FF",
                  color: "#006A66",
                  fontSize: size < 603 ? 18 : size < 902 ? 23 : 23,
                }}
              >
                60%
              </Avatar>
            </div>
            <p className=" text-center text-lg p-3">
              Overall Transformer health
            </p>
          </div>
        </div>
      </div>
      <ModalUi
        width={size < 903 ? "90vw" : "60vw"}
        setOpen={setTimeModal}
        open={timeModal}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div
            style={{
              flexDirection: size < 603 && "column",
              alignItems: size < 603 && "center",
            }}
            className="mt-8  mb-8  flex justify-center"
          >
            <div style={{ marginTop: size < 603 && 0 }}>
              <DateTimePicker
                label="Date&Time picker"
                value={date1}
                onChange={handleDate1Change}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <p className=" mt-4 mx-5">To</p>
            <div style={{ marginTop: size < 603 && 30 }}>
              <DateTimePicker
                label="Date&Time picker"
                value={date1}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
          </div>
        </LocalizationProvider>
        <div className="temp_btn justify-center flex">
          <button
            onClick={() =>
              plotHandler(
                ["a", "b", "c", "d", "e", "f", "g"],
                [3, 8, 5, 9, 3, 5, 6],
                "Temprature chart"
              )
            }
            className=" rounded border-[1px] bg-[#006A66] text-white py-2 px-5 "
          >
            Plot
          </button>
        </div>
      </ModalUi>
      {/* <Line width={400} height={600} options={options} data={data} /> */}
    </StatusPageStyle>
  );
};

const StatusPageStyle = styled.div`
  @media screen and (max-width: 900px) {
    .graph_con {
      display: block;
    }
    .line_graph {
      width: 90vw;
      margin-bottom: 20px;
    }
    .bottem_con {
      display: block;
    }
    .doughnut {
      display: none;
    }
    .doughnut_con {
      margin: 0 auto;
      display: flex;
      width: 90vw;
      height: 180px;
    }
    .temprature_con {
      width: 90vw;
      padding: 10px;

      height: 180px;
      margin-bottom: 15px;
      > div:first-child {
        flex-grow: 1;
        padding: 20px;
        height: 180px;
      }
      p {
        font-size: 20px;
      }
      .temp__status {
        display: block;
        align-self: start;
      }
      .temp_btn {
        width: 100%;
        display: flex;
        justify-content: flex-end;
      }
      button {
        width: 20vw;
        margin-right: 20px;
        font-size: 18px;
      }
    }
    .oil_con {
      width: 90vw;
      display: flex;
      flex-direction: row;
      padding: 10px;
      height: 180px;
      /* justify-content: space-between;s */
      margin: 20px 0;

      .oil_status {
        display: block;
        align-self: start;
      }
      .oil_status2 {
        display: none;
      }
      .oil_text {
        display: none;
      }
      .oil_con2 {
        display: flex;
        /* flex-grow: 1; */
        justify-content: flex-start;
      }
      .oil_text2 {
        display: block;
        font-size: 20px;
      }
      .oil_btn {
        /* width: 20vw; */
        display: flex;
        /* width: 180px; */
        justify-content: flex-end;
        margin-right: 20px;
      }
      button {
        width: 20vw;

        font-size: 18px;
      }
    }
    .con_hvc {
      width: 90vw;
      margin-bottom: 20px;
      .hum_con {
        border: none;
        width: 80%;
        margin: 0 auto;
      }
    }
    .sum_con {
      width: 90vw;
      margin-bottom: 20px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      height: 200px;
      h1 {
        margin: 0;
      }
      p {
        margin: 0;
      }
      div {
        max-width: 100px;
        margin: 0;
      }
    }
  }
  @media screen and (max-width: 603px) {
    .line_graph {
      width: 90vw;
      height: 200px;
      margin-bottom: 20px;
    }
    .doughnut_con {
      height: 120px;
    }
    .temprature_con {
      width: 90vw;
      padding: 10px;
      flex-direction: column;
      height: 120px;
      margin-bottom: 15px;
      position: relative;
      .temp_div1 {
        width: 100%;
        flex-grow: 1;
        display: flex;
        align-items: center;
        /* padding: 10px; */
        height: 120px;
        margin-left: 0;
      }
      p {
        font-size: 16px;
      }
      .temp__status {
        display: block;
        font-size: 14px;
        /* align-self: start; */
        /* margin: 8px; */
      }
      .temp_btn {
        position: absolute;
        right: 0;
        top: 0;
        margin: 8px;
        align-self: flex-end;
      }
      button {
        width: 70px;
        height: 30px;
        margin-right: 10px;
        font-size: 14px;
      }
    }
    .oil_con {
      width: 90vw;
      display: flex;
      flex-direction: column;
      height: 120px;
      position: relative;
      /* justify-content: space-between;s */
      /* margin: 20px 0; */

      .oil_status {
        display: block;
        align-self: start;
      }
      .oil_status2 {
        display: none;
      }
      .oil_text {
        display: none;
      }
      .oil_con2 {
        display: flex;
        /* flex-grow: 1; */
        margin: 0;

        justify-content: flex-start;
      }
      .oil_text2 {
        display: block;
        margin: 0;
        font-size: 15px;
      }

      .oil_btn {
        position: absolute;
        right: 0;
        top: 0;
        margin: 8px;
        align-self: flex-end;
      }
      button {
        width: 70px;
        height: 30px;
        margin-right: 10px;
        font-size: 14px;
      }
    }
    .con_hvc .hum_con {
      border: none;
      width: 100%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
    }
    .btn {
      width: 70px;
      height: 30px;
      margin-right: 10px;
      font-size: 14px;
    }
    .sum_con {
      width: 90vw;
      margin-bottom: 20px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      height: 200px;
      h1 {
        margin: 0;
        font-size: 18px;
      }
      p {
        font-size: 16px;
      }
      div {
        max-width: 100px;
        margin: 0;
      }
    }
  }
`;

export default StatusPage;
