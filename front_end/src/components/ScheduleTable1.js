import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#006a66",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
export default function ScheduleTable1({
  setSelected,
  rows,
  handleSelectClick,
  handleSelectAllClick,
  selected,
}) {
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [size, setSize] = React.useState(window.innerWidth);
  React.useEffect(() => {
    function handleResize() {
      setSize(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
  }, [size]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  console.log("slelected", selected);
  const isSelected = (row) =>
    selected.find((value) => value.id === row.id) !== undefined;

  // Avoid a layout
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows?.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table aria-labelledby="tableTitle" size={dense ? "small" : "medium"}>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={
                      selected?.length > 0 && selected?.length < rows.length
                    }
                    checked={
                      rows?.length > 0 && selected?.length === rows?.length
                    }
                    onChange={handleSelectAllClick}
                    inputProps={{
                      "aria-label": "select all desserts",
                    }}
                  />
                </StyledTableCell>

                {size > 800 && (
                  <StyledTableCell align="left"> No </StyledTableCell>
                )}
                <StyledTableCell align="left">
                  Maintenance Personnel{" "}
                </StyledTableCell>

                {size > 800 && (
                  <StyledTableCell align="left">Type</StyledTableCell>
                )}
                {size > 800 && (
                  <StyledTableCell align="left">Date</StyledTableCell>
                )}
                <StyledTableCell align="left">Detail</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row, index) => {
                const isItemSelected = isSelected(row);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <StyledTableRow
                    hover
                    onClick={(event) => handleSelectClick(event, row)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <StyledTableCell
                      component="th"
                      scope="row"
                      padding="checkbox"
                    >
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </StyledTableCell>

                    {size > 800 && (
                      <StyledTableCell align="left">
                        {" "}
                        {index + 1}{" "}
                      </StyledTableCell>
                    )}
                    <StyledTableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      align="left"
                    >
                      {row.name.join(", ")}
                    </StyledTableCell>
                    {size > 800 && (
                      <StyledTableCell align="left">{row.type}</StyledTableCell>
                    )}
                    {size > 800 && (
                      <StyledTableCell align="left">{row.date}</StyledTableCell>
                    )}

                    <StyledTableCell align="left">
                      <Link to={`/schedule/view/${row.id}`}>
                        <IconButton>
                          <RemoveRedEyeIcon sx={{ color: "#006A66" }} />
                        </IconButton>
                      </Link>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows?.length || 1}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
