import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import Icon from "./icons/Icon";
import { Home, MenuOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
// import {MenuIcon} from '@mui/icons-material/';
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
const NavBar = ({
  handleFilter,
  transformerSearchHandler,
  type,
  handleOpen,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [size, setSize] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setSize(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
  }, [size]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <NavbarStyle className="flex items-center justify-between h-[65px] bg-[#006A66] w-full ">
      {/* logo and humburger icon */}
      <div className="pl-2 pt-2 flex items-center ">
        <Icon
          fill={"white"}
          width={size < 472 ? 30 : 50}
          height={size < 472 ? 30 : 50}
        />
        {type !== "home" ? (
          <Link to="/home">
            <IconButton>
              <Home sx={{ color: "white", fontSize: size < 472 ? 24 : 32 }} />
            </IconButton>
          </Link>
        ) : (
          <IconButton onClick={handleFilter}>
            <FilterListOutlinedIcon
              sx={{ color: "white", fontSize: size < 472 ? 24 : 32 }}
            />
          </IconButton>
        )}
      </div>
      {type === "view" && (
        <div className="title border-[1px] border-white px-14 py-2 rounded-full w-[50vw] ">
          <h1 className="text-white text-center text-xl ">Transformer 1</h1>
        </div>
      )}
      <div className="flex items-center ">
        {/* search input when appre only on home page */}
        {type === "home" && (
          <div className="  w-[50vw] ">
            <input
              type="text"
              placeholder="Search"
              onChange={(event) => transformerSearchHandler(event)}
              className="w-full px-3 rounded-sm  h-[40px]"
            />
          </div>
        )}
        {/* transformer name appre for ather pages */}

        {/* navbar icons */}
        <div className="navbar__icons pl-10 pr-5  space-x-6 ">
          <span onClick={handleOpen} className=" cursor-pointer text-white">
            Create user
          </span>

          <Link to="/schedule">
            <IconButton>
              <CalendarMonthOutlinedIcon
                sx={{ color: "white", fontSize: 32 }}
              />
            </IconButton>
          </Link>
          <Link to="/create">
            <IconButton>
              <NoteAddOutlinedIcon sx={{ color: "white", fontSize: 32 }} />
            </IconButton>
          </Link>
          <IconButton>
            <NotificationsOutlinedIcon sx={{ color: "white", fontSize: 32 }} />
          </IconButton>
        </div>
        <div className="navbar__mune hidden text-[#006A66]">
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MenuOutlined sx={{ color: "white", fontSize: 32 }} />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem>
              <NoteAddOutlinedIcon sx={{ color: "#006A66", fontSize: 28 }} />{" "}
              <span onClick={handleOpen} className=" cursor-pointer ">
                Create user
              </span>
            </MenuItem>
            <Link to="/schedule">
              <MenuItem onClick={handleClose}>
                <CalendarMonthOutlinedIcon
                  sx={{ color: "#006A66", fontSize: 28 }}
                />{" "}
                Schedule
              </MenuItem>
            </Link>
            <Link to="/create">
              <MenuItem onClick={handleClose}>
                <NoteAddOutlinedIcon sx={{ color: "#006A66", fontSize: 28 }} />{" "}
                Create Transformer
              </MenuItem>
            </Link>
            <MenuItem onClick={handleClose}>
              {" "}
              <NotificationsOutlinedIcon
                sx={{ color: "#006A66", fontSize: 28 }}
              />
              <p>Notification</p>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </NavbarStyle>
  );
};

const NavbarStyle = styled.div`
  @media screen and (max-width: 910px) {
    .navbar__icons {
      display: none;
    }
    .navbar__mune {
      display: block;
    }
  }
  @media screen and (max-width: 472px) {
    .title {
      border: none;
      padding: 0;
      h1 {
        font-size: 18px;
      }
    }
  }
`;

export default NavBar;
