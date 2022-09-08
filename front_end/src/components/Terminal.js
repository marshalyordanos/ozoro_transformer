import { IconButton } from "@mui/material";
import React from "react";
import TerminalIcon from "@mui/icons-material/Terminal";
import styled from "styled-components";
const Terminal = () => {
  return (
    <TerminalStyle>
      <div className="btn bg-[#a2230c]  z-100 w-14 h-14 rounded-full flex justify-center items-center  fixed right-12 bottom-10  ">
        <IconButton>
          <TerminalIcon sx={{ color: "white" }} />
        </IconButton>
      </div>
    </TerminalStyle>
  );
};

const TerminalStyle = styled.div`
  .btn {
    box-shadow: 2px 2px 5px 4px lightgray;
  }
`;
export default Terminal;
