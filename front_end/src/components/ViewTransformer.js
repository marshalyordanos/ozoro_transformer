import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import NavBar from "./NavBar";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";

function createData(name, calories) {
  return { name, calories };
}

const rows = [
  {
    name: "mac 2",
    voltage: 12,
    current: 6,
    temprature: 223,
    oilLevel: "34%",

    location: "saris",
    attachments: ["First file1 about transfomrer", "Second file", "File3"],
  },
];

const ViewTransformer = () => {
  return (
    <div>
      <NavBar />

      {rows.map((row) => (
        <div>
          <div>
            <h1 className="text-center my-10">
              PRIORITY : <span>HIGH</span>
            </h1>
          </div>
          <TableContainer
            sx={{ width: "80vw" }}
            className="mx-auto my-2"
            component={Paper}
          >
            <Table sx={{ width: "80vw" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Parameter</TableCell>
                  <TableCell align="right">Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(row).map(
                  (key) =>
                    key !== "id" && (
                      <TableRow
                        key={Date.now()}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {key}
                        </TableCell>
                        {key === "attachments" ? (
                          <TableCell align="right" width={300}>
                            {row[key].map((value) => (
                              <div className=" p-2">
                                <Link to="/pdf">
                                  <IconButton>
                                    {" "}
                                    <PictureAsPdfIcon
                                      sx={{ color: "#006A66" }}
                                    />
                                  </IconButton>{" "}
                                  {value}
                                </Link>
                              </div>
                            ))}
                          </TableCell>
                        ) : (
                          <TableCell align="right" width={300}>
                            <p className=" text-justify float-right ">
                              {row[key]}
                            </p>
                          </TableCell>
                        )}
                      </TableRow>
                    )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ))}
    </div>
  );
};

export default ViewTransformer;
