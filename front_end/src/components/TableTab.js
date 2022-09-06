import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import HomeTable from "./HomeTable";
const rows = [
  {
    name: "Transformer 1",
    voltage: 23,
    current: 212,
    temprature: 2323,
    oilLevel: "34%",
    id: "skms",
    location: "bole",
  },
  {
    name: "mac 2",
    voltage: 12,
    current: 6,
    temprature: 223,
    oilLevel: "34%",
    id: "aksdsdks",
    location: "saris",
  },
  {
    name: "other name 3",
    voltage: 5,
    current: 1,
    temprature: 23,
    oilLevel: "34%",
    id: "knsjnjsn",
    location: "bole",
  },
  {
    name: "Transformer 4",
    voltage: 11,
    current: 2,
    temprature: 323,
    oilLevel: "34%",
    id: "ajksndssjkansdj",
    location: "bole",
  },
  {
    name: "Transformer 1",
    voltage: 23,
    current: 212,
    temprature: 2323,
    oilLevel: "34%",
    id: "skssms",
    location: "megenagna",
  },
  {
    name: "Transformer 2",
    location: "saris",
    voltage: 12,
    current: 6,
    temprature: 223,
    oilLevel: "34%",
    id: "aksddfsdsdks",
  },
  {
    name: "Transformer 3",
    voltage: 5,
    current: 1,
    temprature: 23,
    oilLevel: "34%",
    id: "knsjdsdasdnjsn",
    location: "bole",
  },
  {
    name: "Transformer 4",
    voltage: 11,
    current: 2,
    temprature: 323,
    oilLevel: "34%",
    id: "ajksnjdskansdj",
    location: "megenagna",
  },
];
const TableTab = () => {
  const [value, setValue] = React.useState("1");
  const [selected, setSelected] = React.useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = [...rows];
      console.log("////////////////", newSelected);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const handleSelectClick = (event, row) => {
    const selectedIndex = selected.find((value) => row.id === value.id);
    let newSelected = [];
    console.log("***********", row);
    console.log("wwwwwwwwwwwwww", selectedIndex);

    if (selectedIndex === undefined) {
      newSelected = [...selected, row];
    } else {
      newSelected = selected.filter((value) => value.id !== row.id);
    }
    console.log("***********", newSelected);

    setSelected(newSelected);
  };
  const handleDleteModal = (id) => {};
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Item One" value="1" />
            <Tab label="Item Two" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <HomeTable
            handleSelectAllClick={handleSelectAllClick}
            selected={selected}
            handleClick={handleSelectClick}
            handleDleteModal={handleDleteModal}
            rows={rows}
          />
        </TabPanel>
        <TabPanel value="2">
          {" "}
          <HomeTable
            handleSelectAllClick={handleSelectAllClick}
            selected={selected}
            handleClick={handleSelectClick}
            handleDleteModal={handleDleteModal}
            rows={rows}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default TableTab;
