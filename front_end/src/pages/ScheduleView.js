import * as React from "react";
import { styled as muStyle } from "@mui/material/styles";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import FilterConditions from "../components/FilterConditions";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import styled from "styled-components";

// ****************************************** toastify options ********************************
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

/****************************************** material ui style theme ******************************/

const StyledTableCell = muStyle(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = muStyle(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

/******************************************** dummy data ***************************************** */
const sData = {
  name: ["betty", "selam"],
  type: "some type",
  date: "12/10/2017",
  description: "some description",
  id: "akmlk",
  transformers: [
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
  ],
};

/*********************************************** schedula component ********************************* */
const ScheduleView = ({ handleUserOpen }) => {
  const transformerId = useParams();
  console.log("params", transformerId);
  const [nameValue, setNameValue] = React.useState("ET");
  const [names, setNames] = React.useState([]);
  const [transformers, setTransformers] = React.useState([]);
  const [basicData, setBasicValue] = React.useState({
    type: "",
    description: "",
  });

  const [dateValue, setDateValue] = React.useState(dayjs(sData.date));

  /******************************* use effect for get the editable schedule ********************** */
  React.useEffect(() => {
    setBasicValue({
      type: sData.type,
      description: sData.description,
    });
    setNames(sData.name);
    setTransformers(sData.transformers);
  }, []);

  /**********************************************  handle functoin to the date value ************************ */
  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };

  /**********************************************  handle function to the besic data {type, discription} *****************  */
  const handleBasicDataChange = (e) => {
    setBasicValue({ ...basicData, [e.target.name]: e.target.value });
  };

  /************************************************* handle function to the name ********************** */
  const handleNameChange = (event) => {
    setNameValue(event.target.value);
    console.log("name", nameValue);
  };

  /******************************************  delete the name ******************************** */
  const deleteName = (id) => {
    const newNames = names.filter((name) => id !== name);
    console.log(newNames, names);
    setNames(newNames);
  };

  /***************************************** modify handler  *********************** */
  const modifyHandler = () => {};
  return (
    <ScheduleViewStyle>
      {/* *************************** navbar ************************ */}
      <NavBar handleOpen={handleUserOpen} type={"view"} />

      {/* *************************** table ************************ */}
      <div className=" w-[90vw] mx-auto my-[20px] ">
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableBody>
              <StyledTableRow>
                <StyledTableCell align="center">
                  {"Maintenance Personnel"}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <div className=" flex items-center ">
                    <FormControl sx={{ width: "100%", border: "none" }}>
                      <Select
                        sx={{ border: "none" }}
                        value={nameValue}
                        onChange={handleNameChange}
                      >
                        <MenuItem value="AFwdwefsd">Afghanistan</MenuItem>
                        <MenuItem value="AsdsdfsdfX">Åland Islands</MenuItem>
                        <MenuItem value="AsdfsdfL">Albania</MenuItem>
                        <MenuItem value="DZsdfsdf">Algeria</MenuItem>
                        <MenuItem value="AsdfsdfS">American Samoa</MenuItem>
                        <MenuItem value="ADsdf">Andorra</MenuItem>
                        <MenuItem value="AO">Angola</MenuItem>
                        <MenuItem value="AI">Anguilla</MenuItem>
                        <MenuItem value="AQ">Antarctica</MenuItem>
                        <MenuItem value="AG">Antigua and Barbuda</MenuItem>
                      </Select>
                    </FormControl>
                    <IconButton
                      onClick={() => {
                        console.log("alkmsckm");
                        const uniqueName = names.filter(
                          (name) => name === nameValue
                        );
                        if (!nameValue) {
                          toast.error("Name must be provide name", toastOption);
                        } else if (uniqueName.length > 0) {
                          toast.error("Name must be unique", toastOption);
                        } else {
                          setNames([nameValue, ...names]);
                        }
                      }}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </div>
                  {/* *********************************** show the add user ****************************** */}
                  <div className=" w-[100%]   border-black ">
                    <div className=" flex justify-center flex-wrap w-[100%]   mx-2 ">
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
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell align="center">
                  <p>Type</p>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <div className="flex justify-between items-center border-[1px] py-1 px-2 rounded-lg border-[#c7c6c6] w-[100%]">
                    <input
                      // value={basicData.name}
                      onChange={handleBasicDataChange}
                      placeholder="type"
                      name="type"
                      value={basicData.type}
                      className=" rounded py-3 px-4 w-[90%] outline-none  "
                      type={"text"}
                    />
                  </div>
                  {/* <TextField id="outlined-basic" variant="outlined" /> */}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell align="center">{"Date"}</StyledTableCell>
                <StyledTableCell align="left">
                  <div className=" ">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        className="date w-[100%] border-[1px solid red] "
                        inputFormat="MM/DD/YYYY"
                        value={dateValue}
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell align="center">
                  {"Description"}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <TextField
                    sx={{ width: "100%" }}
                    id="outlined-basic"
                    placeholder="some"
                    name={"description"}
                    value={basicData.description}
                    onChange={handleBasicDataChange}
                    variant="outlined"
                  />
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell align="left">transformers</StyledTableCell>
                <StyledTableCell align="left">
                  <table id="customers">
                    <tr>
                      <th>Name</th>
                      <th>Priority</th>
                      <th>stustus</th>
                    </tr>
                    {transformers.map((row) => (
                      <tr>
                        <td>{row.name}</td>
                        <td>{row.priority}</td>
                        <td>{row.status}</td>
                      </tr>
                    ))}
                  </table>
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="w-[90vw] flex justify-end mx-auto">
        <button
          onClick={modifyHandler}
          className="bg-[#bcaf00] mx-2 text-white py-2 px-8 rounded "
        >
          Modify
        </button>
      </div>
      <ToastContainer />
    </ScheduleViewStyle>
  );
};

const ScheduleViewStyle = styled.div`
  #customers {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  #customers td,
  #customers th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  #customers tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  #customers tr:hover {
    background-color: #ddd;
  }

  #customers th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #006a66;
    color: white;
  }
`;

export default ScheduleView;
