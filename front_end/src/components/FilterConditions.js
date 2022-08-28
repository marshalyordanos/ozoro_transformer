import { IconButton } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const FilterConditions = ({ condition, closFilterCondition }) => {
  return (
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
  );
};

export default FilterConditions;
