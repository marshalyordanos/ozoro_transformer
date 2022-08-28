import React, { useState } from "react";
import Filter from "../components/Filter";
import HomeTable from "../components/HomeTable";
import NavBar from "../components/NavBar";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
const rows = [
  {
    name: "Transformer 1",
    voltage: 23,
    current: 212,
    temprature: 2323,
    oilLevel: "34%",
    id: "skms",
  },
  {
    name: "mac 2",
    voltage: 12,
    current: 6,
    temprature: 223,
    oilLevel: "34%",
    id: "aksdsdks",
  },
  {
    name: "other name 3",
    voltage: 5,
    current: 1,
    temprature: 23,
    oilLevel: "34%",
    id: "knsjnjsn",
  },
  {
    name: "Transformer 4",
    voltage: 11,
    current: 2,
    temprature: 323,
    oilLevel: "34%",
    id: "ajksndssjkansdj",
  },
  {
    name: "Transformer 1",
    voltage: 23,
    current: 212,
    temprature: 2323,
    oilLevel: "34%",
    id: "skssms",
  },
  {
    name: "Transformer 2",
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
  },
  {
    name: "Transformer 4",
    voltage: 11,
    current: 2,
    temprature: 323,
    oilLevel: "34%",
    id: "ajksnjdskansdj",
  },
];
const HomePage = () => {
  const [selected, setSelected] = React.useState([]);
  const [filterToggle, setFilterToggle] = React.useState(false);
  const [searchParametr, setSearchParameter] = useState("");
  const [allData, setAllData] = useState(rows);
  const filterHandler = () => {
    setFilterToggle(!filterToggle);
  };
  const [allCondition, setAllCondition] = React.useState([]);
  const addFilterCondition = (type, min, max) => {
    const id = Date.now();
    console.log("PPPPPPPPPPPPPPPP", type, min, max);
    setAllCondition([...allCondition, { type, min, max, id }]);
  };
  const closFilterCondition = (id) => {
    const newConditions = allCondition.filter(
      (condition) => id !== condition.id
    );
    console.log(newConditions, allCondition);
    setAllCondition(newConditions);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = [...allData];
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
  const transformerSearchHandler = (event) => {
    const search = event.target.value.trim().toLowerCase();
    let newData;
    if (search === "") {
      newData = [...allData];
    } else {
      newData = allData.filter((row) =>
        row.name.toLowerCase().startsWith(search)
      );
    }
    setAllData(newData);
  };

  const deleteTransformer = (id) => {
    setAllData(allData.filter((data) => data.id !== id));
  };
  const deleteSelectedTransformer = () => {
    console.log("[[[[[[[[[[[[[[[[[[[[");
    let newData = allData;
    selected.forEach((v) => {
      newData = newData.filter((data) => data.id !== v.id);
    });
    setAllData(newData);
    setSelected([]);
  };

  return (
    <div>
      <NavBar
        transformerSearchHandler={transformerSearchHandler}
        handleFilter={filterHandler}
      />

      {/* ############################################################################################### */}
      {filterToggle && (
        <div className="">
          <div>
            <Filter addFilterCondition={addFilterCondition} />
          </div>
          <div className="w-[630px] mx-auto justify-center  flex flex-wrap ">
            {allCondition.map((condition, i) => (
              <div
                key={condition.id}
                className="flex  min-w-[180px] self-center  items-center justify-between border-[1px] hover:border-[#006A66] p-2 rounded-full m-2"
              >
                <p className="  ">
                  {condition.type}{" "}
                  <span>
                    {condition.min}-{condition.max}
                  </span>
                </p>
                <IconButton onClick={() => closFilterCondition(condition.id)}>
                  <CloseIcon sx={{ color: "#006A66" }} />
                </IconButton>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ############################################################################################### */}
      <div className=" w-[96%] my-6 mx-auto">
        <HomeTable
          handleSelectAllClick={handleSelectAllClick}
          selected={selected}
          handleClick={handleSelectClick}
          deleteTransformer={deleteTransformer}
          deleteSelectedTransformer={deleteSelectedTransformer}
          rows={allData}
        />
      </div>
    </div>
  );
};

export default HomePage;
