import React, { useRef, useState } from "react";
import Filter from "../components/Filter";
import HomeTable from "../components/HomeTable";
import NavBar from "../components/NavBar";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress, IconButton } from "@mui/material";
import FilterConditions from "../components/FilterConditions";
import ModalUi from "../components/ui/ModalUi";
import DeleteModal from "../components/DeleteModal";
import Terminal from "../components/Terminal";
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
const HomePage = ({ handleUserOpen }) => {
  const [selected, setSelected] = React.useState([]);
  const [filterToggle, setFilterToggle] = React.useState(false);
  const [searchParametr, setSearchParameter] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [allData, setAllData] = useState(rows);
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const transformerId = useRef();
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  //   ******************************************** filter functions ***************************************
  const filterHandler = () => {
    setFilterToggle(!filterToggle);
  };
  const [allCondition, setAllCondition] = React.useState([]);

  const addFilterCondition = (type, min, max, opration) => {
    const id = Date.now();
    console.log("PPPPPPPPPPPPPPPP", type, min, max);
    setAllCondition([...allCondition, { type, min, max, id, opration }]);
    console.log("all condition", [
      ...allCondition,
      { type, min, max, id, opration },
    ]);
  };

  const closFilterCondition = (id) => {
    const newConditions = allCondition.filter(
      (condition) => id !== condition.id
    );
    console.log(newConditions, allCondition);
    setAllCondition(newConditions);
  };

  //   ********************************************* select function **************************************
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

  //   ***************************************  search functions ***********************************
  const transformerSearchHandler = async (event) => {
    const search = event.target.value.trim().toLowerCase();
    const regx = new RegExp(search, "g");
    let newData;

    if (search === "") {
      setIsSearching(false);
      newData = [...allData];
    } else {
      setIsSearching(true);
      newData = allData.filter((row) => regx.test(row.name.toLowerCase()));
    }
    setSearchedData(newData);
  };
  //   ************************************************  view function *****************************

  const handleViewOneTransformer = () => {
    console.log("View one transformer");
  };

  const handleViewSlectedTransformer = () => {
    console.log("view selected transformers");
  };
  //   ************************************************  delete function *****************************

  const handleDleteModal = (id) => {
    handleOpenDeleteModal();
    transformerId.current = id;
  };
  const deleteTransformer = (id) => {
    if (transformerId.current === "slected delete") {
      let newData = allData;
      selected.forEach((v) => {
        newData = newData.filter((data) => data.id !== v.id);
      });
      setAllData(newData);
      setSelected([]);
    } else {
      setAllData(allData.filter((data) => data.id !== transformerId.current));
      setSelected([]);
    }
  };
  const deleteSelectedTransformer = () => {
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
        handleOpen={handleUserOpen}
        type="home"
        transformerSearchHandler={transformerSearchHandler}
        handleFilter={filterHandler}
      />

      {/* <button className=" border-[1px] p-2"> click me</button> */}

      {filterToggle && (
        <div className="">
          <div>
            <Filter
              allCondition={allCondition}
              addFilterCondition={addFilterCondition}
            />
          </div>
          {/*********** filter condition display ************/}
          <div className="w-[80vw] mx-auto justify-center  flex flex-wrap ">
            {allCondition.map((condition, i) => (
              <FilterConditions
                key={condition.id}
                condition={condition}
                closFilterCondition={closFilterCondition}
              />
            ))}
          </div>
        </div>
      )}

      {/************************************************ home table list ********************************************/}
      <div className=" w-[96%] my-6 mx-auto">
        <HomeTable
          handleSelectAllClick={handleSelectAllClick}
          selected={selected}
          handleClick={handleSelectClick}
          handleDleteModal={handleDleteModal}
          rows={isSearching ? searchedData : allData}
        />
      </div>
      <div>{/* <Terminal /> */}</div>
      <ModalUi bg="none" open={isLoading}>
        <CircularProgress sx={{ color: "#006A66" }} />
      </ModalUi>
      <ModalUi
        width={"400px"}
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
      >
        <DeleteModal
          isDeleteConfirmed={isDeleteConfirmed}
          setIsDeleteConfirmed={setIsDeleteConfirmed}
          setOpen={setOpenDeleteModal}
          deleteTransformer={deleteTransformer}
        />
      </ModalUi>
    </div>
  );
};

export default HomePage;
