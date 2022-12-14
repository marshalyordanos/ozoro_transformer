import { IconButton } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";

const FilterConditions = ({ condition, closFilterCondition, name }) => {
  const id = condition?.id || name;
  return (
    <FilterStyled className=" flex  min-w-[180px] self-center  items-center justify-between border-[1px]  hover:border-[#006A66] p-2 rounded-full m-2">
      {condition && (
        <p className="  ">
          {condition.type}{" "}
          <span>
            {condition.min}-{condition.max}
          </span>
        </p>
      )}
      {name && <p className="  ">{name}</p>}
      <IconButton onClick={() => closFilterCondition(id)}>
        <CloseIcon sx={{ color: "#006A66" }} />
      </IconButton>
    </FilterStyled>
  );
};

const FilterStyled = styled.div`
  @media screen and (max-width: 680px) {
    padding: 3px 5px;
    min-width: 100px;
    p {
      font-size: 13px;
    }
  }
`;

export default FilterConditions;
