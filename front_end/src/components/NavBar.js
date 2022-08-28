import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import Icon from "./icons/Icon";
import { MenuOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
// import {MenuIcon} from '@mui/icons-material/';
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
const NavBar = ({ handleFilter, transformerSearchHandler }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <NavbarStyle className="flex items-center justify-between h-[65px] bg-[#317773] w-full ">
      {/* logo and humburger icon */}
      <div className="pl-2 pt-2 flex items-center space-x-5 ">
        <Icon fill={"white"} width={50} height={50} />
        <IconButton onClick={handleFilter}>
          <FilterListOutlinedIcon sx={{ color: "white", fontSize: 32 }} />
        </IconButton>
      </div>

      <div className="flex items-center ">
        {/* search input when appre only on home page */}
        <div className="  w-[50vw] ">
          <input
            type="text"
            placeholder="Search"
            onChange={(event) => transformerSearchHandler(event)}
            className="w-full px-3 rounded-sm  h-[40px]"
          />
        </div>
        {/* transformer name appre for ather pages */}

        {/* navbar icons */}
        <div className="navbar__icons pl-10 pr-5  space-x-6 ">
          <IconButton>
            <CalendarMonthOutlinedIcon sx={{ color: "white", fontSize: 32 }} />
          </IconButton>
          <IconButton>
            <NoteAddOutlinedIcon sx={{ color: "white", fontSize: 32 }} />
          </IconButton>
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
            <MenuItem onClick={handleClose}>
              <CalendarMonthOutlinedIcon
                sx={{ color: "#006A66", fontSize: 28 }}
              />{" "}
              Schedule
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <NoteAddOutlinedIcon sx={{ color: "#006A66", fontSize: 28 }} />{" "}
              Create Transformer
            </MenuItem>
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
`;

export default NavBar;
