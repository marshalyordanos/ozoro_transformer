import React from "react";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import ModalUi from "./ui/ModalUi";
import { Button } from "@mui/material";

const DeleteModal = () => {
  return (
    <div>
      <div className="mt-[-70px] w-[80px] mx-auto ">
        <CancelRoundedIcon
          sx={{
            color: "red",
            backgroundColor: "white",
            borderRadius: "100px",
            padding: 0,
            margin: 0,
            border: "none",

            fontSize: 80,
          }}
        />
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center p-3 text-gray-500">
          Are you sure ?
        </h1>
        <p className="max-w-[330px] text-center pt-2">
          Do you really want to delete this item? This process cannot be undo
        </p>
        <div className=" space-x-5 mt-5">
          <Button
            variant="contained"
            sx={{ width: 120, background: "#a9a9a9" }}
          >
            Cancel
          </Button>
          <Button variant="contained" sx={{ width: 120 }} color="error">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
