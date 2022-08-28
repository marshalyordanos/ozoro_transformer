import React from "react";
import NavBar from "../components/NavBar";
import Filter from "../components/Filter";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
const HomePage = () => {
  const [filterToggle, setFilterToggle] = React.useState(false);
  const filterHandler = () => {
    setFilterToggle(!filterToggle);
  };
  return (
    <div>
      {/**************************************************  navbar  ***********************************************  */}
      <div>
        <NavBar handleFilter={filterHandler} />
      </div>

      {/************************************************** filter *************************************************  */}

      {filterToggle && (
        <div className="">
          <div>
            <Filter />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
