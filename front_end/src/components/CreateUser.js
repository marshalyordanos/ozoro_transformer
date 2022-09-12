import { TextField } from "@mui/material";
import React from "react";
import ModalUi from "./ui/ModalUi";

const CreateUser = ({ open, setOpen }) => {
  const [size, setSize] = React.useState(window.innerWidth);
  React.useEffect(() => {
    function handleResize() {
      setSize(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
  }, [size]);

  return (
    <div>
      <ModalUi
        setOpen={setOpen}
        width={size > 900 ? "40vw" : size > 600 ? "60vw" : "80vw"}
        open={open}
      >
        <div>
          <form className="flex flex-col justify-center">
            <p className="text-2xl font-bold text-[#006A66]">Register a user</p>
            <TextField
              sx={{ marginTop: "20px" }}
              id="outlined-basic"
              label="Frist name"
              variant="outlined"
            />
            <TextField
              sx={{ marginTop: "20px" }}
              id="outlined-basic"
              label="Last name"
              variant="outlined"
            />
            <TextField
              sx={{ marginTop: "20px" }}
              id="outlined-basic"
              label="USername"
              variant="outlined"
            />
            <button
              // onClick={submitTemporaryHandler}
              className="bg-[#006A66] mt-[20px] mx-2 text-white py-2 px-8 rounded "
            >
              Create
            </button>
          </form>
        </div>
      </ModalUi>
    </div>
  );
};

export default CreateUser;
