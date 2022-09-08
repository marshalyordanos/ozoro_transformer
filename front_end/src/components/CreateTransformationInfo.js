import { Checkbox, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import styled from "styled-components";
const CreateTransformationInfo = ({
  selectedData,
  name,
  id,
  location,
  serial,
  isSubmited,
  selectedDataHandler,
  editTemporaryHandler,
}) => {
  const [checked, setChecked] = useState(false);
  const [size, setSize] = useState(window.innerWidth);
  const isSelected =
    selectedData.find((value) => value.id === id) !== undefined;

  useEffect(() => {
    function handleResize() {
      setSize(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
  }, [size]);
  const handleChange = (id) => {
    selectedDataHandler(id, !isSelected);
    setChecked(!isSelected);
  };

  return (
    <CreateTransformerInfoStyle className="flex border-[1px] text-[#006A66] px-5  hover:border-[#006A66] w-[100%] items-center justify-between my-5 h-20">
      {size > 700 && <h1 className=" text-lg">{serial}</h1>}
      <h2 className=" text-2xl">{name}</h2>

      {size > 700 && <p>{location}</p>}
      {size > 700 && (
        <div className="flex">
          <div className="flex justify-center items-center bg-yellow-500 mx-1 min-w-[40px] px-1 h-[30px]">
            <p className="text-white font-bold ">10v</p>
          </div>
          <div className="flex justify-center items-center bg-blue-200 mx-1 min-w-[40px] px-1 h-[30px]">
            <p className="text-[#006A66] font-bold ">1323v</p>
          </div>
          <div className="flex justify-center items-center bg-red-500 mx-1 min-w-[40px] px-1 h-[30px]">
            <p className="text-white font-bold">10v</p>
          </div>
        </div>
      )}
      <div className="flex items-center">
        {!isSubmited && (
          <p className="my-0 py-0 mx-3">
            <IconButton
              onClick={() => {
                editTemporaryHandler(id);
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
            >
              {" "}
              <BorderColorIcon />
            </IconButton>
          </p>
        )}
        <Checkbox
          disabled={isSubmited}
          checked={isSubmited ? true : isSelected}
          onChange={() => handleChange(id)}
          value={isSubmited}
          color="success"
        />
      </div>
    </CreateTransformerInfoStyle>
  );
};

const CreateTransformerInfoStyle = styled.div`
  @media screen and (max-width: 700px) {
  }
`;

export default CreateTransformationInfo;
