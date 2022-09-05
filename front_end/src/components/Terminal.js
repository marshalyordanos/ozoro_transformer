import { IconButton } from "@mui/material";
import React from "react";
import TerminalIcon from "@mui/icons-material/Terminal";
const Terminal = () => {
  return (
    <div>
      <div className=" bg-[#006A66] w-11 h-11 rounded-full flex justify-center items-center  fixed right-12 bottom-10  ">
        <IconButton>
          <TerminalIcon sx={{ color: "white" }} />
        </IconButton>
      </div>
    </div>
  );
};

export default Terminal;
