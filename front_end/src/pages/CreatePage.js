import React, { useState } from "react";
import NavBar from "../components/NavBar";
import styled from "styled-components";
import { Checkbox, Divider } from "@mui/material";
import RatingType from "../components/RatingType";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SortIcon from "@mui/icons-material/Sort";
import InsertPageBreakIcon from "@mui/icons-material/InsertPageBreak";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import { v4 as uuid } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DragAndDrop from "../components/DragAndDrop";
import CreateTransformationInfo from "../components/CreateTransformationInfo";
import Terminal from "../components/Terminal";

const toastOption = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
  // progress: undefined
};

const CreatePage = ({ handleUserOpen }) => {
  const [files, setFiles] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [temporarySubmit, setTemoporarySubmit] = useState([]);
  const [ratingDatas, setRatingDatas] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);

  const [basicValue, setBasicValue] = useState({
    id: uuid(),
    location: "",
    name: "",
    serial: "",
  });
  const [rating, setRating] = useState({
    type: "",
    value: "",
    unit: "",
  });
  console.log("data", selectedData);

  const selectedDataHandler = (id, checked) => {
    let data;
    if (checked == false) {
      data = selectedData.filter((data) => data.id !== id);
      setSelectedData([...data]);
    } else {
      data = temporarySubmit.filter((data) => data.id === id);
      setSelectedData([...data, ...selectedData]);
    }
  };
  // **************************** capture basic data **********
  const onChangeFile = (file) => {
    // console.log("drag file", file);
  };

  // **************************** capture rating data **********

  const ratingTypeChange = (event) => {
    setRating({ ...rating, [event.target.name]: event.target.value });
  };
  const besicValueChange = (event) => {
    setBasicValue({ ...basicValue, [event.target.name]: event.target.value });
  };

  const ratingTypeAddHandler = () => {
    const { type, value, unit } = rating;
    const uniqueRating = ratingDatas.filter((v) => v.type === type);

    if (!type) {
      toast.error("Please provide type", toastOption);
    } else if (uniqueRating.length > 0) {
      toast.error("Type must be unique", toastOption);
    } else if (!value || isNaN(parseFloat(value))) {
      toast.error("Please provide valid value", toastOption);
    } else if (!unit) {
      toast.error("Please provide valid value", toastOption);
    } else {
      setRatingDatas([
        { type: rating.type, value: rating.value, unit: rating.unit },
        ...ratingDatas,
      ]);
      setRating({ type: "", value: "", unit: "" });
    }
  };

  // **************************** submit one data to thedata **********
  const submitTemporaryHandler = () => {
    const data = {
      id: basicValue.id,
      name: basicValue.name,
      location: basicValue.location,
      serial: basicValue.serial,
      rating: ratingDatas,
      atachFiles: files,
      isSubmited: false,
    };
    setTemoporarySubmit([data, ...temporarySubmit]);
    setRatingDatas([]);
    setFiles([]);
    setBasicValue({ id: uuid(), name: "", location: "", serial: "" });
  };
  const submitHandler = () => {
    const fd = new FormData();
    const data = {
      id: basicValue.id,
      name: basicValue.name,
      location: basicValue.location,
      serial: basicValue.serial,
      rating: ratingDatas,
      atachFiles: files,
      isSubmited: true,
    };
    fd.append("id", basicValue.id);
    fd.append("name", basicValue.name);
    fd.append("location", basicValue.location);
    fd.append("serial", basicValue.serial);
    if (editMode) {
      const newData = temporarySubmit.filter(
        (data) => data.id !== basicValue.id
      );
      setTemoporarySubmit([data, ...newData]);
    } else {
      setTemoporarySubmit([data, ...temporarySubmit]);
    }
    setRatingDatas([]);
    setFiles([]);
    setBasicValue({ id: uuid(), name: "", location: "", serial: "" });
  };

  const editTransformerHandler = () => {
    const newData = temporarySubmit.filter((data) => data.id !== basicValue.id);
    const data = {
      id: basicValue.id,
      name: basicValue.name,
      location: basicValue.location,
      serial: basicValue.serial,
      rating: ratingDatas,
      atachFiles: files,
      isSubmited: false,
    };
    setTemoporarySubmit([data, ...newData]);
    setEditMode(false);
    setRatingDatas([]);
    setFiles([]);
    setBasicValue({ id: uuid(), name: "", location: "", serial: "" });
  };
  const editTemporaryHandler = (id) => {
    const editableData = temporarySubmit.filter((data) => data.id === id);
    setEditData(editableData[0]);
    setEditMode(true);
    setBasicValue({
      name: editableData[0].name,
      id: editableData[0].id,

      location: editableData[0].location,
      serial: editableData[0].serial,
    });
    setRatingDatas(editableData[0].rating);
    setFiles(editableData[0].atachFiles);
  };

  const selectAll = (event) => {
    if (event.target.checked) {
      const data = temporarySubmit.filter((d) => d.isSubmited === false);
      setSelectedData(data);
      return;
    }
    setSelectedData([]);
    console.log("ssss", event.target.checked);
  };
  return (
    <CreatePageStyle>
      <div className="">
        <NavBar handleOpen={handleUserOpen} />
      </div>
      <div className=" w-[94vw] mx-auto ">
        <div>
          <h1 className="text-2xl text-[#006A66] m-5 ">Create Transformer</h1>
          <div className="">
            <div className="name_id">
              <div className="m-4">
                <label className="text_icon">
                  <div className="icon flex w-8 h-8 justify-center rounded-full items-center text-white bg-[#006A66]">
                    id
                  </div>
                  <div className="flex  flex-col w-[100%] ">
                    <p className="input__name">ID</p>
                    <input
                      value={editMode ? editData.id : basicValue.id}
                      disabled
                      placeholder="enter id"
                      className=" "
                    />
                  </div>
                </label>
              </div>
              <div className="m-4">
                <label className="text_icon">
                  <div className="icon flex w-8 h-8 justify-center rounded-full items-center text-white bg-[#006A66]">
                    <SortIcon />
                  </div>
                  <div className="flex  flex-col w-[100%] ">
                    <p className="input__name">Name</p>
                    <input
                      name="name"
                      onChange={besicValueChange}
                      value={basicValue.name}
                      placeholder={editMode ? editData.name : "enter name"}
                      className=" "
                    />
                  </div>
                </label>
              </div>{" "}
            </div>
            <div className="location_serial">
              <div className="m-4">
                <label className="text_icon">
                  <div className="icon flex w-8 h-8 justify-center rounded-full items-center text-white bg-[#006A66]">
                    <LocationOnIcon />
                  </div>
                  <div className="flex  flex-col w-[100%] ">
                    <p className="input__name">Location</p>
                    <input
                      placeholder={
                        editMode ? editData.location : "enter location"
                      }
                      name="location"
                      onChange={besicValueChange}
                      value={basicValue.location}
                      className=" "
                    />
                  </div>
                </label>
              </div>{" "}
              <div className="m-4">
                <label className="text_icon">
                  <div className="icon flex w-8 h-8 justify-center rounded-full items-center text-white bg-[#006A66]">
                    <InsertPageBreakIcon />
                  </div>
                  <div className="flex  flex-col w-[100%] ">
                    <p className="input__name">Serial</p>
                    <input
                      placeholder={editMode ? editData.serial : "enter serial"}
                      name="serial"
                      onChange={besicValueChange}
                      value={basicValue.serial}
                      className=" "
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-2xl text-[#006A66] mx-5 mt-5 mb-2 ">Rating</h1>
            <div className="rating__line bg-[#006A66] h-[2px] w-[40vw] mx-5 "></div>
            <div className="rating__body flex justify-between ">
              <div className=" flex flex-col items-center">
                <div className="m-4">
                  <label className="rating__input__div  text_icon">
                    <div className="icon flex w-8 h-8 justify-center rounded-full items-center text-white bg-[#006A66]">
                      T
                    </div>
                    <div className="flex  flex-col w-[100%] ">
                      <p className="input__name">Type</p>
                      <input
                        name="type"
                        onChange={ratingTypeChange}
                        value={rating.type}
                        placeholder="enter type"
                        className=" "
                      />
                    </div>
                  </label>
                </div>
                <div className="flex">
                  <div className="m-4">
                    <label className="rating__input__div__sm  text_icon2">
                      <div className="icon2 flex w-8 h-8 justify-center rounded-full items-center text-white bg-[#006A66]">
                        <HelpOutlinedIcon />
                      </div>
                      <div className="flex  flex-col w-[100%] ">
                        <p className="input__name">Value</p>
                        <input
                          name="value"
                          onChange={ratingTypeChange}
                          value={rating.value}
                          placeholder="enter value"
                          className=" "
                        />
                      </div>
                    </label>
                  </div>{" "}
                  <div className="m-4">
                    <label className="rating__input__div__sm  text_icon2">
                      <div className="icon2 flex w-8 h-8 justify-center rounded-full items-center text-white bg-[#006A66]">
                        <HelpOutlinedIcon />
                      </div>
                      <div className=" flex  flex-col w-[100%] ">
                        <p className="input__name">Unit</p>
                        <input
                          name="unit"
                          onChange={ratingTypeChange}
                          value={rating.unit}
                          placeholder="enter unit"
                          className=" "
                        />
                      </div>
                    </label>
                  </div>{" "}
                </div>
                <div>
                  <button
                    onClick={ratingTypeAddHandler}
                    className=" border-[2px] m-5  px-12 py-1 rounded-xl border-[#006A66]"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div>
                {ratingDatas.length > 0 ? (
                  <RatingType
                    setRatingDatas={setRatingDatas}
                    datas={ratingDatas}
                  />
                ) : (
                  <div className="rating_display flex justify-center items-center w-[40vw]  h-[200px] border-[2px] border-[#006A66] rounded-lg">
                    <h1 className="text-[lightgray] font-bold text-xl ">
                      {" "}
                      No Rating
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-2xl text-[#006A66] mx-5 mt-5 mb-2 ">
              Atach File
            </h1>
            <div className=" bg-[#006A66] h-[3px] w-[90vw] mx-5 "></div>
            <div>
              <DragAndDrop
                file={files}
                setFiles={setFiles}
                onChangeFile={onChangeFile}
              />
            </div>
          </div>
          <div className="w-[90vw] flex mx-auto m-5 justify-end">
            {editMode ? (
              <button
                onClick={editTransformerHandler}
                className="bg-[#bcaf00] mx-2 text-white py-2 px-8 rounded "
              >
                Edit
              </button>
            ) : (
              <button
                onClick={submitTemporaryHandler}
                className="bg-[#006A66] mx-2 text-white py-2 px-8 rounded "
              >
                Temporary Submit
              </button>
            )}
            <button
              onClick={submitHandler}
              className="bg-[#006A66] mx-2 text-white py-2 px-8 rounded "
            >
              Submit
            </button>
          </div>

          <div className="">
            <h1 className="text-2xl text-[#006A66]  mt-5 mb-2 mx-5 ">
              Information
            </h1>
            <div className=" bg-[#006A66] h-[3px] w-[90vw] mx-5 "></div>
            {temporarySubmit.length > 0 && (
              <div className="flex items-center mt-10 justify-end w-[90vw]">
                <Checkbox
                  onClick={selectAll}
                  checked={
                    temporarySubmit.filter((data) => !data.isSubmited)
                      .length === selectedData.length
                      ? true
                      : false
                  }
                  color="success"
                />
                <p>Select All</p>
              </div>
            )}
            <div className="w-[90vw] mt-5 mx-auto">
              {temporarySubmit.map((data) => (
                <CreateTransformationInfo
                  key={data.id}
                  editTemporaryHandler={editTemporaryHandler}
                  id={data.id}
                  selectedDataHandler={selectedDataHandler}
                  serial={data.serial}
                  name={data.name}
                  location={data.location}
                  isSubmited={data.isSubmited}
                  ratings={data.rating}
                  selectedData={selectedData}
                />
              ))}
            </div>
          </div>
          <div className="w-[90vw] flex mx-auto m-5 justify-end">
            <button className="bg-[#006A66] mx-2 text-white py-2 px-8 rounded ">
              Selected Submit
            </button>
            <button className="bg-[#006A66] mx-2 text-white py-2 px-8 rounded ">
              Submit All
            </button>
          </div>
        </div>
      </div>
      <Terminal />
      <ToastContainer />
    </CreatePageStyle>
  );
};

const CreatePageStyle = styled.div`
  .name_id {
    display: felx;
    justify-content: space-between;
  }
  .location_serial {
    display: felx;
    justify-content: space-between;
  }
  .text_icon2 {
    border: 1px solid #006a66;
    display: flex;
    align-items: center;
    padding: 0px 10px;
    width: 18vw;
    border-radius: 15px;
    .icon2 {
      margin: 0px 9px;
      display: flex;
      width: 40px;
      height: 38px;
      justify-content: center;
      align-items: center;
      background-color: #006a66;
      color: white;
      border-radius: 50%;
    }
    input {
      padding: 0px 5px;
      border-radius: 100px;
      outline: none;
      width: 100%;
      padding: 0 12px;
      color: #006a66;
    }
  }
  .text_icon {
    border: 1px solid #006a66;
    display: flex;
    align-items: center;
    padding: 0px 10px;
    width: 41vw;
    border-radius: 15px;

    .icon {
      margin: 0px 9px;
      display: flex;
      width: 40px;
      height: 38px;
      justify-content: center;
      align-items: center;
      background-color: #006a66;
      color: white;
      border-radius: 50%;
    }
    p {
      color: #006a66;
      margin: 0 12px;
    }
    input {
      padding: 0px 5px;
      border-radius: 100px;
      outline: none;
      width: 100%;
      padding: 0 12px;
      color: #006a66;
    }
  }
  @media screen and (max-width: 700px) {
    .name_id,
    .location_serial {
      margin: 0px auto;
      display: block;
      .text_icon,
      .rating__input__div,
      input {
        width: 100%;
      }
    }
    .rating__line {
      width: 90vw;
      margin: auto;
    }
    .rating__input__div {
      width: 90vw;
      margin: auto;
    }
    .rating__input__div__sm {
      width: 40vw;
      margin: auto;
    }
    .rating__body {
      display: block;
    }
    .rating_display {
      width: 90vw;
      margin: auto;
    }
  }
`;

export default CreatePage;
