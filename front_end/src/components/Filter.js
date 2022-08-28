import React, { useState } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import TextField from "@mui/material/TextField";
import { Button, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import styled from "styled-components";

const Filter = ({ addFilterCondition }) => {
  const [condition, setCondition] = React.useState("temprature");
  const [max, setMax] = useState(null);
  const [min, setMin] = useState(null);
  const [operation, setOperation] = React.useState("and");

  const handleRadioChange = (event) => {
    console.log(
      "******************************************",
      event.target.value
    );
    setOperation(event.target.value);
  };

  const handleChange = (event) => {
    setCondition(event.target.value);
  };

  return (
    <FilterSttle>
      <h1 className="text-xl">Filter Conditions</h1>
      <div className=" filter_condition mt-3">
        <p className="py-3">Conditions:</p>
        <div>
          <FormControl color="success" className=" w-[560px]">
            <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={condition}
              onChange={handleChange}
              label="Type"
            >
              <MenuItem value="temprature">Temprature</MenuItem>
              <MenuItem value={"voltage"}>Voltage</MenuItem>
              <MenuItem value={"current"}>Current</MenuItem>
              <MenuItem value={"Oli level"}>Oli level</MenuItem>
              <MenuItem value={"humidity"}>Humidity</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="mt-8 space-x-8 mb-8  flex justify-center">
          <TextField
            onChange={(e) => setMin(e.target.value)}
            color="success"
            size="small"
            sx={{ borderColor: "#006A66", color: "#006A66" }}
            className=" w-32 focus:bg-[#006A66] focus:text-[#006A66]"
            id="outlined-basic"
            label="min"
            variant="outlined"
          />
          <TextField
            onChange={(e) => setMax(e.target.value)}
            color="success"
            size="small"
            sx={{
              borderColor: "#006A66",
              color: "#006A66",
            }}
            className=" w-32 "
            id="outlined-basic"
            label="max"
            variant="outlined"
          />
        </div>
        <div className=" flex justify-center mb-7">
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={operation}
            row
            onChange={handleRadioChange}
          >
            <FormControlLabel value="and" control={<Radio />} label="And" />
            <FormControlLabel value="or" control={<Radio />} label="Or" />
          </RadioGroup>
        </div>
        <div className="flex justify-center ">
          <Button
            size={"large"}
            sx={{
              color: "black",
              width: 250,
              borderRadius: 100,
              borderColor: "#006A66",
              color: "#006A66",
            }}
            variant="outlined"
            onClick={() => addFilterCondition(condition, min, max)}
          >
            Add
          </Button>
        </div>
      </div>
    </FilterSttle>
  );
};

const FilterSttle = styled.div`
  width: 600px;
  padding: 20px;
  margin: 5px auto;
  .filter_condition {
    border: 1px solid lightgray;
    width: 600px;
    padding: 20px;
    border-radius: 15px;
    margin: 5px auto;
  }
`;

export default Filter;
